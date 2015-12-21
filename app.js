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

			//Remove unnecessary blocks
			$('.social-share').remove();
			$('.specs-spotlight-features').remove();
			$('.article-info-meta').remove();
			$('#user-comments').remove();
			$('p.note').remove();
			$('style').remove();
			$('script').remove();

			//Add style to the table(specification)
			$('th').css('width', '80px');
			$('td.ttl').css('width', '100px');
			$('td.nfo').css('width', '300px');


			var description = $('div .main-review').html();

			// Translate all content
			function capitalizeFirstLetter(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			}
			function Translate(html){
				Object.getOwnPropertyNames(dictionary).forEach(function (word) {
					var pattern = new RegExp(word, 'gi')
					html = html.replace(pattern, function (match) {
						return capitalizeFirstLetter(dictionary[word]);
					});
				});
				return html;
			}

			description = Translate(description);

			res.type('text/html').send(description);

		}
		else {
			res.status(404).send('We’ve encountered an error: ' + error); //  status 404
		}

	})
});

app.listen(PORT, function () {
	console.log('Launched at port ' + PORT);
});