const cheerio = require("cheerio");
const fs = require("fs");
const axios = require("axios");

async function getMovieDates() {
    try {
        const response = await axios.get('https://yts.mx/browse-movies');
        const $ = cheerio.load(response.data);

        const Movies = [];

        $('.container section > .row > .browse-movie-wrap').each((i, el) => {
            const movie = { link: "", picture: "", rating: "", categories: [], synopsis: "" };

            movie.link = $(el).find('.browse-movie-wrap.col-xs-10 a:first').attr('href');
            movie.picture = $(el).find('.browse-movie-wrap.col-xs-10 img:first').attr('src');
            movie.rating = $(el).find('.browse-movie-wrap.col-xs-10 .rating').text();
            $(el).find('.browse-movie-wrap.col-xs-10  h4').slice(1).each((index, element) => {
                movie.categories.push($(element).text());
            });


            console.log(movie.link);
            console.log(movie.picture);
            console.log(movie.rating);
            console.log(movie.categories);

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
