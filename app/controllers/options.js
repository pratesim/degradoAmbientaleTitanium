$.winOptions.addEventListener("open", function() {
    if (Ti.Platform.osname === "android") {
        if (! $.winOptions.activity) {
            Ti.API.error("Can't access action bar on a lightweight window.");
        } else {
            var actionBar = $.winOptions.activity.actionBar;
            if (actionBar) {
                actionBar.title = "Opzioni";
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                   $.winOptions.close();
                };
            }
        }
    }
});

