function interact(event) {
    var player = event.player;
    var item = player.getMainhandItem();

    if (item == null || item.isEmpty()) {
        player.message("§cВозьми предмет в основную руку.");
        return;
    }

    var mcStack = item.getMCItemStack();
    if (mcStack == null || mcStack.isEmpty()) {
        player.message("§cНе удалось прочитать предмет.");
        return;
    }

    if (!mcStack.isDamageableItem()) {
        player.message("§eУ этого предмета нет прочности.");
        return;
    }

    if (mcStack.getDamageValue() <= 0) {
        player.message("§7Предмет уже полностью целый.");
        return;
    }

    mcStack.setDamageValue(0);
    player.updatePlayerInventory();
    player.message("§aПрочность восстановлена.");
}
