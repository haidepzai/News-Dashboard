const newsService = require('../services/newsService');

//Controller:
const renderHome = (req, res) => {
    let articles = [],
        message = '';      

        newsService.getNews().then(response => {
            articles = response.articles;
        })
        .catch(err => {
            message = 'Error when retrieving articles from NewsAPI';
        })
        .then(() => {
            //1. Parameter bezieht sich auf den Templatenamen im Views Verzeichnis
            res.render('home',  {
                title: 'News Page',
                heading: 'Welcome to your news dashboard',
                homeActive: true,
                articles,
                message
            });
        });

    //render home.html; 2. Parameter data für die Template Engine
    
};

module.exports = {
    renderHome
}