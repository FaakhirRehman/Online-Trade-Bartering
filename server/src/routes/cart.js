const express = require('express');
const { requireSignIn, userMiddleWare } = require('../commons');
const { addItemToCart, getCartItems } = require('../controllers/cart');
const router = express.Router();

router.post("/user/cart/addtocart", requireSignIn, userMiddleWare, addItemToCart);
router.post("/user/getCartItems", requireSignIn, userMiddleWare, getCartItems);

module.exports = router;