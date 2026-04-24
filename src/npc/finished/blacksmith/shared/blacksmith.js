var enchantUtils = require("enchant_utils.js");
var itemUtils = require("item_utils.js");
var guiUtils = require("gui_utils.js");

var Blacksmith_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");

var BLACKSMITH_RUNTIME_KEY = "blacksmith_runtime";
var BLACKSMITH_GUI_NPC_KEY = "blacksmith_gui_npc";
var DIALOG_ID = 60;

var REMOVE_GUI_ID = 9620;
var REMOVE_SCROLL_ID = 9621;
var REMOVE_STATUS_ID = 9623;

function onInit(event) {
    ensureRuntime(event.npc);
}

function onInteract(event) {
    var npc = event.npc;
    var player = event.player;
    var runtime = ensureRuntime(npc);
    var session = getSession(runtime, player, false);

    if (session == null) return;

    if (itemUtils.isEmptyItem(itemUtils.getMainhandItem(player))) {
        cancelSession(npc, player, runtime, session, "Операция отменена. Материалы возвращены.");
        event.setCanceled(true);
        return;
    }

    if (session.mode == "apply") {
        handleApplyInteract(npc, player, runtime, session);
        event.setCanceled(true);
        return;
    }

    if (session.mode == "merge") {
        handleMergeInteract(npc, player, runtime, session);
        event.setCanceled(true);
        return;
    }

    if (session.mode == "remove") {
        handleRemoveInteract(npc, player, runtime, session);
        event.setCanceled(true);
        return;
    }
}

function onDialogOption(event) {
    var npc = event.npc;
    var player = event.player;
    var service = detectDialogService(event);
    if (!itemUtils.hasText(service)) return;

    var runtime = ensureRuntime(npc);
    var session = getSession(runtime, player, false);
    if (session != null) {
        cancelSession(npc, player, runtime, session, "Предыдущая операция отменена. Материалы возвращены.");
    }

    if (service == "apply") {
        beginApply(npc, player, runtime);
        return;
    }

    if (service == "merge") {
        beginMerge(npc, player, runtime);
        return;
    }

    if (service == "remove") {
        beginRemove(npc, player, runtime);
    }
}

function onGuiScroll(event) {
    var gui = event.gui;
    var scroll = event.scroll;
    if (gui == null || scroll == null) return;
    if (gui.getID() != REMOVE_GUI_ID) return;

    var npc = resolveGuiNpc(event.player, event.npc);
    if (npc == null) {
        closePlayerGui(event.player);
        return;
    }

    var player = event.player;
    var runtime = ensureRuntime(npc);
    var session = getSession(runtime, player, false);
    if (session == null || session.mode != "remove" || session.step != "gui_open") return;
    if (scroll.getID() != REMOVE_SCROLL_ID) return;

    var index = guiUtils.getSelectedIndex(scroll);
    if (index < 0 || session.removeChoices == null) return;

    if (index >= session.removeChoices.length) {
        clearSession(runtime, player);
        clearGuiNpc(player);
        closePlayerGui(player);
        tellPlayer(npc, player, "Снятие зачарования отменено.");
        return;
    }

    finalizeRemoveSelection(npc, player, runtime, session, session.removeChoices[index]);
}

function onGuiClosed(event) {
    if (event.gui == null || event.gui.getID() != REMOVE_GUI_ID) return;

    var npc = resolveGuiNpc(event.player, event.npc);
    clearGuiNpc(event.player);
    if (npc == null) return;

    var player = event.player;
    var runtime = ensureRuntime(npc);
    var session = getSession(runtime, player, false);
    if (session == null) return;
    if (session.mode != "remove" || session.step != "gui_open") return;

    clearSession(runtime, player);
}

function beginApply(npc, player, runtime) {
    setSession(runtime, player, {
        mode: "apply",
        step: "waiting_book",
        heldBook: null,
        firstBook: null,
        removeChoices: null
    });
    tellPlayer(npc, player, "Дай мне зачарованную книгу.");
}

function beginMerge(npc, player, runtime) {
    setSession(runtime, player, {
        mode: "merge",
        step: "waiting_first_book",
        heldBook: null,
        firstBook: null,
        removeChoices: null
    });
    tellPlayer(npc, player, "Дай мне первую зачарованную книгу.");
}

