import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout/Index';
import Card from '../../components/UI/Card/Index';
import CartItem from './CartItem/Index';
import { addToCart } from '../../actions'
import './Style.css';

/**
* @author
* @function CartPage
**/

export const CartPage = (props) => {

    const cart = useSelector(state => state.cart);
    // const cartItems = cart.cartItems;
    const [cartItems, setCartItems] = useState(cart.cartItems);
    const dispatch = useDispatch();

    useEffect(() => {
        setCartItems(cart.cartItems);
    },[
        cart.cartItems
    ]);

    const onQuantityIncrement = (_id, qty) => {

        const { name, price, img } = cartItems[_id];
        dispatch(
            addToCart({
                _id, name, price, img
            }, +1)
        )
    }

    const onQuantityDecrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        dispatch(
            addToCart({
                _id, name, price, img
            }, -1)
        )
    }

    return (
        <Layout>
            <div className='cartContainer' style={{ alignItems: 'flex-start' }}>
                <Card
                    headerLeft={<div>My Cart</div>}
                    headerRight={<div>Deliver To</div>}
                >
                    {
                        Object.keys(cartItems).map((key, index) =>
                            <CartItem
                                key={index}
                                cartItem={cartItems[key]}
                                onQuantityInc={onQuantityIncrement}
                                onQuantityDec={onQuantityDecrement}
                            />
                        )
                    }

                </Card>

                <Card
                    headerLeft='Price'
                    style={{
                        width: '500px'
                    }}>
                        
                </Card>
            </div>
        </Layout>
    )
}

export default CartPage;