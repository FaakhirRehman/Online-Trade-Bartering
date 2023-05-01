const express = require('express');
const router = express.Router();
const Stripe = require("stripe");
const env = require('dotenv');

env.config();

const stripe = Stripe(process.env.STRIPE_KEY);

router.post('/create-checkout-session', async (req, res) => {
    //console.log(req.body);
    const cartData = req.body.cartItems;
    console.log(cartData.cartItems);
    const line_items = Object.values(cartData.cartItems).map((item) => {
        return {
            price_data: {
                currency: "pkr",
                product_data: {
                    name: item.name,
                    images: [item.img],
                    metadata: {
                        id: item._id,
                    },
                },
                unit_amount: item.price,
            },
            quantity: item.qty,
        };
    });

    //console.log(JSON.stringify(line_items, null, 2))

    const session = await stripe.checkout.sessions.create({
        line_items,
        payment_method_types: ["card"],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    console.log(session.url);

    res.status(200).json({
        URL: session.url
    });
});

module.exports = router;