function dialog(event) {
    ensureSelectionState(event.npc, event.player);
}

function ensureSelectionState(npc, player) {
    var data = npc.getStoreddata();
    var prefix = getPlayerKey(player);

    if (!data.has(prefix + "_item_id")) data.put(prefix + "_item_id", "");
    if (!data.has(prefix + "_item_price")) data.put(prefix + "_item_price", "");
    if (!data.has(prefix + "_item_label")) data.put(prefix + "_item_label", "");
    if (!data.has(prefix + "_count")) data.put(prefix + "_count", "");
}

function getPlayerKey(player) {
    try {
        return "currency_exchange_" + player.getName();
    } catch (e) {
        return "currency_exchange_player";
    }
}
