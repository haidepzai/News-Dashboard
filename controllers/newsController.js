const newsService = require('../services/newsService');

//Controller:
const renderHome = (req, res) => {
    let articles = [];
    let message = ''; 
    let description = [];     
    let urlToImage = [];

        newsService.getNews().then(response => {
            articles = response.articles;
            description = response.description;
            urlToImage = response.urlToImage;
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
                description,
                message
            });
        });

    //render home.html; 2. Parameter data für die Template Engine
    
};

module.exports = {
    renderHome
}