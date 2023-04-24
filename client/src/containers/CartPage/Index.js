import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout/Index';
import Card from '../../components/UI/Card/Index';
import './Style.css';

/**
* @author
* @function CartPage
**/

export const CartPage = (props) => {

    const cart = useSelector(state => state.cart);

    const cartItems = cart.cartItems;

    console.log("items", cartItems);

    return (
        <Layout>
            <div className='cartContainer'>
                <Card
                    headerLeft={<div>My Cart</div>}
                    headerRight={<div>Deliver To</div>}
                >
                    {
                        Object.keys(cartItems).map((key, index) =>
                            <div key={index} className='flexRow'>
                                <div className='cartProdcutContainer'>
                                    <img src="" />
                                </div>
                                <div className='cartItemDetails'>
                                    <div>
                                        {cartItems[key].name} - Quantity {cartItems[key].qty}
                                    </div>
                                    <div>Delivery in 3 - 5 Days</div>
                                </div>
                            </div>)
                    }

                </Card>

                <Card
                    style={{
                        width: '500px'
                    }}>Price</Card>
            </div>
        </Layout>
    )
}

export default CartPage;