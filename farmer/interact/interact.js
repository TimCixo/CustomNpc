var BlockPos = Java.type("net.minecraft.core.BlockPos");
var Container = Java.type("net.minecraft.world.Container");
var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var WritableBookContent = Java.type("net.minecraft.world.item.component.WritableBookContent");
var Filterable = Java.type("net.minecraft.server.network.Filterable");
var NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var Items = Java.type("net.minecraft.world.item.Items");
var MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var ArrayList = Java.type("java.util.ArrayList");

var CONFIG_MARKER = "config_id: farmer";

function interact(event) {
    var npc = event.npc;
    var player = event.player;

    ensureConfigDefaults(npc);
    bindChestOnce(npc);

    var held = player.getMainhandItem();
    if (isFarmerConfigBook(held)) {
        applyConfigFromBook(npc, player, held);
        return;
    }

    if (player.getMCEntity().isShiftKeyDown()) {
        toggleFarmer(npc, player);
        return;
    }

    giveTemplateBook(player, npc);
    sendCurrentConfig(player, npc);
    player.message("§7Отредактируй книгу, держи её в руке и нажми ПКМ по NPC ещё раз.");
    player.message("§7Shift+ПКМ по NPC: включить/выключить фермера.");
}

function isFarmerConfigBook(item) {
    if (item == null || item.isEmpty()) return false;

    var lines = readBookLines(item);
    if (lines == null || lines.length == 0) return false;

    for (var i = 0; i < lines.length; i++) {
        if (normalizeLine(lines[i]) == CONFIG_MARKER) {
            return true;
        }
    }

    return false;
}

function applyConfigFromBook(npc, player, item) {
    var lines = readBookLines(item);
    if (lines == null || lines.length == 0) {
        player.message("§cНе удалось прочитать книгу конфига.");
        return;
    }

    var changes = 0;
    changes += applyIntLine(npc, lines, "farm_cfg_v_radius", 1, 64, 15, [
        "радиус по вертикали",
        "вертикаль",
        "vertical radius"
    ]);
    changes += applyIntLine(npc, lines, "farm_cfg_h_radius", 1, 64, 15, [
        "радиус по горизонтали",
        "радиус по горизонтали xz",
        "радиус по горизонтали x/z",
        "радиус по горизонтали x z",
        "горизонтальный радиус",
        "horizontal radius"
    ]);
    changes += applyIntLine(npc, lines, "farm_cfg_chest_search_radius", 1, 64, 16, [
        "радиус поиска сундука",
        "поиск сундука",
        "chest search radius"
    ]);
    changes += applyIntLine(npc, lines, "farm_cfg_timer_ticks", 1, 200, 10, [
        "таймер",
        "таймер тики",
        "timer ticks"
    ]);
    changes += applyFloatLine(npc, lines, "farm_cfg_move_speed", 0.1, 2.0, 0.5, [
        "скорость",
        "швидкість",
        "move speed"
    ]);
    changes += applyIntLine(npc, lines, "farm_cfg_harvest_batch", 1, 64, 8, [
        "пачка сбора",
        "пачка збору",
        "harvest batch"
    ]);
    changes += applyFloatLine(npc, lines, "farm_cfg_crop_reach_sq", 0.5, 16.0, 3.0, [
        "дистанция до растения sq",
        "дистанция до урожая sq",
        "до растения sq",
        "crop reach sq"
    ]);
    changes += applyFloatLine(npc, lines, "farm_cfg_chest_reach_sq", 0.5, 16.0, 4.0, [
        "дистанция до сундука sq",
        "до сундука sq",
        "chest reach sq"
    ]);
    changes += applyFloatLine(npc, lines, "farm_cfg_pickup_radius", 0.5, 6.0, 1.8, [
        "радиус подбора",
        "підбір",
        "pickup radius"
    ]);
    changes += applyIntLine(npc, lines, "farm_cfg_cobblemon_berry_drop_count", 1, 64, 3, [
        "cobblemon berry drop",
        "berry drop",
        "berry count"
    ]);

    bindChestOnce(npc);
    npc.timers.forceStart(1, getCfgInt(npc, "farm_cfg_timer_ticks", 10), true);

    if (changes <= 0) {
        player.message("§eВ книге не найдено ни одного параметра конфига.");
        return;
    }

    player.message("§aКонфиг фермера обновлён из книги.");
    sendCurrentConfig(player, npc);
}

