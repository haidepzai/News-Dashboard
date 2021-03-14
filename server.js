const express = require('express');
const expressHandleBars = require('express-handlebars');
const routing = require('./routes');
const session = require('express-session');
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

//Middlewares
//Pfad in dem die statischen Dateien liegen
server.use(express.static(__dirname + '/public')); 
//Session
server.use(session({
    secret: process.env.SESSION_SECRET || 'Please_SET_session_SeCreT',
    resave: false,
    saveUninitialized: true
}));
server.use((req, res, next) => {
    //response.locals => Inhalt steht automatisch in allen Templates zur Verfügung
    res.locals.isLoggedIn = req.session && req.session.isLoggedIn; //Global
    console.log("Is loggedIn: " + res.locals.isLoggedIn);
    next();
});

//Engine (HandleBars)
//1. Parameter = Dateiendung
server.engine('html', expressHandleBars({
    extname: 'html',
    partialsDir: 'views/partials'
}));
server.set('view engine', 'html'); //2. Parameter bezieht sich auf oben

server.use('/', routing);

server.listen(process.env.PORT, () => {
    console.log('Server listening at port ' + process.env.PORT);
});