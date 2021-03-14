const userService = require('../services/userService');

const renderLogin = (req, res) => {
    res.render('login', {
        heading: 'Login',
        loginActive: true,
        loginFailed: req.body.loginFailed,
        username: req.body.username
    });
}

const submitLogin = (req, res) => {
    console.log(req.body);
    userService.verifyLogin(req.body.username, req.body.password)
        .then(loginSuccess => {
            console.log(loginSuccess)
            if (loginSuccess) {
                req.session.isLoggedIn = true; //Login Session auf True setzen
                res.redirect('/settings'); //Redirect to Settings
            } else {
                req.body.loginFailed = true;
                renderLogin(req, res);
            }
        });
}

const logout = (req, res) => {
    if (req.session) {
        delete req.session.isLoggedIn;
    }
    res.redirect('/home');    
};

module.exports = {
    renderLogin,
    submitLogin,
    logout
}