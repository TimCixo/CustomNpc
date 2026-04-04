function init(event) {
    var npc = event.npc;

    putDefault(npc, "pokemon_book_species", "mewtwo");
    putDefault(npc, "pokemon_book_level", "1");
    putDefault(npc, "pokemon_book_shiny", "no");
    putDefault(npc, "pokemon_book_ball", "cobblemon:poke_ball");
    putDefault(npc, "pokemon_book_ability", "pressure");
    putDefault(npc, "pokemon_book_iv", "2/31/28/15/23/3");
    putDefault(npc, "pokemon_book_ev", "0/0/0/0/0/0");
}

function putDefault(npc, key, value) {
    if (!npc.getStoreddata().has(key)) {
        npc.getStoreddata().put(key, value);
    }
}
