var constants = {
    designDocs: [ {
        name: "queries",
        handlers: [ {
            name: "_view",
            views: [ "allDocsByUser" ]
        }, {
            name: "_spatial",
            views: [ "allDocsByLoc" ]
        } ]
    } ]
};

var db = {
    admin: {
        base64: void 0,
        configured: false
    },
    configured: false,
    name: void 0,
    host: void 0,
    port: void 0,
    proto: void 0,
    isConfigured: function() {
        if (this.configured) return true;
        this.configured = true == this.admin.configured && void 0 != this.name && void 0 != this.host && void 0 != this.port && void 0 != this.proto;
        return this.configured;
    },
    setAdmin: function(name, passwd) {
        if (2 != arguments.length) throw "setAdmin() richiede esattamente 2 argomenti: name (string), passwd (string).";
        if (!name || !passwd || "string" != typeof name || "string" != typeof passwd) throw "Impossibile settare l'amministratore, parametri non validi.";
        db.admin.base64 = Ti.Utils.base64encode(name + ":" + passwd).text;
        db.admin.configured = true;
        db.isConfigured();
    },
    setDBName: function(DBName) {
        if (1 != arguments.length) throw "setDBName() richiede un argomento: DBName (string).";
        if (!DBName || "string" != typeof DBName) throw "Impossibile settare il nome del database, parametro non valido.";
        db.name = DBName;
        db.isConfigured();
    },
    setURLServer: function(URLServer) {
        if (1 != arguments.length) throw "setURLServer() richiede un argomento: URLServer (object).";
        if ("object" != typeof URLServer) throw 'Impossibile settare "URLServer", parametro non valido.';
        if (!URLServer.proto || "string" != typeof URLServer.proto || !URLServer.host || "string" != typeof URLServer.host || !URLServer.port || "number" != typeof URLServer.port || 1 > URLServer.port || URLServer.port > 65535) throw 'Impossibile settare "URLServer", uno o piu\' properties non valide.';
        db.proto = URLServer.proto;
        db.host = URLServer.host;
        db.port = URLServer.port;
        db.isConfigured();
    },
    getDoc: function(docId, attachments, callback) {
        if (2 > arguments.length) throw "getDoc() richiede almeno 2 argomenti: docId (string), attachment (boolean).";
        if (!docId || "string" != typeof docId || "boolean" != typeof attachments) throw "Uno o piu' parametri non validi.";
        var attach = attachments ? "?attachments=true" : "?attachments=false";
        var url = db.proto + db.host + ":" + db.port + "/" + db.name + "/" + docId + attach;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                callback && callback(void 0, this.responseText);
            },
            onerror: function(e) {
                callback && callback(e, void 0);
            }
        });
        client.open("GET", url);
        client.setRequestHeader("Authorization", "Basic " + user.doc.base64);
        client.setRequestHeader("Accept", "application/json");
        client.send();
    },
    getDocsInBox: function(bl_corner, tr_corner, callback) {
        var viewPath = constants.designDocs[0].name + "/" + constants.designDocs[0].handlers[1].name + "/" + constants.designDocs[0].handlers[1].views[0];
        var queryOpts = "?bbox=" + bl_corner.lng + "," + bl_corner.lat + "," + tr_corner.lng + "," + tr_corner.lat;
        if (2 > arguments.length) throw "getDocsInBox() richiede due argomenti: bl_corner (object), tr_corner (object).";
        if ("object" != typeof bl_corner || "object" != typeof tr_corner) throw "Uno o piu' parametri non validi: devono essere 'object'.";
        if (!bl_corner.lng || "number" != typeof bl_corner.lng || -180 > bl_corner.lng || bl_corner.lng > 180 || !bl_corner.lat || "number" != typeof bl_corner.lat || -90 > bl_corner.lat || bl_corner.lat > 90) throw "Parametro non valido: bl_corner.";
        if (!tr_corner.lng || "number" != typeof tr_corner.lng || -180 > tr_corner.lng || tr_corner.lng > 180 || !tr_corner.lat || "number" != typeof tr_corner.lat || -90 > tr_corner.lat || tr_corner.lat > 90) throw "Parametro non valido: tr_corner.";
        if (arguments.length > 2 && (!callback || "function" != typeof callback)) throw "Parametro opzionale non valido: callback.";
        if (!db.isConfigured()) throw "Impossibile contattare il database: db non cofigurato";
        if (!user.isConfigured()) throw "Impossibile inviare la richiesta al server da un utente non configurato.";
        var url = db.proto + db.host + ":" + db.port + "/" + db.name + "/_design/" + viewPath + queryOpts;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                callback && callback(void 0, this.responseText);
            },
            onerror: function(e) {
                callback && callback(e, void 0);
            }
        });
        client.open("GET", url);
        client.setRequestHeader("Authorization", "Basic " + user.doc.base64);
        client.setRequestHeader("Accept", "application/json");
        client.send();
    },
    getUserDocs: function(userId, callback) {
        var viewPath = constants.designDocs[0].name + "/" + constants.designDocs[0].handlers[0].name + "/" + constants.designDocs[0].handlers[0].views[0];
        var queryOpts = '?key="' + userId + '"';
        if (1 > arguments.length) throw "getUserDocs() richiede almeno un argomento: userId (string).";
        if (!userId || "string" != typeof userId) throw "parametro non valido: userId deve essere una stringa non vuota.";
        if (arguments.length > 1 && "function" != typeof callback) throw "parametro opzionale non valido: callback deve essere una funzione.";
        if (!db.isConfigured()) throw "Impossibile contattare il database: db non cofigurato";
        if (!user.isConfigured()) throw "Impossibile inviare la richiesta al server da un utente non configurato.";
        var url = db.proto + db.host + ":" + db.port + "/" + db.name + "/_design/" + viewPath + queryOpts;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                callback && callback(void 0, this.responseText);
            },
            onerror: function(e) {
                callback && callback(e, void 0);
            }
        });
        client.open("GET", url);
        client.setRequestHeader("Authorization", "Basic " + user.doc.base64);
        client.setRequestHeader("Accept", "application/json");
        client.send();
    },
    postDoc: function(doc, callback) {
        if (1 > arguments.length) throw "postDoc() richiede almeno 1 argomento: doc (object).";
        if ("object" != typeof doc || !doc.title || "string" != typeof doc.title || !doc.msg || "string" != typeof doc.msg || !doc.img || "object" != typeof doc.img || !doc.img.content_type || "string" != typeof doc.img.content_type || !doc.img.data || "string" != typeof doc.img.data || !doc.loc || "object" != typeof doc.loc || !doc.loc.latitude || "number" != typeof doc.loc.latitude || doc.loc.latitude > 90 || -90 > doc.loc.latitude || !doc.loc.longitude || "number" != typeof doc.loc.longitude || doc.loc.longitude > 180 || -180 > doc.loc.longitude) throw 'Parametro "doc" non valido.';
        var newDoc = {};
        newDoc.userId = user.doc._id;
        newDoc.title = doc.title;
        newDoc.msg = doc.msg;
        newDoc.loc = doc.loc;
        newDoc._attachments = {
            img: doc.img
        };
        var url = db.proto + db.host + ":" + db.port + "/" + db.name;
        var client = Ti.Network.createHTTPClient({
            onload: function(data) {
                callback && callback(void 0, data);
            },
            error: function(e) {
                callback && callback(e, void 0);
            }
        });
        client.open("POST", url);
        client.setRequestHeader("Authorization", "Basic " + user.doc.base64);
        client.setRequestHeader("Content-Type", "application/json");
        client.send(JSON.stringify(newDoc));
    }
};

