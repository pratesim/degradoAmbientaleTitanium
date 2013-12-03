/** Libreria per interagire con un server couchdb esteso con geocouch **/

/**
 * sezione relativa a costanti utilizzate nel resto del codice
 */
var constants = {
	/* vettore contenente l'elenco dei designDoc usati */
	designDocs: [
		{
			name: 'queries', /* nome di questo design document */
			handlers: [ /* vettore dei gestori delle diverse views */
				{
					name: '_view', /* gestore delle views map-reduce */
					views: ['allDocsByUser'] /* elenco delle views gestite da questo gestore */
				},
				{
					name: '_spatial', /* gestore delle views spaziali di geocouch */
					views: ['allDocsByLoc'] /* elenco delle views spaziali */
				}
			]
		}
	]
};





/**
 * sezione relativa al database remoto
 */
var db = {
	/* sezione relativa al database remoto */
	admin: {
		base64: undefined, /* credenziali dell'amministratore utilizzate per il login sul DB codificate in 'base64' */
		configured: false  /* indica se l'amministratore e' stato configurato */
	},
	configured: false, /* indica se DB e' stato configurato */
	name: undefined, /* nome del db */
	host: undefined, /* IP o Hostname della macchin */
	port: undefined, /* porta sulla quale il server e' in ascolto */
	proto: undefined, /* protocollo di comunicazione (http://, https://, ecc...) */
	/**
	 * controlla se tutte le properties del DB sono state configurate e ritorna
	 * tale risultato.
	 */
	isConfigured: function(){
		if (this.configured)
			return true;
		else {
			this.configured = (
				this.admin.configured == true &&
				this.name  !=  undefined && this.host  != undefined &&
				this.port  !=  undefined && this.proto != undefined
			);
			return this.configured;
		}
	},
	/**
	 * Setta l'utente amministratore del server.
	 *
	 * name ( string ):
	 * passwd: ( string ):
	 */
	setAdmin: function(name, passwd){
		if (arguments.length != 2) {
			throw 'setAdmin() richiede esattamente 2 argomenti: name (string), passwd (string).';
		} else if (!name || !passwd || typeof name != 'string' || typeof passwd != 'string') {
			throw 'Impossibile settare l\'amministratore, parametri non validi.';
		} else {
			db.admin.base64 = Ti.Utils.base64encode(name+':'+passwd).text;
			db.admin.configured = true;
			db.isConfigured();
		}
	},
	/**
	 * Setta il nome del database all'interno del server.
	 *
	 * DBName ( string ):
	 */
	setDBName: function(DBName){
		if (arguments.length != 1) {
			throw 'setDBName() richiede un argomento: DBName (string).';
		} else if (!DBName || typeof DBName != 'string' ) {
			throw 'Impossibile settare il nome del database, parametro non valido.';
		} else {
			db.name = DBName;
			db.isConfigured();
		}
	},
	/**
	 * Configura lo URL del server CouchDB (geocouch)
	 *
	 * URLServer ( object ):
	 *     {
	 *         proto: "http://",
	 *         host:  "127.0.0.1",
	 *         port:  5984
	 *     }
	 */
	setURLServer: function(URLServer){
		if (arguments.length != 1){
			throw 'setURLServer() richiede un argomento: URLServer (object).';
		} else if (typeof URLServer != 'object'){
			throw 'Impossibile settare "URLServer", parametro non valido.';
		} else if (
		!URLServer.proto || typeof URLServer.proto != 'string' ||
		!URLServer.host  || typeof URLServer.host  != 'string' ||
		!URLServer.port  || typeof URLServer.port  != 'number' ||
		URLServer.port < 1 || URLServer.port > 65535){
			throw 'Impossibile settare "URLServer", uno o piu\' properties non valide.';
		} else {
			db.proto = URLServer.proto;
			db.host = URLServer.host;
			db.port = URLServer.port;
			db.isConfigured();
		}
	},
	/**
	 * Recupera un doc dal database tramite il relativo ID
	 * 
	 * docId: (string) "l'ID del documento",
	 * attachments: (boolean)
	 *     true  - recupera il documento completo di allegato;
	 *     false - recupera il semplice documento senza allegato.
	 * callback ( function(err, data) ):
	 *     funzione di callback chiamata sia in caso di errore che di successo;
	 *        err:  oggetto che descrive l'errore, se si e' verificato;
	 *        data: oggetto che mostra le opzioni settate se non si sono verificati errori.
	 */ 
	getDoc: function(docId, attachments, callback){
		if( arguments.length < 2 )
				throw 'getDoc() richiede almeno 2 argomenti: docId (string), attachment (boolean).';
			else if (!docId || typeof docId != 'string' || typeof attachments != 'boolean')
				throw 'Uno o piu\' parametri non validi.';
			else {
				var attach = (attachments)?'?attachments=true':'?attachments=false';
				var url = db.proto +
						  db.host + ':' +
						  db.port + '/' +
						  db.name + '/' + docId +
						  attach;

				var client = Ti.Network.createHTTPClient({
					onload: function(data){
						Ti.API.info("Ricevuto: " + this.responseText);
						alert("Success");
						if(callback)
							// this.responseText contiene la risposta di tipo json
							callback(undefined,this.responseText);
					},
					onerror: function(e){
						Ti.API.debug(e.error);
						alert("error");
						if(callback)
							callback(e,undefined);
					}
				});
				
				client.open("GET", url);
				Ti.API.debug("user in getDoc");
				Ti.API.debug(user);
				Ti.API.debug("----------------");
				client.setRequestHeader("Authorization", "Basic " + user.doc.base64);
				/* mi assicura che la risposta arrivi con l'allegato in base64
				           invece che in binario in un oggetto MIME a contenuti multipli
				*/ 
				client.setRequestHeader("Accept", "application/json");
				
				client.send();
			}
	},
	/**
	 * Chiede al DB tutti i documenti che sono posizionati in una certa area
	 * rettangolare.
	 *
	 * bl_corner (object): coordinate del vertice in basso a sinistra del
	 *     rettangolo.
	 * tr_corner (object): coordinate del vertice in alto a destra del
	 *     rettangolo.
	 * callback ( function(err, data) ): funzione chiamata al termine della
	 *     richiesta al server. In caso di errore, 'err' contiene un oggetto
	 *     che descrive l'errore altrimenti 'data' contiene il risultato
	 *     della query.
	 *
	 * entrambi i vertici sono oggetti del tipo:
	 *     {
	 *         lng: (number),
	 *         lat: (number)
	 *     }
	 */
	getDocsInBox: function(bl_corner, tr_corner, callback){
		// TODO
	},
	/**
	 * Chiede al DB tutti gli ID dei documenti creati da un utente.
	 *
	 * userId (string): identificatore unico di un utente.
	 * callback ( function(err, data) ): funzione chiamata al termine della
	 *     richiesta al server. In caso di errore, 'err' contiene un oggetto
	 *     che descrive l'errore altrimenti 'data' contiene il risultato
	 *     della query.
	 */
	getUserDocs: function(userId, callback){
		// TODO
	},
	/**
	 * Invia un nuovo documento sul database remoto
	 * 
	 * doc (object) :
	 *     {
	 *         title: (string) "titolo del documento",
	 *         msg: (string) "qualche dettaglio in piu'",
	 *         img: (object) {
	 *                           content_type: "image/...",
	 *                           data: "... data in base64 ..."
	 *                       }
	 *         loc: (object) {
	 *                           latitude:  (number) latitudine nord,
	 *                           longitude: (number) longitudine est
	 *                       }
	 *     }
	 * callback ( function(err, data) ):
	 *     funzione di callback chiamata sia in caso di errore che di successo;
	 *        err:  oggetto che descrive l'errore, se si e' verificato;
	 *        data: oggetto che mostra le opzioni settate se non si sono verificati errori.
	 */ 
	postDoc: function(doc,callback){
		// TODO
	}
};
/**
 * rendo pubbliche solo le funzioni relative al DB così si proteggono le configurazioni.
 */
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





