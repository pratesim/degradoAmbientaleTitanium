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
    var georep = require("georep");
    georep.user.set({
        name: "mau",
        password: "mau",
        nick: "morris",
        mail: "morris@mail.com"
    });
    georep.db.setAdmin("pratesim", "cou111Viola<3");
    georep.db.setDBName("testdb");
    georep.db.setURLServer({
        proto: "http://",
        host: "pram.homepc.it",
        port: 5984
    });
    var testCallback = function(err, data) {
        err ? Ti.API.debug(err.error) : Ti.API.info(data);
    };
    $.tabGroup.open();
    georep.user.check(testCallback);
    georep.db.getDoc("6eeccb20fb0aae3a637e2b359d0003af", false, testCallback);
    georep.db.getDocsInBox({
        lng: 10.244354,
        lat: 43.78324
    }, {
        lng: 10.424255,
        lat: 43.928314
    }, testCallback);
    georep.db.getUserDocs("org.couchdb.user:99deba01000eee95", testCallback);
    var doc = {
        title: "test Titanium",
        msg: "provo con Titanium a postare un doc",
        img: {
            content_type: "image/jpg",
            data: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKEAsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGi4lHyU4NTc3Nzc3ODc3Nzc3Nzc3Nzc3NzY3NDcrODg3NzQ3Nzc4Nys3Kys3MjE4LissNzQ4NP/AABEIADAAMAMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABQcDBAYB/8QAKxAAAQMDAwMDAwUAAAAAAAAAAQIDBAAFEQYSIQcTMUFRgWFxsRQiMlKR/8QAFwEBAAMAAAAAAAAAAAAAAAAAAAEEBf/EAB0RAAEEAgMAAAAAAAAAAAAAAAABAhEhQXEDBNH/2gAMAwEAAhEDEQA/ALxpSlAKUpQClKUBxWt+oUfS91hWiPbX7lcpad6GGlhACckDJPqSDxj0qJc6vQl6Zi3qFbu53ZC47rEiWlktLSkK4JB3AgiuZ6mLbhdatOTJqkNRA0yVOuHCMBa85PzXJ6zvMO+aDhS7fYY1mZF0cR2o+NrpDScq/iPfFAWjqLq7GtNzlQolmkTzCaS5MdQ8EpaztHHBzgrAzxzWe69WbfGi2VVrtsq4S7s13WYyVBBSNxTgnnnclQ49qqfW9xEu8ahiboluRGioGGm0pcnK3NcLUeVed2B/X5rWtbiIl20HLlrS1GEc5dcOEgCQ9nn5oC8dP63haw0jcbjBS9EejoUh1sq/c2rbkEKHkH3+9e6EVOmSH5UqXIcaaGxKVuEgqPn/AAfmq06OuojaKvv6guIblSm2ULSjdkhJJ9fQfmrr03BRb7Qw02sObh3CsDG4q5zj7Yqg9i8ncbdNS94NFj04+k6Utywms+GS8WO1XttDd3t8aYls5QH2grafpnxWF/TVikQWIL9ngORI+eywqOkobz5wMYFS1KvmcQ8rSun5kpcqVZYDz60BtTjkdKipIGADkewApJ0tYJUBiBIs0BcSOSWWTHTtbycnaMcZ+lTFKA0GbLa2ICIDNvjNxGzlLCGgEA++K3gAkAAYA8AV7SohJkmViD//2Q=="
        },
        loc: {
            latitude: 43.830409,
            longitude: 10.28766
        }
    };
    georep.db.postDoc(doc, testCallback);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;