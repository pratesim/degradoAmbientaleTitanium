function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "sendRepo";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.winSendRepo = Ti.UI.createWindow({
        id: "winSendRepo",
        title: "Segnala"
    });
    $.__views.winSendRepo && $.addTopLevelView($.__views.winSendRepo);
    $.__views.labelSendRepo = Ti.UI.createLabel({
        text: "Invio Segnalazione",
        id: "labelSendRepo",
        color: "#999"
    });
    $.__views.winSendRepo.add($.__views.labelSendRepo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;