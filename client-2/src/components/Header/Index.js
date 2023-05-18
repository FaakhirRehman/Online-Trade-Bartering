/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import OTPlogo from '../../images/logo/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';

import Search from '../../AppComponent/Navbar/Search';
import NavLinks from '../../AppComponent/Navbar/NavLinks';
import { loginModel, signout } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

const Header = (props) => {
  const [UserMenu, setUserMenu] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(signout());
  };

  const userMenu = [
    { label: 'Your Profile', href: '', icon: null },
    { label: 'Orders', href: '', icon: null },
    { label: 'Wishlist', href: '', icon: null },
    { label: 'Rewards', href: '', icon: null },
    { label: 'Logout', href: '', icon: null, onClick: logout },
  ];
  const guestMenu = [
    { label: 'Register account', href: '', icon: null },
    { label: 'Orders', href: '', icon: null },
    { label: 'Wishlist', href: '', icon: null },
    { label: 'Rewards', href: '', icon: null },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-wrap w-full">
        <section className="relative  w-full">
          {/* <!-- navbar --> */}
          <nav className="flex justify-between bg-white shadow-md text-black  w-full">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center relative">
              <Link to="/" className="text-8xl font-bold font-heading">
                <img
                  className="absolute w-[130px] inset-0 h-full object-cover "
                  src={OTPlogo}
                  alt="logo"
                />
              </Link>

              {/* Search   */}
              <Search />
              {/* <!-- Nav Links --> */}
              <NavLinks />
              {/* <!-- Header Icons --> */}
              <div className="hidden xl:flex items-center space-x-5 items-center">
                <a className="hover:text-gray-200" href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </a>
                <a
                  className="flex items-center hover:text-gray-200"
                  href="#"
                  onClick={() => navigate('/cart')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                </a>
                {/* <!-- Sign In / Register      --> */}
                <span
                  className="flex items-center cursor-pointer"
                  onClick={() => dispatch(loginModel())}
                  onMouseOver={() => setUserMenu((menu) => true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hover:text-gray-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div
                    id="dropdown"
                    className={`z-10 ${
                      !UserMenu ? 'hidden' : 'absolute'
                    }  top-24 bg-white divide-y divide-gray-100 rounded shadow-lg w-48 right-8`}
                    onMouseOut={() => setUserMenu((menu) => false)}
                  >
                    <ul
                      className="py-2 text-sm text-zinc-800 w-full"
                      aria-labelledby="dropdown-button"
                    >
                      {auth.authenticate
                        ? userMenu.map((menu, idx) => {
                            return (
                              <li key={idx}>
                                <Link to={``}>
                                  <button
                                    type="button"
                                    className="inline-flex w-full px-4 py-2 border transition-all hover:bg-[#038FC4] dark:hover:bg-[#038FC4] dark:hover:text-white"
                                  >
                                    {menu.label}
                                  </button>
                                </Link>
                              </li>
                            );
                          })
                        : guestMenu.map((menu, idx) => {
                            return (
                              <li key={idx}>
                                <Link to={``}>
                                  <button
                                    type="button"
                                    className="inline-flex w-full px-4 py-2 border transition-all hover:bg-[#038FC4] dark:hover:bg-[#038FC4] dark:hover:text-white"
                                  >
                                    {menu.label}
                                  </button>
                                </Link>
                              </li>
                            );
                          })}
                    </ul>
                  </div>
                </span>
              </div>
            </div>
            {/* <!-- Responsive navbar --> */}
            <a className="xl:hidden flex mr-6 items-center" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span>
            </a>
            <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </a>
          </nav>
        </section>
      </div>
    </div>
  );
};

export default Header;

// import React, { useEffect, useState } from 'react';
// import './style.css';
// import OTPlogo from '../../images/logo/logo.jpg';
// import goldenStar from '../../images/logo/golden-star.png';
// import { useDispatch, useSelector } from 'react-redux';
// import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
// import {
//   Modal,
//   MaterialInput,
//   MaterialButton,
//   DropdownMenu,
// } from '../MaterialUI/Index';
// import { login, signout } from '../../actions';
// import { useNavigate } from 'react-router-dom';

// /**
//  * @author
//  * @function Header
//  **/

// export const Header = (props) => {
//   const [loginModal, setLoginModal] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const auth = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const userLogin = () => {
//     dispatch(login({ email, password }));
//   };

//   const navigateToCart = () => {
//     navigate('/cart');
//   };

//   const logout = () => {
//     dispatch(signout());
//   };

//   useEffect(() => {
//     if (auth.authenticate) {
//       setLoginModal(false);
//     }
//   }, [auth.authenticate]);

//   const renderLoggedInMenu = () => {
//     return (
//       <DropdownMenu
//         menu={
//           <a className="fullName">
//             {auth.user.firstName + ' ' + auth.user.lastName}
//           </a>
//         }
//         menus={[
//           { label: 'Your Profile', href: '', icon: null },
//           { label: 'Orders', href: '', icon: null },
//           { label: 'Wishlist', href: '', icon: null },
//           { label: 'Rewards', href: '', icon: null },
//           { label: 'Logout', href: '', icon: null, onClick: logout },
//         ]}
//       />
//     );
//   };

//   const renderNonLoggedInMenu = () => {
//     return (
//       <DropdownMenu
//         menu={
//           <a className="loginButton" onClick={() => setLoginModal(true)}>
//             Login
//           </a>
//         }
//         menus={[
//           { label: 'Your Profile', href: '', icon: null },
//           { label: 'Orders', href: '', icon: null },
//           { label: 'Wishlist', href: '', icon: null },
//           { label: 'Rewards', href: '', icon: null },
//         ]}
//         firstMenu={
//           <div className="firstmenu">
//             <span>New Customer?</span>
//             <a style={{ color: '#2874f0' }}>Sign Up</a>
//           </div>
//         }
//       />
//     );
//   };

//   return (
//     <div className="header">
//       <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
//         <div className="authContainer">
//           <div className="row">
//             <div className="leftspace">
//               <h2>Login</h2>
//               <p>
//                 Login to get access to your Orders, Wishlist and Recommendations
//               </p>
//             </div>
//             <div className="rightspace">
//               <MaterialInput
//                 type="text"
//                 label="Enter Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />

//               <MaterialInput
//                 type="password"
//                 label="Enter Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />

//               <MaterialButton
//                 title="Login"
//                 bgColor="#fb641b"
//                 textColor="#ffffff"
//                 style={{
//                   margin: '20px 0',
//                 }}
//                 onClick={userLogin}
//               />

//               <p>OR</p>

//               <MaterialButton
//                 title="Request OTP"
//                 bgColor="#ffffff"
//                 textColor="#fb641b"
//                 style={{
//                   margin: '20px 0',
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </Modal>
//       <div className="subHeader">
//         <div className="logo">
//           <a href="">
//             <img src={OTPlogo} className="logoimage" alt="" />
//           </a>
//           <a style={{ marginTop: '-10px' }}>
//             <span className="exploreText">Explore</span>
//             <span className="plusText">Plus</span>
//             <img src={goldenStar} className="goldenStar" alt="" />
//           </a>
//         </div>
//         <div
//           style={{
//             padding: '0 10px',
//           }}
//         >
//           <div className="searchInputContainer">
//             <input
//               className="searchInput"
//               placeholder={'Search for products here'}
//             />
//             <div className="searchIconContainer">
//               <IoIosSearch
//                 style={{
//                   color: '#2874f0',
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="rightMenu">
//           {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
//           <DropdownMenu
//             menu={
//               <a className="more">
//                 <span>More</span>
//                 <IoIosArrowDown />
//               </a>
//             }
//             menus={[
//               { label: 'Notification Settings', href: '', icon: null },
//               { label: 'Sell on OTP', href: '', icon: null },
//               { label: '24x7 Customer Support', href: '', icon: null },
//               { label: 'Advertise', href: '', icon: null },
//             ]}
//           />
//           <div>
//             <a
//               className="cart"
//               onClick={() => navigateToCart()}
//               style={{ cursor: 'pointer' }}
//             >
//               <IoIosCart />
//               <span style={{ margin: '0 10px' }}>Cart</span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;