function applyIntLine(npc, lines, key, min, max, def, aliases) {
    var value = findNumericValue(lines, aliases, false);
    if (value == null) return 0;

    var parsed = parseIntSafe(value, def);
    if (parsed < min) parsed = min;
    if (parsed > max) parsed = max;

    npc.getStoreddata().put(key, "" + parsed);
    return 1;
}

function applyFloatLine(npc, lines, key, min, max, def, aliases) {
    var value = findNumericValue(lines, aliases, true);
    if (value == null) return 0;

    var parsed = parseFloatSafe(value, def);
    if (parsed < min) parsed = min;
    if (parsed > max) parsed = max;

    npc.getStoreddata().put(key, "" + parsed);
    return 1;
}

function findNumericValue(lines, aliases, allowFloat) {
    for (var i = 0; i < lines.length; i++) {
        var raw = "" + lines[i];
        var lower = normalizeLine(raw);
        for (var j = 0; j < aliases.length; j++) {
            var alias = aliases[j];
            if (lower.indexOf(alias) !== -1) {
                return extractNumber(raw, allowFloat);
            }
        }
    }
    return null;
}

function extractNumber(line, allowFloat) {
    var s = "" + line;
    var match = allowFloat
        ? s.match(/-?\d+(?:[.,]\d+)?/)
        : s.match(/-?\d+/);

    if (match == null) return null;
    return ("" + match[0]).replace(",", ".");
}

function readBookLines(item) {
    var mcStack = item.getMCItemStack();
    if (mcStack == null || mcStack.isEmpty()) return null;

    var lines = new ArrayList();
    var writable = mcStack.get(DataComponents.WRITABLE_BOOK_CONTENT);
    if (writable != null) {
        collectWritableBookLines(lines, writable);
    }

    var written = mcStack.get(DataComponents.WRITTEN_BOOK_CONTENT);
    if (written != null) {
        collectWrittenBookLines(lines, written);
    }

    if (lines.isEmpty()) return null;
    return lines.toArray();
}

function collectWritableBookLines(out, content) {
    var pages = content.pages();
    if (pages == null) return;

    var it = pages.iterator();
    while (it.hasNext()) {
        var filterable = it.next();
        if (filterable == null) continue;
        pushPageLines(out, String(filterable.raw()));
    }
}

function collectWrittenBookLines(out, content) {
    var title = content.title();
    if (title != null) {
        out.add("title: " + String(title.raw()));
    }

    out.add("author: " + String(content.author()));

    var pages = content.getPages(false);
    if (pages == null) return;

    var it = pages.iterator();
    while (it.hasNext()) {
        var page = it.next();
        if (page == null) continue;
        pushPageLines(out, String(page.getString()));
    }
}

function pushPageLines(out, pageText) {
    var split = ("" + pageText).split(/\r?\n/);
    for (var i = 0; i < split.length; i++) {
        var line = trimString(split[i]);
        if (line.length > 0) {
            out.add(line);
        }
    }
}

function giveTemplateBook(player, npc) {
    var book = createWritableBook();
    if (book == null || book.isEmpty()) {
        player.message("§cНе удалось создать книгу конфига.");
        return;
    }
    book.setStackSize(1);

    var mcStack = book.getMCItemStack();
    var pages = new ArrayList();

    pages.add(Filterable.passThrough(buildTemplatePage1(npc)));
    pages.add(Filterable.passThrough(buildTemplatePage2(npc)));

    try {
        mcStack.set(DataComponents.WRITABLE_BOOK_CONTENT, new WritableBookContent(pages));
    } catch (e) {
        player.message("§eНе удалось заполнить книгу автоматически. Выдана пустая writable_book.");
    }

    var given = false;
    try {
        given = player.giveItem(book);
    } catch (e2) {}

    if (!given) {
        given = putInFirstEmptySlot(player, book);
    }

    if (!given) {
        player.message("§cНе удалось выдать книгу. Освободи место в инвентаре.");
        return;
    }

    player.message("§aШаблон книги конфига выдан.");
}

