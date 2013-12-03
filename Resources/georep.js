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
                Ti.API.info("Ricevuto: " + this.responseText);
                alert("Success");
                callback && callback(void 0, this.responseText);
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                alert("error");
                callback && callback(e, void 0);
            }
        });
        client.open("GET", url);
        Ti.API.debug("user in getDoc");
        Ti.API.debug(user);
        Ti.API.debug("----------------");
        client.setRequestHeader("Authorization", "Basic " + user.doc.base64);
        client.setRequestHeader("Accept", "application/json");
        client.send();
    },
    getDocsInBox: function() {},
    getUserDocs: function() {},
    postDoc: function() {}
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
    check: function() {},
    getRemote: function() {},
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
        Ti.API.debug("User settato: ");
        Ti.API.debug(user.doc);
        Ti.API.debug("----------------");
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