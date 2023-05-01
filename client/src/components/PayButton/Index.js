import React from 'react';
import axios from "../../helpers/axios";
import { useSelector } from 'react-redux';
//import { url } from '../'

/**
* @author
* @function PayButton
**/

export const PayButton = (props) => {

    const user = useSelector(state => state.auth);

    const handleCheckout = async() => {
        console.log("working", props);
        const res = await axios.post(`/stripe/create-checkout-session`, {
            cartItems: props,
            userId: user._id
        })
        if(res.status == 200) {
            console.log("working", res.data.URL);
            //alert("Pause");
            window.location.href = await res.data.URL
        } else {
            console.log("error");
        }
        
        //const { URL } = res.data;
        /*
        .then((res) => {
            if (res.data.url) {
                window.location.href = res.data.url;
            }
        }).catch((err) =>
            console.log(err.message)
        );
        */
    }

    return (
        <button onClick={() => handleCheckout()} className='materialButton'>
            Checkout
        </button>
    )

}

export default PayButton;