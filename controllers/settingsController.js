const newsapi = require('newsapi-wrapper');
const settingService = require('../services/settingsService');

const renderSettings = (req, res) => {
    //3. Liest die settings.json
    settingService.readSettings()
        .then(settings => {
            res.render('settings',  {
                title: 'Settings',
                heading: 'Settings',
                settingsActive: true,
                newsApiKey: settings['news-api-key'] || '', //Feld News API Key
                newsApiCategories: newsapi.getCategories().map(categoryName =>{
                    return {
                        value: categoryName,
                        label: categoryName,
                        selected: categoryName === settings['news-api-category'],
                    }
                }),
            })
            //getCategories gibt ein String von den Kategorien zurück
            //-> Mappen auf ein Object
        });    
};

const receiveSettings = (req, res) => {
    //req.body um den body des Requests zu erhalten
    //req.body geht nur mit Middleware body-parser    
    console.log(req.body); 
    settingService.writeSettings(req.body);
    //Client bekommt das zurück, was er abgeschickt hat
    //request wird an die responst drangehängt
    //req.pipe(res); 

    renderSettings(req, res);
}

module.exports = {
    renderSettings,
    receiveSettings
}