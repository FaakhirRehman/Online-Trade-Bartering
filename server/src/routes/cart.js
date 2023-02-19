const express = require('express');
const { requireSignIn, userMiddleWare } = require('../commons');
const { addItemToCart } = require('../controllers/cart');
const router = express.Router();

router.post('/user/cart', requireSignIn, userMiddleWare, addItemToCart);

module.exports = router;