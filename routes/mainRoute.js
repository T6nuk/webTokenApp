const {Router} = require('express');
const {requireToken} = require('../middlewares/auth');
const mainController = require('../controllers/mainController');
const router = Router();


router.post('/register', mainController.postRegister);
router.post('/login', mainController.postLogin);
router.get('/login', mainController.getLogin);


router.get('/', requireToken, mainController.getMainPage);



module.exports = router;