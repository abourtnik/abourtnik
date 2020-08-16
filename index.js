const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
const moment = require('moment')
const axios = require('axios');


(async function (){

    let DATA = {
        refresh_date: moment().format("dddd, DD MMMM [at] HH:mm:ss"),
        projects : []
    };

    let response = await axios.get('http://api.antonbourtnik.fr');
    DATA.projects = response.data.projects;

    // Generate Readme with data

    await fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
    });

}());