function createWritableBook() {
    try {
        var mcStack = new MCItemStack(Items.WRITABLE_BOOK);
        return NpcAPI.Instance().getIItemStack(mcStack);
    } catch (e) {
        return null;
    }
}

function putInFirstEmptySlot(player, item) {
    var inv = player.getInventory();
    if (inv == null) return false;

    var size = inv.getSize();
    for (var i = 0; i < size; i++) {
        var slot = inv.getSlot(i);
        if (slot == null || slot.isEmpty()) {
            inv.setSlot(i, item);
            return true;
        }
    }

    return false;
}

function buildTemplatePage1(npc) {
    return CONFIG_MARKER + "\n"
        + "Радиус по вертикали: " + getCfgRaw(npc, "farm_cfg_v_radius") + "\n"
        + "Радиус по горизонтали: " + getCfgRaw(npc, "farm_cfg_h_radius") + "\n"
        + "Радиус поиска сундука: " + getCfgRaw(npc, "farm_cfg_chest_search_radius") + "\n"
        + "Таймер: " + getCfgRaw(npc, "farm_cfg_timer_ticks") + "\n"
        + "Скорость: " + getCfgRaw(npc, "farm_cfg_move_speed");
}

function buildTemplatePage2(npc) {
    return "Пачка сбора: " + getCfgRaw(npc, "farm_cfg_harvest_batch") + "\n"
        + "Дистанция до растения sq: " + getCfgRaw(npc, "farm_cfg_crop_reach_sq") + "\n"
        + "Дистанция до сундука sq: " + getCfgRaw(npc, "farm_cfg_chest_reach_sq") + "\n"
        + "Радиус подбора: " + getCfgRaw(npc, "farm_cfg_pickup_radius") + "\n"
        + "Cobblemon berry drop: " + getCfgRaw(npc, "farm_cfg_cobblemon_berry_drop_count");
}

function toggleFarmer(npc, player) {
    if (npc.getStoreddata().get("farm_enabled") == "1") {
        npc.getStoreddata().put("farm_enabled", "0");
        npc.getStoreddata().put("farm_state", "idle");
        stopNavigation(npc);
        player.message("§e[Фермер] Выключен.");
        return;
    }

    bindChestOnce(npc);
    if (!hasBoundChest(npc)) {
        player.message("§cКонтейнер не привязан. Поставь сундук или бочку ближе.");
        return;
    }

    npc.getStoreddata().put("farm_enabled", "1");
    npc.getStoreddata().put("farm_state", "search_crop");
    npc.getStoreddata().put("farm_batch_count", "0");
    npc.timers.forceStart(1, getCfgInt(npc, "farm_cfg_timer_ticks", 10), true);
    player.message("§a[Фермер] Включен.");
}

function sendCurrentConfig(player, npc) {
    player.message("§7--- Конфиг фермера ---");
    player.message("§7Радиус по вертикали: §f" + getCfgRaw(npc, "farm_cfg_v_radius"));
    player.message("§7Радиус по горизонтали: §f" + getCfgRaw(npc, "farm_cfg_h_radius"));
    player.message("§7Радиус поиска сундука: §f" + getCfgRaw(npc, "farm_cfg_chest_search_radius"));
    player.message("§7Таймер: §f" + getCfgRaw(npc, "farm_cfg_timer_ticks"));
    player.message("§7Скорость: §f" + getCfgRaw(npc, "farm_cfg_move_speed"));
    player.message("§7Пачка сбора: §f" + getCfgRaw(npc, "farm_cfg_harvest_batch"));
    player.message("§7Дистанция до растения sq: §f" + getCfgRaw(npc, "farm_cfg_crop_reach_sq"));
    player.message("§7Дистанция до сундука sq: §f" + getCfgRaw(npc, "farm_cfg_chest_reach_sq"));
    player.message("§7Радиус подбора: §f" + getCfgRaw(npc, "farm_cfg_pickup_radius"));
    player.message("§7Cobblemon berry drop: §f" + getCfgRaw(npc, "farm_cfg_cobblemon_berry_drop_count"));

    if (hasBoundChest(npc)) {
        player.message("§7Контейнер: §f"
            + npc.getStoreddata().get("farm_chest_x") + ", "
            + npc.getStoreddata().get("farm_chest_y") + ", "
            + npc.getStoreddata().get("farm_chest_z"));
    } else {
        player.message("§7Контейнер: §cне привязан");
    }
}