exports.db = {
    isConfigured: db.isConfigured,
    setAdmin: db.setAdmin,
    setDBName: db.setDBName,
    setURLServer: db.setURLServer,
    getDoc: db.getDoc,
    getDocsInBox: db.getDocsInBox,
    getUserDocs: db.getUserDocs,
    postDoc: db.postDoc
};

var user = {
    doc: {
        _id: void 0,
        base64: void 0,
        configured: false,
        mail: void 0,
        name: void 0,
        nick: void 0,
        password: void 0,
        roles: [],
        type: "user"
    },
    check: function(callback) {
        if (1 != arguments.length || "function" != typeof callback) throw "checkUser() richiede un argomento: callback (function(err, data)).";
        if (!this.isConfigured()) throw "Impossibile controllare se l'utente e' registrato: utente non configurato.";
        if (!db.isConfigured()) throw "Impossibole controllare se l'utente e' registrato: server non configurato.";
        var url = db.proto + db.host + ":" + db.port;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                callback(void 0, {
                    isRegistered: true
                });
            },
            onerror: function(e) {
                "401" == e.error ? callback(void 0, {
                    isRegistered: false
                }) : callback(e, void 0);
            }
        });
        client.open("GET", url);
        client.setRequestHeader("Authorization", "Basic " + user.doc.base64);
        client.send();
    },
    getRemote: function(callback) {
        if (1 != arguments.length) throw "getRemote() richiede un argomento: callback (function(err, data)).";
        if ("function" != typeof callback) throw "Parametro non valido: callback deve essere 'function'.";
        var url = db.proto + db.host + ":" + db.port + "/_users/" + user.doc._id;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                callback(void 0, this.responseText);
            },
            onerror: function(e) {
                callback(e, void 0);
            }
        });
        client.open("GET", url);
        client.setRequestHeader("Authorization", "Basic " + user.doc.base64);
        client.setRequestHeader("Accept", "application/json");
        client.send();
    },
    isConfigured: function() {
        if (this.doc.configured) return true;
        this.doc.configured = void 0 != this.doc._id && void 0 != this.doc.base64 && void 0 != this.doc.mail && void 0 != this.doc.name && void 0 != this.doc.nick && void 0 != this.doc.password && void 0 != this.doc.roles && void 0 != this.doc.type;
        return this.doc.configured;
    },
    set: function(user) {
        if (1 != arguments.length) throw "setUser() richiede un argomento: user (object).";
        if ("object" != typeof user) throw 'Impossibile settare "user", parametro non valido.';
        if (!(user.name && "string" == typeof user.name && user.password && "string" == typeof user.password && user.nick && "string" == typeof user.nick && user.mail && "string" == typeof user.mail)) throw 'Impossibile settare "user", uno o piu\' properties non valide.';
        this.doc._id = "org.couchdb.user:" + user.name;
        this.doc.name = user.name;
        this.doc.password = user.password;
        this.doc.base64 = Ti.Utils.base64encode(user.name + ":" + user.password).text;
        this.doc.nick = user.nick;
        this.doc.mail = user.mail;
        this.doc.type = "user";
        this.doc.roles = [];
        this.isConfigured();
    },
    signup: function() {},
    update: function(user, callback) {
        if (1 > arguments.length) throw "update() richiede un argomento: user (object).";
        if ("object" != typeof user.doc) throw "Impossibile aggiornare l'utente, parametro non valido.";
        if (!(user.name && "string" == typeof user.name && user.password && "string" == typeof user.password && user.nick && "string" == typeof user.nick && user.mail && "string" == typeof user.mail)) throw 'Impossibile settare "user", uno o piu\' properties non valide.';
        if (arguments.length > 1 && "function" != typeof callback) throw "Il parametro opzionale deve essere una funzione";
        if (!user.isConfigured()) throw "Utente corrente non configurato.";
        if (!db.isConfigured()) throw "Impossibile contattare il database: server non configurato.";
    }
};

exports.user = {
    check: user.check,
    getRemote: user.getRemote,
    isConfigured: user.isConfigured,
    set: user.set,
    signup: user.signup,
    update: user.update,
    doc: user.doc
};