function beginRemove(npc, player, runtime) {
    setSession(runtime, player, {
        mode: "remove",
        step: "waiting_item",
        heldBook: null,
        firstBook: null,
        removeChoices: null
    });
    tellPlayer(npc, player, "Нажми ПКМ предметом, с которого хочешь снять зачарование.");
}

function handleApplyInteract(npc, player, runtime, session) {
    var heldItem = itemUtils.getMainhandItem(player);

    if (session.step == "waiting_book") {
        if (!enchantUtils.isEnchantedBook(heldItem)) {
            tellPlayer(npc, player, "Дай мне именно зачарованную книгу.");
            return;
        }

        session.heldBook = itemUtils.cloneSingleItem(heldItem);
        if (itemUtils.isEmptyItem(session.heldBook)) {
            tellPlayer(npc, player, "Не удалось принять книгу.");
            clearSession(runtime, player);
            return;
        }

        if (!itemUtils.decrementHeldItem(player, 1)) {
            session.heldBook = null;
            tellPlayer(npc, player, "Не удалось забрать книгу.");
            clearSession(runtime, player);
            return;
        }

        session.step = "waiting_target";
        tellPlayer(npc, player, "Теперь дай предмет, на который нужно наложить зачарование.");
        return;
    }

    if (session.step != "waiting_target") return;

    if (itemUtils.isEmptyItem(session.heldBook)) {
        clearSession(runtime, player);
        tellPlayer(npc, player, "Операция сбилась. Начни еще раз.");
        return;
    }

    var applyResult = enchantUtils.applyBookToTarget(session.heldBook, heldItem);
    if (!applyResult.ok) {
        returnStoredItem(player, session.heldBook);
        clearSession(runtime, player);
        tellPlayer(npc, player, "Эту книгу нельзя наложить на этот предмет. Я вернул материалы.");
        return;
    }

    itemUtils.updateInventory(player);
    clearSession(runtime, player);
    tellPlayer(npc, player, "Зачарование успешно наложено.");
}

function handleMergeInteract(npc, player, runtime, session) {
    var heldItem = itemUtils.getMainhandItem(player);
    var secondBookCopy = null;

    if (session.step == "waiting_first_book") {
        if (!enchantUtils.isEnchantedBook(heldItem)) {
            tellPlayer(npc, player, "Дай мне первую зачарованную книгу.");
            return;
        }

        session.firstBook = itemUtils.cloneSingleItem(heldItem);
        if (itemUtils.isEmptyItem(session.firstBook)) {
            tellPlayer(npc, player, "Не удалось принять книгу.");
            clearSession(runtime, player);
            return;
        }

        if (!itemUtils.decrementHeldItem(player, 1)) {
            session.firstBook = null;
            tellPlayer(npc, player, "Не удалось забрать книгу.");
            clearSession(runtime, player);
            return;
        }

        session.step = "waiting_second_book";
        tellPlayer(npc, player, "Теперь дай мне вторую зачарованную книгу.");
        return;
    }

    if (session.step != "waiting_second_book") return;

    if (!enchantUtils.isEnchantedBook(heldItem)) {
        tellPlayer(npc, player, "Теперь дай именно вторую зачарованную книгу.");
        return;
    }

    if (itemUtils.isEmptyItem(session.firstBook)) {
        clearSession(runtime, player);
        tellPlayer(npc, player, "Операция сбилась. Начни еще раз.");
        return;
    }

    var mergeResult = enchantUtils.mergeBookEnchantments(
        enchantUtils.getEnchantments(session.firstBook),
        enchantUtils.getEnchantments(heldItem)
    );

    if (!mergeResult.ok) {
        returnStoredItem(player, session.firstBook);
        clearSession(runtime, player);
        if (mergeResult.reason == "max_level") {
            tellPlayer(npc, player, "Это зачарование уже имеет максимальный уровень.");
        } else {
            tellPlayer(npc, player, "Эти книги нельзя корректно объединить. Я вернул материалы.");
        }
        return;
    }

    var resultBook = enchantUtils.createEnchantedBookFromMap(mergeResult.map);
    if (itemUtils.isEmptyItem(resultBook) || !enchantUtils.isEnchantedBook(resultBook)) {
        returnStoredItem(player, session.firstBook);
        clearSession(runtime, player);
        tellPlayer(npc, player, "Не удалось создать результат.");
        return;
    }

    secondBookCopy = itemUtils.cloneSingleItem(heldItem);
    if (itemUtils.isEmptyItem(secondBookCopy)) {
        returnStoredItem(player, session.firstBook);
        clearSession(runtime, player);
        tellPlayer(npc, player, "Не удалось подготовить вторую книгу к объединению.");
        return;
    }

    if (!itemUtils.decrementHeldItem(player, 1)) {
        returnStoredItem(player, session.firstBook);
        clearSession(runtime, player);
        tellPlayer(npc, player, "Не удалось забрать вторую книгу.");
        return;
    }

    if (!itemUtils.giveItemOrDrop(player, resultBook)) {
        returnStoredItem(player, session.firstBook);
        returnStoredItem(player, secondBookCopy);
        itemUtils.updateInventory(player);
        clearSession(runtime, player);
        tellPlayer(npc, player, "Не удалось отдать результирующую книгу.");
        return;
    }

    itemUtils.updateInventory(player);
    clearSession(runtime, player);
    tellPlayer(npc, player, "Книги успешно объединены.");
}

