var BookConfig_BlockPos = Java.type("net.minecraft.core.BlockPos");
var BookConfig_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var BookConfig_WritableBookContent = Java.type("net.minecraft.world.item.component.WritableBookContent");
var BookConfig_Filterable = Java.type("net.minecraft.server.network.Filterable");
var BookConfig_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var BookConfig_Items = Java.type("net.minecraft.world.item.Items");
var BookConfig_MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var BookConfig_ArrayList = Java.type("java.util.ArrayList");

var BookConfig = {
    isConfigBook: function(item, marker) {
        if (item == null || item.isEmpty()) return false;

        var lines = this.readBookLines(item);
        if (lines == null || lines.length == 0) return false;

        var normalizedMarker = this.normalizeLine(marker);
        for (var i = 0; i < lines.length; i++) {
            if (this.normalizeLine(lines[i]) == normalizedMarker) {
                return true;
            }
        }

        return false;
    },

    readBookLines: function(item) {
        var mcStack = item.getMCItemStack();
        if (mcStack == null || mcStack.isEmpty()) return null;

        var lines = new BookConfig_ArrayList();

        var writable = mcStack.get(BookConfig_DataComponents.WRITABLE_BOOK_CONTENT);
        if (writable != null) {
            this.collectWritableBookLines(lines, writable);
        }

        var written = mcStack.get(BookConfig_DataComponents.WRITTEN_BOOK_CONTENT);
        if (written != null) {
            this.collectWrittenBookLines(lines, written);
        }

        if (lines.isEmpty()) return null;
        return lines.toArray();
    },

    collectWritableBookLines: function(out, content) {
        var pages = content.pages();
        if (pages == null) return;

        var it = pages.iterator();
        while (it.hasNext()) {
            var filterable = it.next();
            if (filterable == null) continue;
            this.pushPageLines(out, String(filterable.raw()));
        }
    },

    collectWrittenBookLines: function(out, content) {
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
            this.pushPageLines(out, String(page.getString()));
        }
    },

    pushPageLines: function(out, pageText) {
        var split = ("" + pageText).split(/\r?\n/);
        for (var i = 0; i < split.length; i++) {
            var line = this.trimString(split[i]);
            if (line.length > 0) {
                out.add(line);
            }
        }
    },

    applyMappingsToNpc: function(npc, lines, mappings) {
        var changes = 0;

        for (var i = 0; i < mappings.length; i++) {
            var rule = mappings[i];
            if (rule.type == "float") {
                changes += this.applyFloatLine(npc, lines, rule.key, rule.min, rule.max, rule.def, rule.aliases);
            } else {
                changes += this.applyIntLine(npc, lines, rule.key, rule.min, rule.max, rule.def, rule.aliases);
            }
        }

        return changes;
    },

    applyIntLine: function(npc, lines, key, min, max, def, aliases) {
        var value = this.findNumericValue(lines, aliases, false);
        if (value == null) return 0;

        var parsed = this.parseIntSafe(value, def);
        if (parsed < min) parsed = min;
        if (parsed > max) parsed = max;

        npc.getStoreddata().put(key, "" + parsed);
        return 1;
    },

    applyFloatLine: function(npc, lines, key, min, max, def, aliases) {
        var value = this.findNumericValue(lines, aliases, true);
        if (value == null) return 0;

        var parsed = this.parseFloatSafe(value, def);
        if (parsed < min) parsed = min;
        if (parsed > max) parsed = max;

        npc.getStoreddata().put(key, "" + parsed);
        return 1;
    },

    findNumericValue: function(lines, aliases, allowFloat) {
        for (var i = 0; i < lines.length; i++) {
            var raw = "" + lines[i];
            var lower = this.normalizeLine(raw);

            for (var j = 0; j < aliases.length; j++) {
                if (lower.indexOf(aliases[j]) !== -1) {
                    return this.extractNumber(raw, allowFloat);
                }
            }
        }

        return null;
    },

    extractNumber: function(line, allowFloat) {
        var s = "" + line;
        var match = allowFloat
            ? s.match(/-?\d+(?:[.,]\d+)?/)
            : s.match(/-?\d+/);

        if (match == null) return null;
        return ("" + match[0]).replace(",", ".");
    },

    createWritableBook: function() {
        try {
            var mcStack = new BookConfig_MCItemStack(BookConfig_Items.WRITABLE_BOOK);
            return BookConfig_NpcAPI.Instance().getIItemStack(mcStack);
        } catch (e) {
            return null;
        }
    },

    fillWritableBookPages: function(item, pagesText) {
        if (item == null || item.isEmpty()) return false;

        try {
            var mcStack = item.getMCItemStack();
            var pages = new BookConfig_ArrayList();

            for (var i = 0; i < pagesText.length; i++) {
                pages.add(BookConfig_Filterable.passThrough("" + pagesText[i]));
            }

            mcStack.set(BookConfig_DataComponents.WRITABLE_BOOK_CONTENT, new BookConfig_WritableBookContent(pages));
            return true;
        } catch (e) {
            return false;
        }
    },

    giveTemplateBook: function(player, pagesText) {
        var book = this.createWritableBook();
        if (book == null || book.isEmpty()) {
            return false;
        }

        book.setStackSize(1);
        this.fillWritableBookPages(book, pagesText);

        var given = false;
        try {
            given = player.giveItem(book);
        } catch (e) {}

        if (!given) {
            given = this.putInFirstEmptySlot(player, book);
        }

        return given;
    },

    putInFirstEmptySlot: function(player, item) {
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
    },

    normalizeLine: function(s) {
        return this.trimString("" + s).toLowerCase();
    },

    trimString: function(s) {
        return ("" + s).replace(/^\s+|\s+$/g, "");
    },

    parseIntSafe: function(s, def) {
        try {
            var value = parseInt("" + s, 10);
            return isNaN(value) ? def : value;
        } catch (e) {
            return def;
        }
    },

    parseFloatSafe: function(s, def) {
        try {
            var value = parseFloat(("" + s).replace(",", "."));
            return isNaN(value) ? def : value;
        } catch (e) {
            return def;
        }
    }
};
