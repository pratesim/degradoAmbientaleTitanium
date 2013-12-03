var georep = require('georep');
/* imposto il server e l'utente'*/
georep.user.set({
		name: 'mau',
       	password: 'mau',
       	nick: 'morris',
       	mail: 'morris@mail.com'
});
georep.db.setAdmin('pratesim', 'cou111Viola<3');
georep.db.setDBName('testdb');
georep.db.setURLServer({
	proto: 'http://',
	host: 'pram.homepc.it',
	port: 5984
});
var testCallback = function (err, data){
		if (!err){
			Ti.API.info(data);
		}
		else {
			Ti.API.debug(err.error);
		}
};

$.tabGroup.open();

georep.db.getDoc("6eeccb20fb0aae3a637e2b359d0003af", false, testCallback);
georep.db.getDocsInBox({lng: 10.244354, lat: 43.78324}, {lng: 10.424255, lat: 43.928314}, testCallback);
georep.db.getUserDocs("org.couchdb.user:99deba01000eee95", testCallback);
