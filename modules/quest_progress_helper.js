var QuestProgressNpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var QuestProgressPlayerData = Java.type("noppes.npcs.controllers.data.PlayerData");

var QuestProgressHelper = {
    completeQuest: function(player, questId) {
        try {
            if (!player.hasActiveQuest(questId) && player.canQuestBeAccepted(questId)) {
                player.startQuest(questId);
            }
        } catch (e) {}

        this.setObjectivesCompleted(player, questId);
        this.triggerCompletionCheck(player);
    },

    setObjectivesCompleted: function(player, questId) {
        try {
            var quest = QuestProgressNpcAPI.Instance().getQuests().get(questId);
            if (quest == null) return;

            var objectives = quest.getObjectives(player);
            if (objectives == null) return;

            for (var i = 0; i < objectives.length; i++) {
                var objective = objectives[i];
                if (objective == null) continue;

                var maxProgress = objective.getMaxProgress();
                if (maxProgress > 0) {
                    objective.setProgress(maxProgress);
                }
            }
        } catch (e) {}
    },

    triggerCompletionCheck: function(player) {
        try {
            var playerData = QuestProgressPlayerData.get(player.getMCEntity());
            if (playerData == null || playerData.questData == null) return;

            playerData.questData.checkQuestCompletion(player.getMCEntity(), -1);
        } catch (e) {}
    }
};
