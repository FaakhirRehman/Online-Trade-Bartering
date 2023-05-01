const express = require('express');
const { requireSignIn, userMiddleWare } = require('../commons');
const { addAddress, getAddress } = require('../controllers/address');
const router = express.Router();

router.post('/user/address/create', requireSignIn, userMiddleWare, addAddress);
router.post('/user/getaddress', requireSignIn, userMiddleWare, getAddress);

module.exports = router;