/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import './Style.css';
import { generatePublicUrl } from '../../../urlConfig';
import { Navigate, useNavigate } from 'react-router-dom';

/**
 * @author
 * @function CartItem
 **/

const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.qty);

  const { _id, name, price, img } = props.cartItem;

  const onQuantityIncrement = () => {
    setQty(qty + 1);
    props.onQuantityInc(_id, qty + 1);
  };

  const onQuantityDecrement = () => {
    if (qty <= 1) {
      return;
    }

    setQty(qty - 1);
    props.onQuantityDec(_id, qty - 1);
  };

  return (
    <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      {/*  img src :: {generatePublicUrl(img)}  */}
      <img
        src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="product-image"
        class="w-full rounded-lg sm:w-40"
      />

      <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div class="mt-5 sm:mt-0">
          <h2 class="text-lg font-bold text-gray-900">{name}</h2>
          <p class="mt-1 text-xs text-gray-700">
            Estimated Delivery Time: 3-5 Days
          </p>
        </div>
        <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div class="flex items-center border-gray-100">
            <span
              class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
              onClick={onQuantityDecrement}
            >
              {' '}
              -{' '}
            </span>
            <input
              class="h-8 w-8 border bg-white text-center text-xs outline-none"
              type="number"
              value={qty}
              min="1"
              readOnly
            />
            <span
              class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
              onClick={onQuantityIncrement}
            >
              {' '}
              +{' '}
            </span>
          </div>
          <div class="flex items-center space-x-4">
            <p class="text-sm">{`Rs/- ${price}`}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
