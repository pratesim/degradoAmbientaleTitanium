exports.getDbInfo = function() {
    var url = "http://pram.homepc.it:5984/testdb";
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            Ti.API.info("Received text: " + this.responseText);
            alert("success");
        },
        onerror: function(e) {
            Ti.API.debug(e.error);
            alert("error");
        },
        timeout: 5e3
    });
    client.open("GET", url);
    client.send();
};