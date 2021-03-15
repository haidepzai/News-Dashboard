const newsapi = require('newsapi-wrapper');
const settingService = require('./settingsService');

const getNews = () => {
    return settingService.readSettings()
        //Äußeres Promise
        .then(settings => {
            return newsapi
                .setApiKey(settings['news-api-key'] || process.env.NEWS_API_KEY || '')
                .setCategory(settings['news-api-category'] || 'business') //default category: business
                .setCountry(settings['language'] || 'de')
                .send() //Inneres Promise
        }); //-> Am Ende wird der Wert nach außen transportiert: also die News

    //Synchrone Variante:
    let settings = settingService.readSettings();
    return newsapi
        .setApiKey(settings['news-api-key'] || process.env.NEWS_API_KEY || '')
        .setCategory(settings['news-api-category'] || 'business') //default category: business
        .send()
}

module.exports = {
    getNews
}