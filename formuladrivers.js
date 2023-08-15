// Importing the NPM packages that we installed
const cheerio = require("cheerio");
const fs = require("fs");

// Function starts here
async function getFormulaOneDrivers() {
    try {
        // Fetch data from URL and store the response into a const
        const response = await fetch('https://www.formula1.com/en/drivers.html');
        // Convert the response into text
        const body = await response.text();

        // Load body data
        const $ = cheerio.load(body);
        const Drivers = [];
        // Selecting Each col-12 class name and iterate through the list
        $('.listing-items--wrapper > .row > .col-12').map((i, el) => {
            const driver = { name: "", rank: "", points: "", team: "", photo: "", };

            fname = $(el).find('.listing-item--name span:first').text();
            sname = $(el).find('.listing-item--name span:last').text();

            driver.name = fname + " " + sname;
            driver.rank = $(el).find('.rank').text();
            driver.points = $(el).find('.points > .f1-wide--s').text();
            driver.team = $(el).find('.listing-item--team').text();
            driver.photo = $(el).find('.listing-item--photo img').attr('data-src');

            Drivers.push(driver);
        });
        console.log(Drivers);
        fs.writeFile("formuladrivers.json", JSON.stringify(Drivers), (err) => {
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

// Run getFormulaOneDrivers
getFormulaOneDrivers();