function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myRepo";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.winMyRepo = Ti.UI.createWindow({
        id: "winMyRepo",
        title: "Mie Segnalazioni"
    });
    $.__views.winMyRepo && $.addTopLevelView($.__views.winMyRepo);
    $.__views.labelMyRepo = Ti.UI.createLabel({
        text: "Le mie segnalazioni",
        id: "labelMyRepo",
        color: "#999"
    });
    $.__views.winMyRepo.add($.__views.labelMyRepo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;