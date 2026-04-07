var CONTROL_TIMER_ID = 1;
var CYCLE_RUNNING_KEY = "pokemon_multiplier_cycle_running";
var DISPLAY_BASE_TITLE_KEY = "pokemon_multiplier_display_base_title";

function init(event) {
    var npc = event.npc;
    var data = npc.getStoreddata();

    try {
        if (("" + data.get(DISPLAY_BASE_TITLE_KEY)).length == 0) {
            data.put(DISPLAY_BASE_TITLE_KEY, "" + npc.getDisplay().getTitle());
        }
    } catch (e) {}

    if (("" + data.get(CYCLE_RUNNING_KEY)) == "1") {
        try {
            npc.timers.forceStart(CONTROL_TIMER_ID, 20, true);
        } catch (e) {}
    }
}
