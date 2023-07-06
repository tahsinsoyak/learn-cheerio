const cheerio = require("cheerio");
const fs = require("fs");
const axios = require("axios");

async function getMovieDates() {
    try {
        const response = await axios.get('https://www.beyazperde.com/filmler/vizyondakiler/yeni/');
        const $ = cheerio.load(response.data);

        const Movies = [];

        $('.gd-col-left > ul > .mdl').each((i, el) => {
            const movie = { name: "", date: "", director: "", actors: [], synopsis: "" };

            movie.name = $(el).find('.card > .meta > .meta-title > .meta-title-link').text();
            movie.date = $(el).find('.card > .meta >  .meta-body > .meta-body-info  > span:first').text();
            movie.director = $(el).find('.card > .meta >  .meta-body > .meta-body-direction  > a:first').text();
            $(el).find('.card > .meta > .meta-body > .meta-body-actor > a').each((index, element) => {
                movie.actors.push($(element).text());
            });
            movie.synopsis = $(el).find('.card > .synopsis > .content-txt').text();

            console.log(movie.name);
            console.log(movie.date);
            console.log(movie.director);
            console.log(movie.actors);
            console.log(movie.synopsis);

            Movies.push(movie);
        });

        console.log(Movies);

        fs.writeFile("beyazperde.json", JSON.stringify(Movies), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Successfully written data to file");
        });

    } catch (error) {
        console.log(error);
    }
}

getMovieDates();
