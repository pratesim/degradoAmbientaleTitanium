function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.tabGroup = Ti.UI.createTabGroup({
        id: "tabGroup",
        backgroundColor: "white"
    });
    $.__views.__alloyId0 = Alloy.createController("map", {
        id: "__alloyId0"
    });
    $.__views.tabMap = Ti.UI.createTab({
        window: $.__views.__alloyId0.getViewEx({
            recurse: true
        }),
        id: "tabMap",
        title: "Mappa",
        icon: "KS_nav_views.png"
    });
    $.__views.tabGroup.addTab($.__views.tabMap);
    $.__views.__alloyId1 = Alloy.createController("myRepo", {
        id: "__alloyId1"
    });
    $.__views.tabMyRepo = Ti.UI.createTab({
        window: $.__views.__alloyId1.getViewEx({
            recurse: true
        }),
        id: "tabMyRepo",
        title: "Mie Segnalazioni",
        icon: "KS_nav_views.png"
    });
    $.__views.tabGroup.addTab($.__views.tabMyRepo);
    $.__views.__alloyId2 = Alloy.createController("sendRepo", {
        id: "__alloyId2"
    });
    $.__views.tabSendRepo = Ti.UI.createTab({
        window: $.__views.__alloyId2.getViewEx({
            recurse: true
        }),
        id: "tabSendRepo",
        title: "Segnala",
        icon: "KS_nav_views.png"
    });
    $.__views.tabGroup.addTab($.__views.tabSendRepo);
    $.__views.__alloyId3 = Alloy.createController("options", {
        id: "__alloyId3"
    });
    $.__views.tabOptions = Ti.UI.createTab({
        window: $.__views.__alloyId3.getViewEx({
            recurse: true
        }),
        id: "tabOptions",
        title: "Opzioni",
        icon: "KS_nav_views.png"
    });
    $.__views.tabGroup.addTab($.__views.tabOptions);
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("georep");
    $.tabGroup.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;