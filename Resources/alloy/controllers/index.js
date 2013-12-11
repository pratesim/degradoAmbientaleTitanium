function Controller() {
    function __alloyId1() {
        $.__views.tabGroup.removeEventListener("open", __alloyId1);
        if ($.__views.tabGroup.activity) $.__views.tabGroup.activity.onCreateOptionsMenu = function(e) {
            var __alloyId0 = {
                id: "menuItem",
                title: "Opzioni",
                showAsAction: Ti.Android.SHOW_AS_ACTION_NEVER
            };
            $.__views.menuItem = e.menu.add(_.pick(__alloyId0, Alloy.Android.menuItemCreateArgs));
            $.__views.menuItem.applyProperties(_.omit(__alloyId0, Alloy.Android.menuItemCreateArgs));
            gotoOptions ? $.__views.menuItem.addEventListener("click", gotoOptions) : __defers["$.__views.menuItem!click!gotoOptions"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.tabGroup = Ti.UI.createTabGroup({
        id: "tabGroup",
        backgroundColor: "white"
    });
    $.__views.tabGroup.addEventListener("open", __alloyId1);
    $.__views.map = Alloy.createController("map", {
        id: "map"
    });
    $.__views.tabMap = Ti.UI.createTab({
        window: $.__views.map.getViewEx({
            recurse: true
        }),
        id: "tabMap",
        title: "Mappa",
        icon: "KS_nav_views.png"
    });
    $.__views.tabGroup.addTab($.__views.tabMap);
    $.__views.myRepo = Alloy.createController("myRepo", {
        id: "myRepo"
    });
    $.__views.tabMyRepo = Ti.UI.createTab({
        window: $.__views.myRepo.getViewEx({
            recurse: true
        }),
        id: "tabMyRepo",
        title: "Mie Segnalazioni",
        icon: "KS_nav_views.png"
    });
    $.__views.tabGroup.addTab($.__views.tabMyRepo);
    $.__views.sendRepo = Alloy.createController("sendRepo", {
        id: "sendRepo"
    });
    $.__views.tabSendRepo = Ti.UI.createTab({
        window: $.__views.sendRepo.getViewEx({
            recurse: true
        }),
        id: "tabSendRepo",
        title: "Segnala",
        icon: "KS_nav_views.png"
    });
    $.__views.tabGroup.addTab($.__views.tabSendRepo);
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("georep");
    $.tabGroup.addEventListener("open", function() {
        if ($.tabGroup.activity) {
            var activity = $.tabGroup.getActivity();
            var actionBar = activity.actionBar;
            if (actionBar) {
                actionBar.icon = "appicon.png";
                actionBar.title = "Degrado Ambientale";
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    var gotoOptions = function() {
        Alloy.Globals.options.winOptions.open();
    };
    $.tabGroup.open();
    __defers["$.__views.menuItem!click!gotoOptions"] && $.__views.menuItem.addEventListener("click", gotoOptions);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;