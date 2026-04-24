var enchantUtils = require("enchant_utils.js");
var itemUtils = require("item_utils.js");
var guiUtils = require("gui_utils.js");

var Blacksmith_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");

var BLACKSMITH_RUNTIME_KEY = "blacksmith_runtime";
var DIALOG_ID = 60;

var REMOVE_GUI_ID = 9620;
var REMOVE_SCROLL_ID = 9621;
var REMOVE_CANCEL_SCROLL_ID = 9622;
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
        cancelSession(npc, player, runtime, session, "\u041E\u043F\u0435\u0440\u0430\u0446\u0456\u044E \u0441\u043A\u0430\u0441\u043E\u0432\u0430\u043D\u043E. \u041C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0438 \u043F\u043E\u0432\u0435\u0440\u043D\u0435\u043D\u043E.");
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
        cancelSession(npc, player, runtime, session, "\u041F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u044E \u043E\u043F\u0435\u0440\u0430\u0446\u0456\u044E \u0441\u043A\u0430\u0441\u043E\u0432\u0430\u043D\u043E. \u041C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0438 \u043F\u043E\u0432\u0435\u0440\u043D\u0435\u043D\u043E.");
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

    var npc = event.npc;
    var player = event.player;
    var runtime = ensureRuntime(npc);
    var session = getSession(runtime, player, false);
    if (session == null || session.mode != "remove" || session.step != "gui_open") return;

    if (scroll.getID() == REMOVE_CANCEL_SCROLL_ID) {
        clearSession(runtime, player);
        closePlayerGui(player);
        tellPlayer(npc, player, "\u0417\u043D\u044F\u0442\u0442\u044F \u0437\u0430\u0447\u0430\u0440\u0443\u0432\u0430\u043D\u043D\u044F \u0441\u043A\u0430\u0441\u043E\u0432\u0430\u043D\u043E.");
        return;
    }

    if (scroll.getID() != REMOVE_SCROLL_ID) return;

    var index = guiUtils.getSelectedIndex(scroll);
    if (index < 0 || session.removeChoices == null || index >= session.removeChoices.length) return;

    finalizeRemoveSelection(npc, player, runtime, session, session.removeChoices[index]);
}

function onGuiClosed(event) {
    if (event.gui == null || event.gui.getID() != REMOVE_GUI_ID) return;

    var npc = event.npc;
    var player = event.player;
    var runtime = ensureRuntime(npc);
    var session = getSession(runtime, player, false);
    if (session == null) return;
    if (session.mode != "remove" || session.step != "gui_open") return;

    clearSession(runtime, player);
}

function onGuiButton(event) {
    return;
}

function beginApply(npc, player, runtime) {
    setSession(runtime, player, {
        mode: "apply",
        step: "waiting_book",
        heldBook: null,
        firstBook: null,
        removeChoices: null
    });
    tellPlayer(npc, player, "\u0414\u0430\u0439 \u043C\u0435\u043D\u0456 \u0437\u0430\u0447\u0430\u0440\u043E\u0432\u0430\u043D\u0443 \u043A\u043D\u0438\u0433\u0443.");
}

function beginMerge(npc, player, runtime) {
    setSession(runtime, player, {
        mode: "merge",
        step: "waiting_first_book",
        heldBook: null,
        firstBook: null,
        removeChoices: null
    });
    tellPlayer(npc, player, "\u0414\u0430\u0439 \u043C\u0435\u043D\u0456 \u043F\u0435\u0440\u0448\u0443 \u0437\u0430\u0447\u0430\u0440\u043E\u0432\u0430\u043D\u0443 \u043A\u043D\u0438\u0433\u0443.");
}

function beginRemove(npc, player, runtime) {
    setSession(runtime, player, {
        mode: "remove",
        step: "waiting_item",
        heldBook: null,
        firstBook: null,
        removeChoices: null
    });
    tellPlayer(npc, player, "\u041D\u0430\u0442\u0438\u0441\u043D\u0438 \u041F\u041A\u041C \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u043E\u043C, \u0437 \u044F\u043A\u043E\u0433\u043E \u0445\u043E\u0447\u0435\u0448 \u0437\u043D\u044F\u0442\u0438 \u0437\u0430\u0447\u0430\u0440\u0443\u0432\u0430\u043D\u043D\u044F.");
}

