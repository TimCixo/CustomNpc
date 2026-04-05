var CurrencyDialogParser = {
    resolveOption: function(optionName, config) {
        var normalized = this.normalizeName(optionName);
        var cfg = config || {};

        if (normalized.length == 0) {
            return { kind: "ignore", raw: optionName, normalized: normalized };
        }

        if (this.matchesAny(normalized, cfg.ignore_patterns)) {
            return { kind: "ignore", raw: optionName, normalized: normalized };
        }

        var choices = cfg.choices || [];
        for (var i = 0; i < choices.length; i++) {
            var choice = choices[i];
            if (this.matchesChoice(normalized, choice)) {
                return {
                    kind: "choice",
                    raw: optionName,
                    normalized: normalized,
                    choice: choice.key,
                    value: choice.value
                };
            }
        }

        if (!cfg.disable_currency_number) {
            var moneyNumber = this.parseNumber(normalized, {
                require_dollar: true
            });
            if (moneyNumber != null) {
                return {
                    kind: "number",
                    raw: optionName,
                    normalized: normalized,
                    number_type: "currency",
                    number: moneyNumber
                };
            }
        }

        if (!cfg.disable_plain_number) {
            var plainNumber = this.parseNumber(normalized, {
                forbid_dollar: true
            });
            if (plainNumber != null) {
                return {
                    kind: "number",
                    raw: optionName,
                    normalized: normalized,
                    number_type: "plain",
                    number: plainNumber
                };
            }
        }

        return { kind: "unknown", raw: optionName, normalized: normalized };
    },

    matchesChoice: function(normalizedName, choice) {
        if (choice == null) return false;

        if (choice.patterns && this.matchesAny(normalizedName, choice.patterns)) {
            return true;
        }

        if (choice.exact != null) {
            return normalizedName == this.normalizeName(choice.exact);
        }

        return false;
    },

    matchesAny: function(normalizedName, patterns) {
        if (patterns == null || patterns.length == 0) return false;

        for (var i = 0; i < patterns.length; i++) {
            if (normalizedName.indexOf(this.normalizeName(patterns[i])) !== -1) {
                return true;
            }
        }

        return false;
    },

    parseNumber: function(normalizedName, options) {
        var opts = options || {};

        if (opts.require_dollar && normalizedName.indexOf("$") === -1) {
            return null;
        }

        if (opts.forbid_dollar && normalizedName.indexOf("$") !== -1) {
            return null;
        }

        var match = normalizedName.match(/-?\d+/);
        if (match == null) return null;

        var parsed = this.parseIntSafe(match[0], null);
        return parsed == null ? null : parsed;
    },

    normalizeName: function(s) {
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
    }
};
