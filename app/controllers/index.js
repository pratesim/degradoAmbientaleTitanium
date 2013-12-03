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

georep.user.check(testCallback);
georep.db.getDoc("6eeccb20fb0aae3a637e2b359d0003af", false, testCallback);
georep.db.getDocsInBox({lng: 10.244354, lat: 43.78324}, {lng: 10.424255, lat: 43.928314}, testCallback);
georep.db.getUserDocs("org.couchdb.user:99deba01000eee95", testCallback);
var doc = {
	title: "test Titanium",
	msg: "provo con Titanium a postare un doc",
	img: {
		content_type: "image/jpg",
		data: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKEAsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGi4lHyU4NTc3Nzc3ODc3Nzc3Nzc3Nzc3NzY3NDcrODg3NzQ3Nzc4Nys3Kys3MjE4LissNzQ4NP/AABEIADAAMAMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABQcDBAYB/8QAKxAAAQMDAwMDAwUAAAAAAAAAAQIDBAAFEQYSIQcTMUFRgWFxsRQiMlKR/8QAFwEBAAMAAAAAAAAAAAAAAAAAAAEEBf/EAB0RAAEEAgMAAAAAAAAAAAAAAAABAhEhQXEDBNH/2gAMAwEAAhEDEQA/ALxpSlAKUpQClKUBxWt+oUfS91hWiPbX7lcpad6GGlhACckDJPqSDxj0qJc6vQl6Zi3qFbu53ZC47rEiWlktLSkK4JB3AgiuZ6mLbhdatOTJqkNRA0yVOuHCMBa85PzXJ6zvMO+aDhS7fYY1mZF0cR2o+NrpDScq/iPfFAWjqLq7GtNzlQolmkTzCaS5MdQ8EpaztHHBzgrAzxzWe69WbfGi2VVrtsq4S7s13WYyVBBSNxTgnnnclQ49qqfW9xEu8ahiboluRGioGGm0pcnK3NcLUeVed2B/X5rWtbiIl20HLlrS1GEc5dcOEgCQ9nn5oC8dP63haw0jcbjBS9EejoUh1sq/c2rbkEKHkH3+9e6EVOmSH5UqXIcaaGxKVuEgqPn/AAfmq06OuojaKvv6guIblSm2ULSjdkhJJ9fQfmrr03BRb7Qw02sObh3CsDG4q5zj7Yqg9i8ncbdNS94NFj04+k6Utywms+GS8WO1XttDd3t8aYls5QH2grafpnxWF/TVikQWIL9ngORI+eywqOkobz5wMYFS1KvmcQ8rSun5kpcqVZYDz60BtTjkdKipIGADkewApJ0tYJUBiBIs0BcSOSWWTHTtbycnaMcZ+lTFKA0GbLa2ICIDNvjNxGzlLCGgEA++K3gAkAAYA8AV7SohJkmViD//2Q=="
	},
	loc: {
		latitude:  43.830409,
		longitude: 10.28766
	}
};
georep.db.postDoc(doc, testCallback);
