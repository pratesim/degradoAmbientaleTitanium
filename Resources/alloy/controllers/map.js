function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "map";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.winMap = Ti.UI.createWindow({
        id: "winMap",
        title: "Mappa"
    });
    $.__views.winMap && $.addTopLevelView($.__views.winMap);
    $.__views.labelMap = Ti.UI.createLabel({
        text: "Mappa",
        id: "labelMap",
        color: "#999"
    });
    $.__views.winMap.add($.__views.labelMap);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;