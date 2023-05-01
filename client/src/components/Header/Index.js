import React, { useEffect, useState } from 'react';
import './style.css';
import OTPlogo from '../../images/logo/logo.jpg';
import goldenStar from '../../images/logo/golden-star.png';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu
} from '../MaterialUI/Index';
import { login, signout } from '../../actions';
import { useNavigate } from 'react-router-dom';

/**
* @author
* @function Header
**/

export const Header = (props) => {

  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = () => {
    dispatch(login({ email, password }));
  };

  const navigateToCart = () => {
    navigate('/cart');
  }

  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
    }
  }, [auth.authenticate]);

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a className='fullName'>
            {auth.user.firstName + " " + auth.user.lastName}
          </a>
        }
        menus={[
          { label: 'Your Profile', href: '', icon: null },
          { label: 'Orders', href: '', icon: null },
          { label: 'Wishlist', href: '', icon: null },
          { label: 'Rewards', href: '', icon: null },
          { label: 'Logout', href: '', icon: null, onClick: logout },
        ]}
      />
    );
  }

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a className="loginButton" onClick={() => setLoginModal(true)}>
            Login
          </a>
        }
        menus={[
          { label: 'Your Profile', href: '', icon: null },
          { label: 'Orders', href: '', icon: null },
          { label: 'Wishlist', href: '', icon: null },
          { label: 'Rewards', href: '', icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a style={{ color: '#2874f0' }}>Sign Up</a>
          </div>
        }
      />
    );
  }

  return (
    <div className="header">
      <Modal
        visible={loginModal}
        onClose={() => setLoginModal(false)}
      >
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Login to get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">

              <MaterialInput
                type="text"
                label="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <MaterialInput
                type="password"
                label="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <MaterialButton
                title="Login"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  margin: '20px 0'
                }}
                onClick={userLogin}
              />

              <p>
                OR
              </p>

              <MaterialButton
                title="Request OTP"
                bgColor="#ffffff"
                textColor="#fb641b"
                style={{
                  margin: '20px 0'
                }}
              />

            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        <div className="logo">
          <a href="">
            <img src={OTPlogo} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: '-10px' }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        <div style={{
          padding: '0 10px'
        }}>
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={'Search for products here'}
            />
            <div className="searchIconContainer">
              <IoIosSearch style={{
                color: '#2874f0'
              }} />
            </div>
          </div>
        </div>
        <div className="rightMenu">
          {
            auth.authenticate ?
              renderLoggedInMenu() : renderNonLoggedInMenu()
          }
          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: 'Notification Settings', href: '', icon: null },
              { label: 'Sell on OTP', href: '', icon: null },
              { label: '24x7 Customer Support', href: '', icon: null },
              { label: 'Advertise', href: '', icon: null },
            ]}
          />
          <div>
            <a className="cart" onClick={() => navigateToCart()} style={{ cursor: "pointer" }}>
              <IoIosCart />
              <span style={{ margin: '0 10px' }}>Cart</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;