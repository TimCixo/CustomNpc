var QuestDialogHelper = {
    findByConfirmDialog: function(questDefs, dialogId) {
        if (questDefs == null || questDefs.length == 0) return null;

        for (var i = 0; i < questDefs.length; i++) {
            var quest = questDefs[i];
            if (quest != null && quest.confirmDialogId == dialogId) {
                return quest;
            }
        }

        return null;
    },

    getDialogId: function(event) {
        try {
            if (event.dialog != null) {
                return event.dialog.getId();
            }
        } catch (e) {}

        try {
            if (event.dialog != null) {
                return event.dialog.id;
            }
        } catch (e2) {}

        return -1;
    },

    showDialog: function(player, dialogId, npc) {
        try {
            player.showDialog(dialogId, npc.getName());
        } catch (e) {}
    }
};