function handleRemoveInteract(npc, player, runtime, session) {
    if (session.step != "waiting_item") return;

    var heldItem = itemUtils.getMainhandItem(player);
    var entries = enchantUtils.getEnchantmentEntries(heldItem);
    if (entries == null || entries.length <= 0) {
        tellPlayer(npc, player, "На этом предмете нет зачарований.");
        clearSession(runtime, player);
        return;
    }

    session.step = "gui_open";
    session.removeChoices = entries;
    setGuiNpc(player, npc);

    try {
        player.showCustomGui(createRemoveGui(player, entries));
    } catch (e) {
        clearGuiNpc(player);
        clearSession(runtime, player);
        tellPlayer(npc, player, "Не удалось открыть список зачарований.");
    }
}

function createRemoveGui(player, entries) {
    var gui = guiUtils.createGui(REMOVE_GUI_ID, 320, 248, player);
    gui.addLabel(1, "Снять зачарование", 10, 10, 220, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 34, 300, 34, 0x8B6F47, 1.5);
    gui.addLabel(3, "Выбери одно зачарование", 10, 42, 220, 14, 0xE0E0E0);
    gui.addScroll(REMOVE_SCROLL_ID, 10, 58, 300, 134, buildRemoveEntries(entries));
    gui.addTextArea(REMOVE_STATUS_ID, 10, 198, 300, 28);
    guiUtils.setGuiText(gui, REMOVE_STATUS_ID, "Выбери зачарование или отмени.");
    return gui;
}

function buildRemoveEntries(entries) {
    var out = [];
    for (var i = 0; i < entries.length; i++) out.push(entries[i].label);
    out.push("Отмена");
    return out;
}

function finalizeRemoveSelection(npc, player, runtime, session, selected) {
    var heldItem = itemUtils.getMainhandItem(player);
    var currentMap = enchantUtils.getEnchantments(heldItem);
    if (!currentMap.hasOwnProperty(selected.id)) {
        clearSession(runtime, player);
        clearGuiNpc(player);
        closePlayerGui(player);
        tellPlayer(npc, player, "Держи нужный предмет в основной руке.");
        return;
    }

    var book = enchantUtils.createEnchantedBook(selected.id, selected.level);
    if (itemUtils.isEmptyItem(book) || !enchantUtils.isEnchantedBook(book)) {
        clearSession(runtime, player);
        clearGuiNpc(player);
        closePlayerGui(player);
        tellPlayer(npc, player, "Не удалось создать валидную книгу с зачарованием.");
        return;
    }

    var originalMap = enchantUtils.copyEnchantMap(currentMap);
    delete currentMap[selected.id];
    if (!enchantUtils.setEnchantments(heldItem, currentMap)) {
        clearSession(runtime, player);
        clearGuiNpc(player);
        closePlayerGui(player);
        tellPlayer(npc, player, "Не удалось изменить предмет.");
        return;
    }

    var updatedMap = enchantUtils.getEnchantments(heldItem);
    if (updatedMap.hasOwnProperty(selected.id)) {
        enchantUtils.setEnchantments(heldItem, originalMap);
        itemUtils.updateInventory(player);
        clearSession(runtime, player);
        clearGuiNpc(player);
        closePlayerGui(player);
        tellPlayer(npc, player, "Зачарование не снялось с предмета.");
        return;
    }

    if (!itemUtils.giveItemOrDrop(player, book)) {
        enchantUtils.setEnchantments(heldItem, originalMap);
        itemUtils.updateInventory(player);
        clearSession(runtime, player);
        clearGuiNpc(player);
        closePlayerGui(player);
        tellPlayer(npc, player, "Не удалось выдать книгу с зачарованием.");
        return;
    }

    itemUtils.updateInventory(player);
    clearSession(runtime, player);
    clearGuiNpc(player);
    closePlayerGui(player);
    tellPlayer(npc, player, "Зачарование снято.");
}

