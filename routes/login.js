const router = require('express').Router();
const {getloginController, login, logout} = require('../controller/loginController');
const htmlResponse = require('../middlewares/common/htmlResponse');
const {doLoginCheck, doLoginValidatorHandler} =  require('../middlewares/login/loginValidator');
const {redirectLoggedIn} =  require('../middlewares/common/checkLogin');
const page_title = "Login"

router.get('/', htmlResponse(page_title), redirectLoggedIn,  getloginController);

router.post('/',htmlResponse(page_title), doLoginCheck, doLoginValidatorHandler ,login);

router.delete('/', logout);

module.exports = router;