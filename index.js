const mustache = require('mustache');
const fs = require('fs');
const moment = require('moment')
const axios = require('axios');

(async function (){

    let data = {
        refresh_date: moment().format("dddd, DD MMMM [at] HH:mm:ss"),
        projects : []
    };

    try {
        // Get data
        const response = await axios.get('https://api.antonbourtnik.fr');
        data.projects = response.data.projects;

        // Generate Readme with data
        const template = await fs.readFileSync('./main.mustache');
        const output = mustache.render(template.toString(), data);
        fs.writeFileSync('README.md', output);
    }
    catch (error) {
        console.error(error.message)
        return;
    }
}());