function cancelSession(npc, player, runtime, session, message) {
    returnStoredMaterials(player, session);
    clearSession(runtime, player);
    if (itemUtils.hasText(message)) tellPlayer(npc, player, message);
}

function returnStoredMaterials(player, session) {
    if (session == null) return;
    returnStoredItem(player, session.heldBook);
    returnStoredItem(player, session.firstBook);
}

function returnStoredItem(player, item) {
    if (itemUtils.isEmptyItem(item)) return true;
    return itemUtils.giveItemOrDrop(player, item);
}

function tellPlayer(npc, player, text) {
    try {
        npc.sayTo(player, text);
        return;
    } catch (e1) {}

    try {
        player.message(text);
    } catch (e2) {}
}

function closePlayerGui(player) {
    try {
        player.closeGui();
    } catch (e) {}
}

function ensureRuntime(npc) {
    var runtime = null;
    try {
        runtime = npc.getTempdata().get(BLACKSMITH_RUNTIME_KEY);
    } catch (e1) {}

    if (runtime != null && runtime.sessions != null) return runtime;

    runtime = { sessions: {} };
    npc.getTempdata().put(BLACKSMITH_RUNTIME_KEY, runtime);
    return runtime;
}

function getSession(runtime, player, createIfMissing) {
    var key = itemUtils.getPlayerKey(player);
    var session = runtime.sessions[key];
    if (session != null || createIfMissing !== true) return session;

    session = {
        mode: "",
        step: "",
        heldBook: null,
        firstBook: null,
        removeChoices: null
    };
    runtime.sessions[key] = session;
    return session;
}

function setSession(runtime, player, session) {
    runtime.sessions[itemUtils.getPlayerKey(player)] = session;
}

function clearSession(runtime, player) {
    delete runtime.sessions[itemUtils.getPlayerKey(player)];
}

function setGuiNpc(player, npc) {
    try {
        player.getTempdata().put(BLACKSMITH_GUI_NPC_KEY, npc);
    } catch (e) {}
}

function clearGuiNpc(player) {
    try {
        player.getTempdata().remove(BLACKSMITH_GUI_NPC_KEY);
    } catch (e1) {
        try {
            player.getTempdata().put(BLACKSMITH_GUI_NPC_KEY, null);
        } catch (e2) {}
    }
}

function resolveGuiNpc(player, fallbackNpc) {
    try {
        var npc = player.getTempdata().get(BLACKSMITH_GUI_NPC_KEY);
        if (npc != null) return npc;
    } catch (e1) {}

    return fallbackNpc == null ? null : fallbackNpc;
}

function detectDialogService(event) {
    if (getDialogId(event) != DIALOG_ID) return "";

    var slot = getOptionSlot(event);
    if (slot == 0) return "apply";
    if (slot == 1) return "merge";
    if (slot == 2) return "remove";
    return "";
}

function getDialogId(event) {
    try {
        if (event.dialog != null) return event.dialog.getId();
    } catch (e1) {}

    try {
        if (event.dialog != null) return event.dialog.id;
    } catch (e2) {}

    return -1;
}

function getOptionSlot(event) {
    try {
        if (event.option != null && event.option.getSlot != null) return parseInt("" + event.option.getSlot(), 10);
    } catch (e1) {}

    try {
        if (event.option != null && event.option.slot != null) return parseInt("" + event.option.slot, 10);
    } catch (e2) {}

    return -1;
}

function normalizeText(value) {
    return itemUtils.trimString(value).toLowerCase();
}

module.exports = {
    onInit: onInit,
    onInteract: onInteract,
    onDialogOption: onDialogOption,
    onGuiScroll: onGuiScroll,
    onGuiClosed: onGuiClosed,
    BLACKSMITH_RUNTIME_KEY: BLACKSMITH_RUNTIME_KEY,
    REMOVE_GUI_ID: REMOVE_GUI_ID
};
