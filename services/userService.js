const bcrypt = require('bcrypt');
const ADMIN_HASH = '$2b$10$HQkP6A/vzef5x0j6snYjL.0ZoFtKd9Y3bx1eP655nJtKiIJANjgUe';

//@Todo:
//Adding more users -> Create a User Database in SQL?
//Currently just one user... Admin
//return: Promise
const verifyLogin = (username, password) => {
    if (username !== 'admin') {
        return Promise.resolve(false);
    }
    return bcrypt.compare(password, ADMIN_HASH); //password: true/false
};

module.exports = {
    verifyLogin
};