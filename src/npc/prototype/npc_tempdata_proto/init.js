var TEMP_COUNTER_KEY = "counter_proto";
var TEMP_CHAIN_KEY = "chain_proto";
var TEMP_ARRAY_KEY = "array_proto";
var TEMP_ALIAS_KEY = "alias_proto";
var TEMP_JAVA_KEY = "java_proto";
var TEMP_FACTORY_KEY = "factory_proto";

function init(event) {
    var npc = event.npc;

    var counter = {
        value: 0,
        inc: function() {
            this.value++;
            npc.say("Counter: " + this.value);
        }
    };

    var chain = {
        profile: {
            title: "Archivist",
            rank: 7
        },
        bumpRank: function() {
            this.profile.rank++;
        },
        print: function() {
            npc.say(this.profile.title + " #" + this.profile.rank);
        },
        run: function() {
            this.bumpRank();
            this.print();
        }
    };

    var spellbook = {
        spells: [
            { name: "fire", power: 10 },
            { name: "ice", power: 20 }
        ],
        upgrade: function() {
            this.spells[0].power += 5;
            this.spells.push({ name: "wind", power: this.spells.length * 10 });
        },
        print: function() {
            npc.say(
                this.spells[0].name + ":" + this.spells[0].power
                + " | " + this.spells[1].name + ":" + this.spells[1].power
                + " | len=" + this.spells.length
            );
        }
    };

    var shared = {
        points: 0
    };

    var alias = {
        left: shared,
        right: shared,
        touchLeft: function() {
            this.left.points++;
        },
        print: function() {
            npc.say("Alias: " + this.left.points + "/" + this.right.points);
        }
    };

    var ArrayList = Java.type("java.util.ArrayList");
    var javaBox = {
        list: new ArrayList(),
        add: function(value) {
            this.list.add(value);
        },
        print: function() {
            npc.say("JavaList size: " + this.list.size() + " last=" + this.list.get(this.list.size() - 1));
        }
    };

    var factory = {
        seed: 0,
        units: [],
        createUnit: function(name) {
            this.seed++;
            var unit = {
                id: this.seed,
                name: name,
                hp: 10,
                meta: {
                    level: 1,
                    tag: name + "_meta"
                },
                hit: function(damage) {
                    this.hp -= damage;
                },
                tuneMeta: function() {
                    this.meta.level++;
                    this.meta.tag = this.name + "_meta_" + this.meta.level;
                },
                clone: function() {
                    factory.seed++;
                    var copy = {
                        id: factory.seed,
                        name: this.name + "_clone",
                        hp: this.hp,
                        meta: this.meta,
                        hit: this.hit,
                        tuneMeta: this.tuneMeta,
                        clone: this.clone,
                        print: this.print
                    };
                    factory.units.push(copy);
                    return copy;
                },
                print: function() {
                    npc.say(
                        "Unit#" + this.id + " " + this.name
                        + " hp=" + this.hp
                        + " meta=" + this.meta.level + "/" + this.meta.tag
                    );
                }
            };
            this.units.push(unit);
            return unit;
        },
        printStored: function() {
            npc.say("Factory units: " + this.units.length);
            this.units[0].print();
            this.units[1].print();
        }
    };

    npc.getTempdata().put(TEMP_COUNTER_KEY, counter);
    npc.getTempdata().put(TEMP_CHAIN_KEY, chain);
    npc.getTempdata().put(TEMP_ARRAY_KEY, spellbook);
    npc.getTempdata().put(TEMP_ALIAS_KEY, alias);
    npc.getTempdata().put(TEMP_JAVA_KEY, javaBox);
    npc.getTempdata().put(TEMP_FACTORY_KEY, factory);
}
