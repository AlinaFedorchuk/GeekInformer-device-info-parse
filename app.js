var PORT = 3000; //Заглавными буквами обычно обьявляют константы

var express = require('express');
var request = require('request');
var cheerio = require("cheerio");
//тут подключаеш модуль dictionary (как из переменной сделать модуль написано в dictionary.js)

var app = express();

app.get('/', function (req, res) {
	request('http://www.gsmarena.com/lenovo_vibe_x3_c78-7756.php ', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	
		var $ = cheerio.load(body);
		var description = $("div .main-review").html();
		  //также на этом этапе удалить блок с отзывами USER OPINIONS AND REVIEWS и лишние кнопки и элементы
		function Translate(html){
			/*тут уже надо пройтись циклом по словарю, как это сделать?
			1) создаеш из обьекта массив с ключами (они же и  паттерны). Делается с помощью Object.getOwnPropertyNames(dictionary)
			2) по это массиву проходишся циклом (массив.forEach(function (pattern) {
				а тут уже код хоторый ниже
			}))
			 */

			var pattern = /network/ig;
			return html.replace (pattern, function (match){
				console.log(match)
				return 'сеть';
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