const router = require('express').Router();
const {getInboxController} = require('../controller/inboxController');
const htmlResponse = require('../middlewares/common/htmlResponse');
const {checkLogin} = require("../middlewares/common/checkLogin");



router.get('/', htmlResponse("Inbox"), checkLogin, getInboxController);


module.exports = router;