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

$.tabGroup.open();
georep.db.getDoc("6eeccb20fb0aae3a637e2b359d0003af", false);
Ti.API.debug(georep.user.doc);