function normalizeLine(s) {
    return trimString("" + s).toLowerCase();
}

function trimString(s) {
    return ("" + s).replace(/^\s+|\s+$/g, "");
}

function ensureConfigDefaults(npc) {
    putDefault(npc, "farm_cfg_h_radius", "15");
    putDefault(npc, "farm_cfg_v_radius", "15");
    putDefault(npc, "farm_cfg_chest_search_radius", "16");
    putDefault(npc, "farm_cfg_timer_ticks", "10");
    putDefault(npc, "farm_cfg_move_speed", "0.5");
    putDefault(npc, "farm_cfg_harvest_batch", "8");
    putDefault(npc, "farm_cfg_crop_reach_sq", "3.0");
    putDefault(npc, "farm_cfg_chest_reach_sq", "4.0");
    putDefault(npc, "farm_cfg_pickup_radius", "1.8");
    putDefault(npc, "farm_cfg_cobblemon_berry_drop_count", "3");
}

function putDefault(npc, key, value) {
    if (!npc.getStoreddata().has(key)) {
        npc.getStoreddata().put(key, value);
    }
}

function getCfgRaw(npc, key) {
    return "" + npc.getStoreddata().get(key);
}

function bindChestOnce(npc) {
    if (hasBoundChest(npc)) return;

    var level = npc.getMCEntity().level();
    var chestPos = findNearestChestPos(level, npc);
    if (chestPos == null) return;

    npc.getStoreddata().put("farm_chest_x", "" + chestPos.getX());
    npc.getStoreddata().put("farm_chest_y", "" + chestPos.getY());
    npc.getStoreddata().put("farm_chest_z", "" + chestPos.getZ());
}

function hasBoundChest(npc) {
    return npc.getStoreddata().has("farm_chest_x")
        && npc.getStoreddata().has("farm_chest_y")
        && npc.getStoreddata().has("farm_chest_z");
}

function findNearestChestPos(level, npc) {
    var cx = Math.floor(npc.getX());
    var cy = Math.floor(npc.getY());
    var cz = Math.floor(npc.getZ());
    var vRadius = getCfgInt(npc, "farm_cfg_v_radius", 15);
    var chestRadius = getCfgInt(npc, "farm_cfg_chest_search_radius", 16);

    var best = null;
    var bestDist = 999999999;

    for (var y = cy - vRadius; y <= cy + vRadius; y++) {
        for (var x = cx - chestRadius; x <= cx + chestRadius; x++) {
            for (var z = cz - chestRadius; z <= cz + chestRadius; z++) {
                var pos = BlockPos.containing(x, y, z);
                var state = level.getBlockState(pos);
                if (state == null || state.isAir()) continue;

                var blockId = String(BuiltInRegistries.BLOCK.getKey(state.getBlock()));
                if (blockId.indexOf("chest") === -1 && blockId.indexOf("barrel") === -1) continue;

                var be = level.getBlockEntity(pos);
                if (be == null) continue;
                if (!(be instanceof Container)) continue;

                var dx = x - cx;
                var dy = y - cy;
                var dz = z - cz;
                var distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < bestDist) {
                    bestDist = distSq;
                    best = pos;
                }
            }
        }
    }

    return best;
}

function stopNavigation(npc) {
    try {
        npc.getMCEntity().getNavigation().stop();
    } catch (e) {}
}

function getCfgInt(npc, key, def) {
    return parseIntSafe(npc.getStoreddata().get(key), def);
}

function parseIntSafe(s, def) {
    try {
        var value = parseInt("" + s, 10);
        return isNaN(value) ? def : value;
    } catch (e) {
        return def;
    }
}

function parseFloatSafe(s, def) {
    try {
        var value = parseFloat(("" + s).replace(",", "."));
        return isNaN(value) ? def : value;
    } catch (e) {
        return def;
    }
}