/**
 * sezione relativa all'utente che utilizza il DB
 */
var user = {
	doc: {
		_id: undefined, /* identificatore unico associato all'utente */
		base64: undefined, /* credenziali dell'utente utilizzate per il login sul DB codificate in 'base64' */
		configured: false, /* indica se l'utente e' stato configurato */
		mail: undefined, /* indirizzo email dell'utente */
		name: undefined, /* username utilizzato dall'utente per l'autenticazione sul DB */
		nick: undefined, /* nickname arbitrariamente scelto dall'utente */
		password: undefined, /* password usata dall'utente per l'autenticazione sul DB */
		roles: [], /* ruoli dell'utente sul DB; deve essere [] */
		type: 'user', /* tipo dell'utente; deve essere 'user' */
	},
	/**
	 * Controlla se un utente è registrato sul server CouchDB (geocouch).
	 * 
	 * callback ( function(err, data) ):
	 * 		funzione di callback, NON OPZIONALE, chiamata sia in caso di errore che di successo;
	 *         err: oggetto che descrive l'errore, se si è verificato;
	 *        data: true se l'utente è già registrato, false se non lo è .
	 */
	check: function(callback){
		// TODO
	},
	/** 
	 * Recupera le informazioni d'utente dal server.
	 *
	 * callback ( function(err, data) ):
	 * 		funzione di callback, NON OPZIONALE, chiamata sia in caso di errore che di successo;
	 *         err: oggetto che descrive l'errore, se si è verificato;
	 *        data: (object) le info sull'utente
	 *              {
	 *                  _id:             (string)
	 *                  _rev:            (string)
	 *                  derived_key:     (string)
	 *                  iterations:      (number)
	 *                  mail:            (string)
	 *                  name:            (string)
	 *                  nick:            (string)
	 *                  password_scheme: (string)
	 *                  roles:           (array)
	 *                  salt:            (string)
	 *                  type:            (string)
	 *              }
	 */
	getRemote: function(callback){
		// TODO
	},
	/**
	 * controlla se tutte le properties dell'user sono state configurate e ritorna
	 * tale risultato.
	 */
	isConfigured: function(){
		if (this.doc.configured)
			return true;
		else {
			this.doc.configured = (
				this.doc._id != undefined  && this.doc.base64 != undefined &&
				this.doc.mail != undefined && this.doc.name != undefined &&
				this.doc.nick != undefined && this.doc.password != undefined &&
				this.doc.roles != undefined && this.doc.type != undefined
			);
			return this.doc.configured;
		}
	},
	/**
	 * Configura l'utente client.
	 * 
	 * user ( object ):
	 *     {
	 *         name:     (string) nome utilizzato per il login,
	 *         password: (string) password utlizzata per il login,
	 *         nick:     (string) nome arbitrario scelto dall'utente,
	 *         mail:     (string) indirizzo e-mail dell'utente
	 *     }
	 */ 
	set: function(user){
		if (arguments.length != 1){
			throw 'setUser() richiede un argomento: user (object).';
		} else if (typeof user != 'object') {
			throw 'Impossibile settare "user", parametro non valido.';
		} else if (
		!user.name      || typeof user.name      != 'string' ||
		!user.password  || typeof user.password  != 'string' ||
		!user.nick      || typeof user.nick      != 'string' ||
		!user.mail      || typeof user.mail      != 'string' ){
			throw 'Impossibile settare "user", uno o piu\' properties non valide.';
		} else {
			this.doc._id  = 'org.couchdb.user:'+user.name;
			this.doc.name = user.name;
			this.doc.password = user.password;
			this.doc.base64 = Ti.Utils.base64encode(user.name+':'+user.password).text;
			this.doc.nick = user.nick;
			this.doc.mail = user.mail;
			this.doc.type = 'user';
			this.doc.roles = [];
			this.isConfigured();
			Ti.API.debug("User settato: ");
			Ti.API.debug(user.doc);
			Ti.API.debug("----------------");
		}
	},
	/**
	 * Registra l'utente sul server CouchDB(questa funzione dovrà essere fatta poi dal server direttamente)
	 *
	 * callback ( function(err, data) ):
	 *     funzione di callback chiamata sia in caso di errore che di successo;
	 *        err:  oggetto che descrive l'errore, se si e' verificato;
	 *        data: oggetto che mostra il messaggio ricevuto se non si sono verificati errori.
	 */
	signup: function(callback){
		// TODO
	},
	/**
	 * Aggiorna l'utente corrente sia in locale che sul DB.
	 *
	 * user (object): deve essere un utente valido per 'user.set()'
	 * callback ( function(err, data) ):
	 *     funzione di callback chiamata sia in caso di errore che di successo;
	 *        err:  oggetto che descrive l'errore, se si e' verificato;
	 *        data: oggetto che mostra il messaggio ricevuto se non si sono verificati errori.
	 */
	update: function(user, callback){
		if (arguments.length < 1){
			throw 'update() richiede un argomento: user (object).';
		} else if (typeof user.doc != 'object') {
			throw 'Impossibile aggiornare l\'utente, parametro non valido.';
		} else if (
		!user.name      || typeof user.name      != 'string' ||
		!user.password  || typeof user.password  != 'string' ||
		!user.nick      || typeof user.nick      != 'string' ||
		!user.mail      || typeof user.mail      != 'string' ){
			throw 'Impossibile settare "user", uno o piu\' properties non valide.';
		} else if (arguments.length > 1 && typeof callback != 'function') {
				throw 'Il parametro opzionale deve essere una funzione';
		} else if (!user.isConfigured()) {
				throw 'Utente corrente non configurato.';
		} else if (!db.isConfigured()) {
				throw 'Impossibile contattare il database: server non configurato.';
		} else {
			//TODO
		}
		
	}
};
/**
 * rendo pubbliche solo le funzioni relative a USER
 */
exports.user = {
	check: user.check,
	getRemote: user.getRemote,
	isConfigured: user.isConfigured,
	set: user.set,
	signup: user.signup,
	update: user.update,
	doc: user.doc
};
