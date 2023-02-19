const Cart = require('../models/cart');

exports.addItemToCart = (req, res) => {
    
    Cart.findOne({ user: req.user._id })
    .exec((error, cart) => {
        if(error) {
            return res.status(400).json({
                error: error
            })
        }

        if(cart){

            const product = req.body.cartItems.product;
            const item = cart.cartItems.find(c => c.product == product);
            let condition, action;
            
            if(item) {

                condition = {
                    user: req.user._id,
                    "cartItems.product": product
                };

                update = {
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                };

                

            } else {

                condition = {
                    user: req.user._id
                };

                update = {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                };

            }

            Cart.findOneAndUpdate(condition, update)
            .exec((error, _cart) => {
                if(error) {
                    return res.status(400).json({
                        error: error
                    })
                }

                if(_cart) {
                    res.status(200).json({
                        _cart
                    })
                }
            })

            
        } else {
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });
        
            cart.save((error, cart) => {
                if(error) {
                    return res.status(400).json({
                        error: error
                    })
                }
        
                if(cart) {
                    res.status(200).json({
                        cart
                    })
                }
            })
        }
    }) 

    

}