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
    $.__views.winMap = Ti.UI.createWindow({
        id: "winMap",
        title: "Mappa"
    });
    $.__views.label1 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#999",
        text: "Mappa",
        id: "label1"
    });
    $.__views.winMap.add($.__views.label1);
    $.__views.tabMap = Ti.UI.createTab({
        window: $.__views.winMap,
        id: "tabMap",
        title: "Mappa",
        icon: "KS_nav_views.png"
    });
    $.__views.tabGroup.addTab($.__views.tabMap);
    $.__views.winMyRepo = Ti.UI.createWindow({
        id: "winMyRepo",
        title: "Mie Segnalazioni"
    });
    $.__views.label2 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#999",
        text: "Le mie segnalazioni",
        id: "label2"
    });
    $.__views.winMyRepo.add($.__views.label2);
    $.__views.tabMyRepo = Ti.UI.createTab({
        window: $.__views.winMyRepo,
        id: "tabMyRepo",
        title: "Mie Segnalazioni",
        icon: "KS_nav_views.png"
    });
    $.__views.tabGroup.addTab($.__views.tabMyRepo);
    $.__views.winSendRepo = Ti.UI.createWindow({
        id: "winSendRepo",
        title: "Segnala"
    });
    $.__views.label3 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#999",
        text: "Invio Segnalazione",
        id: "label3"
    });
    $.__views.winSendRepo.add($.__views.label3);
    $.__views.tabSendRepo = Ti.UI.createTab({
        window: $.__views.winSendRepo,
        id: "tabSendRepo",
        title: "Segnala",
        icon: "KS_nav_views.png"
    });
    $.__views.tabGroup.addTab($.__views.tabSendRepo);
    $.__views.winOptions = Ti.UI.createWindow({
        id: "winOptions",
        title: "Opzioni"
    });
    $.__views.label4 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#999",
        text: "Opzioni",
        id: "label4"
    });
    $.__views.winOptions.add($.__views.label4);
    $.__views.tabOptions = Ti.UI.createTab({
        window: $.__views.winOptions,
        id: "tabOptions",
        title: "Opzioni",
        icon: "KS_nav_views.png"
    });
    $.__views.tabGroup.addTab($.__views.tabOptions);
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tabGroup.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;