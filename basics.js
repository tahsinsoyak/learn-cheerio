const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");



const markup = `
<ul class="fruits">
  <li class="fruits__mango"> Mango </li>
  <li class="fruits__apple"> Apple </li>
</ul>
`;

//cherioya yüklüyoruz
const $ = cheerio.load(markup);
console.log(pretty($.html()));


//item arama
const mango = $(".fruits__mango");
console.log(mango.html()); // Mango


//özelliğini arama
const apple = $(".fruits__apple");
console.log(apple.attr("class")); //fruits__apple


//döngüde arama
const listItems = $("li");
console.log(listItems.length); // 2
listItems.each(function (idx, el) {
  console.log($(el).text());
});


//yeni öğe ekleme
const ul = $("ul");
ul.append("<li>Banana</li>");
ul.prepend("<li>Pineapple</li>");
console.log(pretty($.html()));