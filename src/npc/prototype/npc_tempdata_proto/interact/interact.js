var TEMP_COUNTER_KEY = "counter_proto";
var TEMP_CHAIN_KEY = "chain_proto";
var TEMP_ARRAY_KEY = "array_proto";
var TEMP_ALIAS_KEY = "alias_proto";
var TEMP_JAVA_KEY = "java_proto";
var TEMP_FACTORY_KEY = "factory_proto";

function interact(event) {
    var npc = event.npc;
    var counter = npc.getTempdata().get(TEMP_COUNTER_KEY);
    var chain = npc.getTempdata().get(TEMP_CHAIN_KEY);
    var spellbook = npc.getTempdata().get(TEMP_ARRAY_KEY);
    var alias = npc.getTempdata().get(TEMP_ALIAS_KEY);
    var javaBox = npc.getTempdata().get(TEMP_JAVA_KEY);
    var factory = npc.getTempdata().get(TEMP_FACTORY_KEY);

    counter.inc();
    chain.run();
    spellbook.upgrade();
    spellbook.print();
    alias.touchLeft();
    alias.print();
    javaBox.add("tick_" + counter.value);
    javaBox.print();

    var alpha = factory.createUnit("alpha");
    var beta = factory.createUnit("beta");
    alpha.hit(3);
    beta.hit(1);
    alpha.print();
    beta.print();
    npc.say("Factory seed: " + factory.seed);
    factory.units[0].hit(1);
    factory.units[1].hit(2);
    factory.printStored();

    var alphaClone = factory.units[0].clone();
    alphaClone.hit(2);
    alphaClone.tuneMeta();
    alphaClone.print();
    factory.units[0].print();
    npc.say("Factory units after clone: " + factory.units.length);
}
