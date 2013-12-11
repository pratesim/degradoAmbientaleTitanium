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
        title: "Segnala",
        layout: "vertical"
    });
    $.__views.winSendRepo && $.addTopLevelView($.__views.winSendRepo);
    $.__views.titleView = Ti.UI.createView({
        id: "titleView",
        layout: "horizontal",
        height: Titanium.UI.SIZE
    });
    $.__views.winSendRepo.add($.__views.titleView);
    $.__views.titleSendRepo = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        fontFamily: "monospace",
        font: {
            fontSize: "8pt"
        },
        layout: "horizontal",
        text: "Titolo",
        id: "titleSendRepo"
    });
    $.__views.titleView.add($.__views.titleSendRepo);
    $.__views.textArea = Ti.UI.createTextArea({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "black",
        fontFamily: "monospace",
        font: {
            fontSize: "8pt"
        },
        clearOnEdit: true,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "textArea",
        value: "Inserisci il titolo"
    });
    $.__views.titleView.add($.__views.textArea);
    $.__views.msgView = Ti.UI.createView({
        id: "msgView",
        layout: "horizontal",
        height: Titanium.UI.SIZE
    });
    $.__views.winSendRepo.add($.__views.msgView);
    $.__views.msgSendRepo = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        fontFamily: "monospace",
        font: {
            fontSize: "8pt"
        },
        layout: "horizontal",
        text: "Descrizione",
        id: "msgSendRepo"
    });
    $.__views.msgView.add($.__views.msgSendRepo);
    $.__views.textArea = Ti.UI.createTextArea({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "black",
        fontFamily: "monospace",
        font: {
            fontSize: "8pt"
        },
        clearOnEdit: true,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "textArea",
        value: "Inserisci descrizione"
    });
    $.__views.msgView.add($.__views.textArea);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;