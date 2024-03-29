import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginModel } from '../actions';
import { useNavigate } from 'react-router-dom';

const LoginModel = () => {
  const loginState = useSelector((state) => state.loginModel);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = () => {
    dispatch(login({ email, password }));
  };

  return (
    <div
      id="authentication-modal"
      tabindex="-1"
      aria-hidden="true"
      className={`${
        loginState ? 'visible' : 'hidden'
      } fixed top-0 left-0 right-0 z-50 bg-[#16161694]  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full flex justify-center items-center`}
    >
      <div className="relative w-full max-w-md max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            onClick={() => dispatch(loginModel())}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">
              Login
            </h3>
            <p classNameName="text-center">
              Login to get access your whishlist, Orders and reconmendation
            </p>
            <form
              className="mt-10"
              action="#"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div classNameName="mt-4">
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-between mt-5 "></div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={userLogin}
              >
                Login to your account
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300 w-full flex justify-center mt-5">
                <a
                  href="#"
                  className="text-blue-700 hover:underline dark:text-blue-500 text-center w-full"
                >
                  Request OTP
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModel;
