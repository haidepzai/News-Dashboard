const express = require('express');
const expressHandleBars = require('express-handlebars');
const newsapi = require('newsapi-wrapper');
const fs = require('fs');
require('dotenv').config();

//Express
const server = express();

//Früher mit Body-Parser
//Um den Body vom Request zu bekommen
server.use(express.urlencoded({
    extended: false
})); 
server.use(express.json());

server.set('viewDir', 'views'); //Templates Verzeichnis

//Middleware
//Pfad in dem die statischen Dateien liegen
server.use(express.static('public')); 

//Engine (HandleBars)
//1. Parameter = Dateiendung
server.engine('html', expressHandleBars({
    extname: 'html',
    partialsDir: 'views/partials'
}));
server.set('view engine', 'html'); //2. Parameter bezieht sich auf oben

//Routes:
const renderHome = (req, res) => {
    let articles = [],
        message = '',
        settings = readSettings();

    newsapi
        .setApiKey(settings['news-api-key'] || process.env.NEWS_API_KEY || '')
        .setCategory(settings['news-api-category'] || 'business') //default category: business
        .send()
        .then(response => {
            articles = response.articles;
        })
        .catch(err => {
            message = 'Error when retrieving articles from NewsAPI';
        })
        .then(() => {
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

const readSettings = () => {
    try {
        return JSON.parse(fs.readFileSync('settings.json'));
    } catch {
        return {};
    }
}

const renderSettings = (req, res) => {
    //3. Liest die settings.json
    const settings = readSettings();

    res.render('settings',  {
        title: 'Settings',
        heading: 'Settings',
        settingsActive: true,
        newsApiKey: settings['news-api-key'] || '', //Feld News API Key
        newsApiCategories: newsapi.getCategories().map(categoryName =>{
            return {
                value: categoryName,
                label: categoryName,
                selected: categoryName === settings['news-api-category']
            }
        }),
    })
    //getCategories gibt ein String von den Kategorien zurück
    //-> Mappen auf ein Object
};

const receiveSettings = (req, res) => {
    console.log(req.body);
    //Sync um sicher zu gehen, dass Datei geschrieben wird, wenn receiveSettings abgearbeitet ist
    fs.writeFileSync('settings.json', JSON.stringify(req.body)); //2. Erstellt eine settings.json mit req.body

    //Client bekommt das zurück, was er abgeschickt hat
    //request wird an die responst drangehängt
    //req.pipe(res); 

    renderSettings(req, res);
}

server.get('/', renderHome);
server.get('/home', renderHome);

server.get('/admin', renderSettings);
server.get('/settings', renderSettings);
server.post('/settings', receiveSettings); //1. Wenn man das Formular abschickt


server.listen(process.env.PORT, () => {
    console.log('Server listening at port ' + process.env.PORT);
});