function handleApplyInteract(npc, player, runtime, session) {
    var heldItem = itemUtils.getMainhandItem(player);

    if (session.step == "waiting_book") {
        if (!enchantUtils.isEnchantedBook(heldItem)) {
            tellPlayer(npc, player, "\u0414\u0430\u0439 \u043C\u0435\u043D\u0456 \u0441\u0430\u043C\u0435 \u0437\u0430\u0447\u0430\u0440\u043E\u0432\u0430\u043D\u0443 \u043A\u043D\u0438\u0433\u0443.");
            return;
        }

        session.heldBook = itemUtils.cloneSingleItem(heldItem);
        if (itemUtils.isEmptyItem(session.heldBook)) {
            tellPlayer(npc, player, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043F\u0440\u0438\u0439\u043D\u044F\u0442\u0438 \u043A\u043D\u0438\u0433\u0443.");
            clearSession(runtime, player);
            return;
        }

        if (!itemUtils.decrementHeldItem(player, 1)) {
            session.heldBook = null;
            tellPlayer(npc, player, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u0430\u0431\u0440\u0430\u0442\u0438 \u043A\u043D\u0438\u0433\u0443.");
            clearSession(runtime, player);
            return;
        }

        session.step = "waiting_target";
        tellPlayer(npc, player, "\u0422\u0435\u043F\u0435\u0440 \u0434\u0430\u0439 \u043F\u0440\u0435\u0434\u043C\u0435\u0442, \u043D\u0430 \u044F\u043A\u0438\u0439 \u0442\u0440\u0435\u0431\u0430 \u043D\u0430\u043A\u043B\u0430\u0441\u0442\u0438 \u0437\u0430\u0447\u0430\u0440\u0443\u0432\u0430\u043D\u043D\u044F.");
        return;
    }

    if (session.step != "waiting_target") return;

    if (itemUtils.isEmptyItem(session.heldBook)) {
        clearSession(runtime, player);
        tellPlayer(npc, player, "\u041E\u043F\u0435\u0440\u0430\u0446\u0456\u044F \u0437\u0456\u043F\u0441\u0443\u0432\u0430\u043B\u0430\u0441\u044F. \u041F\u043E\u0447\u043D\u0438 \u0449\u0435 \u0440\u0430\u0437.");
        return;
    }

    var applyResult = enchantUtils.applyBookToTarget(session.heldBook, heldItem);
    if (!applyResult.ok) {
        returnStoredItem(player, session.heldBook);
        clearSession(runtime, player);
        tellPlayer(npc, player, "\u0426\u044E \u043A\u043D\u0438\u0433\u0443 \u043D\u0435 \u043C\u043E\u0436\u043D\u0430 \u043D\u0430\u043A\u043B\u0430\u0441\u0442\u0438 \u043D\u0430 \u0446\u0435\u0439 \u043F\u0440\u0435\u0434\u043C\u0435\u0442. \u042F \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0432 \u043C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0438.");
        return;
    }

    itemUtils.updateInventory(player);
    clearSession(runtime, player);
    tellPlayer(npc, player, "\u0417\u0430\u0447\u0430\u0440\u0443\u0432\u0430\u043D\u043D\u044F \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u043D\u0430\u043A\u043B\u0430\u0434\u0435\u043D\u043E.");
}

function handleMergeInteract(npc, player, runtime, session) {
    var heldItem = itemUtils.getMainhandItem(player);

    if (session.step == "waiting_first_book") {
        if (!enchantUtils.isEnchantedBook(heldItem)) {
            tellPlayer(npc, player, "\u0414\u0430\u0439 \u043C\u0435\u043D\u0456 \u043F\u0435\u0440\u0448\u0443 \u0437\u0430\u0447\u0430\u0440\u043E\u0432\u0430\u043D\u0443 \u043A\u043D\u0438\u0433\u0443.");
            return;
        }

        session.firstBook = itemUtils.cloneSingleItem(heldItem);
        if (itemUtils.isEmptyItem(session.firstBook)) {
            tellPlayer(npc, player, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043F\u0440\u0438\u0439\u043D\u044F\u0442\u0438 \u043A\u043D\u0438\u0433\u0443.");
            clearSession(runtime, player);
            return;
        }

        if (!itemUtils.decrementHeldItem(player, 1)) {
            session.firstBook = null;
            tellPlayer(npc, player, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u0430\u0431\u0440\u0430\u0442\u0438 \u043A\u043D\u0438\u0433\u0443.");
            clearSession(runtime, player);
            return;
        }

        session.step = "waiting_second_book";
        tellPlayer(npc, player, "\u0422\u0435\u043F\u0435\u0440 \u0434\u0430\u0439 \u043C\u0435\u043D\u0456 \u0434\u0440\u0443\u0433\u0443 \u0437\u0430\u0447\u0430\u0440\u043E\u0432\u0430\u043D\u0443 \u043A\u043D\u0438\u0433\u0443.");
        return;
    }

    if (session.step != "waiting_second_book") return;

    if (!enchantUtils.isEnchantedBook(heldItem)) {
        tellPlayer(npc, player, "\u0422\u0435\u043F\u0435\u0440 \u0434\u0430\u0439 \u0441\u0430\u043C\u0435 \u0434\u0440\u0443\u0433\u0443 \u0437\u0430\u0447\u0430\u0440\u043E\u0432\u0430\u043D\u0443 \u043A\u043D\u0438\u0433\u0443.");
        return;
    }

    if (itemUtils.isEmptyItem(session.firstBook)) {
        clearSession(runtime, player);
        tellPlayer(npc, player, "\u041E\u043F\u0435\u0440\u0430\u0446\u0456\u044F \u0437\u0456\u043F\u0441\u0443\u0432\u0430\u043B\u0430\u0441\u044F. \u041F\u043E\u0447\u043D\u0438 \u0449\u0435 \u0440\u0430\u0437.");
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
            tellPlayer(npc, player, "\u0426\u0435 \u0437\u0430\u0447\u0430\u0440\u0443\u0432\u0430\u043D\u043D\u044F \u0432\u0436\u0435 \u043C\u0430\u0454 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u0456\u0432\u0435\u043D\u044C.");
        } else {
            tellPlayer(npc, player, "\u0426\u0456 \u043A\u043D\u0438\u0433\u0438 \u043D\u0435 \u043C\u043E\u0436\u043D\u0430 \u043A\u043E\u0440\u0435\u043A\u0442\u043D\u043E \u043E\u0431'\u0454\u0434\u043D\u0430\u0442\u0438. \u042F \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0432 \u043C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0438.");
        }
        return;
    }

    var resultBook = enchantUtils.createEnchantedBookFromMap(mergeResult.map);
    if (itemUtils.isEmptyItem(resultBook)) {
        returnStoredItem(player, session.firstBook);
        clearSession(runtime, player);
        tellPlayer(npc, player, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0441\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442.");
        return;
    }

    if (!itemUtils.decrementHeldItem(player, 1)) {
        returnStoredItem(player, session.firstBook);
        clearSession(runtime, player);
        tellPlayer(npc, player, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u0430\u0431\u0440\u0430\u0442\u0438 \u0434\u0440\u0443\u0433\u0443 \u043A\u043D\u0438\u0433\u0443.");
        return;
    }

    if (!itemUtils.giveItemOrDrop(player, resultBook)) {
        returnStoredItem(player, session.firstBook);
        clearSession(runtime, player);
        tellPlayer(npc, player, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0432\u0456\u0434\u0434\u0430\u0442\u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0443\u044E\u0447\u0443 \u043A\u043D\u0438\u0433\u0443.");
        return;
    }

    clearSession(runtime, player);
    tellPlayer(npc, player, "\u041A\u043D\u0438\u0433\u0438 \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u043E\u0431'\u0454\u0434\u043D\u0430\u043D\u043E.");
}

function handleRemoveInteract(npc, player, runtime, session) {
    if (session.step != "waiting_item") return;

    var heldItem = itemUtils.getMainhandItem(player);
    var entries = enchantUtils.getEnchantmentEntries(heldItem);
    if (entries == null || entries.length <= 0) {
        tellPlayer(npc, player, "\u041D\u0430 \u0446\u044C\u043E\u043C\u0443 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0456 \u043D\u0435\u043C\u0430\u0454 \u0437\u0430\u0447\u0430\u0440\u0443\u0432\u0430\u043D\u044C.");
        clearSession(runtime, player);
        return;
    }

    session.step = "gui_open";
    session.removeChoices = entries;

    try {
        player.showCustomGui(createRemoveGui(player, entries));
    } catch (e) {
        clearSession(runtime, player);
        tellPlayer(npc, player, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0432\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u0441\u043F\u0438\u0441\u043E\u043A \u0437\u0430\u0447\u0430\u0440\u0443\u0432\u0430\u043D\u044C.");
    }
}

function createRemoveGui(player, entries) {
    var gui = guiUtils.createGui(REMOVE_GUI_ID, 320, 240, player);
    gui.addLabel(1, "\u0417\u043D\u044F\u0442\u0438 \u0437\u0430\u0447\u0430\u0440\u0443\u0432\u0430\u043D\u043D\u044F", 10, 10, 220, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 34, 300, 34, 0x8B6F47, 1.5);
    gui.addLabel(3, "\u0412\u0438\u0431\u0435\u0440\u0438 \u043E\u0434\u043D\u0435 \u0437\u0430\u0447\u0430\u0440\u0443\u0432\u0430\u043D\u043D\u044F", 10, 42, 220, 14, 0xE0E0E0);
    gui.addScroll(REMOVE_SCROLL_ID, 10, 58, 300, 124, buildRemoveEntries(entries));
    gui.addTextArea(REMOVE_STATUS_ID, 10, 188, 300, 18);
    gui.addScroll(REMOVE_CANCEL_SCROLL_ID, 10, 210, 300, 20, ["\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438"]);
    guiUtils.setGuiText(gui, REMOVE_STATUS_ID, "\u041E\u0431\u0435\u0440\u0438 \u0437\u0430\u0447\u0430\u0440\u0443\u0432\u0430\u043D\u043D\u044F \u0430\u0431\u043E \u0441\u043A\u0430\u0441\u0443\u0439.");
    return gui;
}

function buildRemoveEntries(entries) {
    var out = [];
    for (var i = 0; i < entries.length; i++) out.push(entries[i].label);
    return out;
}

function finalizeRemoveSelection(npc, player, runtime, session, selected) {
    var heldItem = itemUtils.getMainhandItem(player);
    var currentMap = enchantUtils.getEnchantments(heldItem);
    if (!currentMap.hasOwnProperty(selected.id)) {
        clearSession(runtime, player);
        closePlayerGui(player);
        tellPlayer(npc, player, "\u0422\u0440\u0438\u043C\u0430\u0439 \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u0438\u0439 \u043F\u0440\u0435\u0434\u043C\u0435\u0442 \u0443 \u0433\u043E\u043B\u043E\u0432\u043D\u0456\u0439 \u0440\u0443\u0446\u0456.");
        return;
    }

    var originalMap = enchantUtils.copyEnchantMap(currentMap);
    delete currentMap[selected.id];
    if (!enchantUtils.setEnchantments(heldItem, currentMap)) {
        clearSession(runtime, player);
        closePlayerGui(player);
        tellPlayer(npc, player, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u043C\u0456\u043D\u0438\u0442\u0438 \u043F\u0440\u0435\u0434\u043C\u0435\u0442.");
        return;
    }

    var book = enchantUtils.createEnchantedBook(selected.id, selected.level);
    if (itemUtils.isEmptyItem(book) || !itemUtils.giveItemOrDrop(player, book)) {
        enchantUtils.setEnchantments(heldItem, originalMap);
        clearSession(runtime, player);
        closePlayerGui(player);
        tellPlayer(npc, player, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0432\u0438\u0434\u0430\u0442\u0438 \u043A\u043D\u0438\u0433\u0443 \u0456\u0437 \u0437\u0430\u0447\u0430\u0440\u0443\u0432\u0430\u043D\u043D\u044F\u043C.");
        return;
    }

    itemUtils.updateInventory(player);
    clearSession(runtime, player);
    closePlayerGui(player);
    tellPlayer(npc, player, "\u0417\u0430\u0447\u0430\u0440\u0443\u0432\u0430\u043D\u043D\u044F \u0437\u043D\u044F\u0442\u043E.");
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

function detectDialogService(event) {
    if (getDialogId(event) != DIALOG_ID) return "";

    var optionName = normalizeText(getOptionName(event));
    if (optionName.indexOf("\u043D\u0430\u043A\u043B\u0430\u0441\u0442\u0438") >= 0 || optionName.indexOf("enchant") >= 0) return "apply";
    if (optionName.indexOf("\u043E\u0431'\u0454\u0434\u043D\u0430\u0442\u0438") >= 0 || optionName.indexOf("\u043E\u0431\u044A\u0435\u0434\u0438\u043D\u0438\u0442\u044C") >= 0 || optionName.indexOf("merge") >= 0) return "merge";
    if (optionName.indexOf("\u0437\u043D\u044F\u0442\u0438") >= 0 || optionName.indexOf("\u0441\u043D\u044F\u0442\u044C") >= 0 || optionName.indexOf("remove") >= 0) return "remove";

    var ordinal = getOptionOrdinal(event);
    if (ordinal == 1) return "apply";
    if (ordinal == 2) return "merge";
    if (ordinal == 3) return "remove";
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

function getOptionName(event) {
    try {
        if (event.option != null) return "" + event.option.getName();
    } catch (e1) {}

    try {
        if (event.option != null) return "" + event.option.name;
    } catch (e2) {}

    return "";
}

function getOptionOrdinal(event) {
    try {
        if (event.option != null && event.option.getSlot != null) return parseInt("" + event.option.getSlot(), 10) + 1;
    } catch (e1) {}

    try {
        if (event.option != null && event.option.slot != null) return parseInt("" + event.option.slot, 10) + 1;
    } catch (e2) {}

    try {
        if (event.option != null && event.option.getId != null) return parseInt("" + event.option.getId(), 10);
    } catch (e3) {}

    try {
        if (event.option != null && event.option.id != null) return parseInt("" + event.option.id, 10);
    } catch (e4) {}

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
    onGuiButton: onGuiButton,
    BLACKSMITH_RUNTIME_KEY: BLACKSMITH_RUNTIME_KEY,
    REMOVE_GUI_ID: REMOVE_GUI_ID
};
