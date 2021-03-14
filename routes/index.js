const router = require('express').Router();

const newsController = require('../controllers/newsController');
const settingsController = require('../controllers/settingsController');

//Routes:
router.get('/', newsController.renderHome);
router.get('/home', newsController.renderHome);
router.get('/admin', settingsController.renderSettings);
router.get('/settings', settingsController.renderSettings);
router.post('/settings', settingsController.receiveSettings); //1. Wenn man das Formular abschickt

module.exports = router;