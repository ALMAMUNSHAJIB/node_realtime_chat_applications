const router = require('express').Router();
const {getUserController, addUser, userRemove} = require('../controller/userController');

const htmlResponse = require('../middlewares/common/htmlResponse');
const {avatarUploade} = require('../middlewares/users/avatarUploade');
const {addUserValidator, addUserValidatorHandler} = require('../middlewares/users/userValidator');

const {checkLogin} = require("../middlewares/common/checkLogin");


router.get('/', htmlResponse("User"), checkLogin ,getUserController);

//add user
router.post('/',checkLogin, avatarUploade, addUserValidator, addUserValidatorHandler, addUser);

//remove user
router.delete('/:id', userRemove);


module.exports = router;