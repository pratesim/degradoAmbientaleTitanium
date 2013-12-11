var georep = require('georep');

$.tabGroup.addEventListener("open", function() {
    if (Ti.Platform.osname === "android") {
        if (! $.tabGroup.activity) {
            Ti.API.error("Can't access action bar on a lightweight window.");
        } else {
        	var activity = $.tabGroup.getActivity();
            var actionBar = activity.actionBar;
            if (actionBar) {
                actionBar.icon = "appicon.png";
                actionBar.title = "Degrado Ambientale";
            }
        }
    }
});

var gotoOptions = function(){
	Alloy.Globals.options.winOptions.open();
};
$.tabGroup.open();
