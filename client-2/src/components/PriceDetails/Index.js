import React from 'react';
import Card from '../../components/UI/Card/Index';
import { useNavigate } from 'react-router-dom';

/**
 * @author
 * @function PriceDetails
 **/

const PriceDetails = (props) => {
  const navigate = useNavigate();
  return (
    <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
      <div class="mb-2 flex justify-between">
        <p class="text-gray-700">Subtotal</p>
        <p class="text-gray-700">{props.totalPrice}</p>
      </div>
      <div class="flex justify-between">
        <p class="text-gray-700">Shipping</p>
        <p class="text-gray-700">{props.totalPrice * 0.0005 + 150}</p>
      </div>
      <hr class="my-4" />
      <div class="flex justify-between">
        <p class="text-lg font-bold">Total</p>
        <div class="">
          <p class="mb-1 text-lg font-bold">
            {props.totalPrice + props.totalPrice * 0.0005 + 150} PKR
          </p>
          <p class="text-sm text-gray-700">including VAT</p>
        </div>
      </div>
      <button
        class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
        onClick={() => navigate('/checkout')}
      >
        Check out
      </button>
    </div>
  );
};

export default PriceDetails;
