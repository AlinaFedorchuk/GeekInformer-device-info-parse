var express = require('express');
var request = require('request');
var cheerio = require("cheerio");
var app = express();

app.get('/', function (req, res) {
	request('http://www.gsmarena.com/lenovo_vibe_x3_c78-7756.php ', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	
		var $ = cheerio.load(body);
		var description = $("div .main-review").html();
		
		/*function Translate(){
			var text = $("div .main-review").text();
			var pattern = /network/ig;
			var NewText = text.replace (pattern, function replacer(match){
				return match.toUpperCase();
			});
			return NewText;
		}*/
		
			res.send(description); 
			 
		
	  }
	  else {
		res.send("We’ve encountered an error: " + error);
	}

}) 
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://127.0.0.1', host, port);

});