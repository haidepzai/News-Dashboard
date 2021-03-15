const router = require('express').Router();

const newsController = require('../controllers/newsController');
const settingsController = require('../controllers/settingsController');
const loginController = require('../controllers/loginController');
const authMiddleware = require('../middleware/authMiddleware');

//Routes:
router.get('/', newsController.renderHome);
router.get('/home', newsController.renderHome);
router.get('/test', newsController.renderHome);

router.get('/admin', authMiddleware, settingsController.renderSettings);
router.get('/settings', authMiddleware, settingsController.renderSettings);
router.post('/settings', authMiddleware, settingsController.receiveSettings); //1. Wenn man das Formular abschickt
router.post('/setLanguage', settingsController.setLanguage);

router.get('/login', loginController.renderLogin);
router.post('/login', loginController.submitLogin);
router.get('/logout', loginController.logout);

module.exports = router;