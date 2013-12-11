function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "options";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.winOptions = Ti.UI.createWindow({
        id: "winOptions",
        title: "Opzioni",
        fullscreen: "false"
    });
    $.__views.winOptions && $.addTopLevelView($.__views.winOptions);
    $.__views.labelOptions = Ti.UI.createLabel({
        text: "Opzioni",
        id: "labelOptions",
        color: "#999"
    });
    $.__views.winOptions.add($.__views.labelOptions);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.winOptions.addEventListener("open", function() {
        if ($.winOptions.activity) {
            var actionBar = $.winOptions.activity.actionBar;
            if (actionBar) {
                actionBar.title = "Opzioni";
                actionBar.onHomeIconItemSelected = function() {
                    $.winOptions.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;