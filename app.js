var PORT = 3000; 

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var dictionary = require('./dictionary');

var app = express();

app.get('/', function (req, res) {
	request('http://www.gsmarena.com/lenovo_vibe_x3_c78-7756.php ', function (error, response, body) {
	  if (!error && response.statusCode == 200) {

		var $ = cheerio.load(body);
		var description = $("div .main-review").html();
		  //также на этом этапе удалить блок с отзывами USER OPINIONS AND REVIEWS и лишние кнопки и элементы
		
		function Translate(html){
			Object.getOwnPropertyNames(dictionary).forEach(function (pattern) {
				return html.replace (pattern, function (match){
					return dictionary[pattern];		
				});
			});		
		}

		description = Translate(description);

		res.type('text/html').send(description);
		
	  }
	  else {
		res.status(404).send("We’ve encountered an error: " + error); //  status 404 чтобы браузер понял что ошибка
	}

})
});

app.listen(PORT, function () {
  console.log('Launched at port ' + PORT);
});