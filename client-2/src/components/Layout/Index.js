import React from 'react';
import Header from '../Header/Index';
import Footer from '../../AppComponent/Footer';

/**
 * @author
 * @function Layout
 **/

export const Layout = (props) => {
  return (
    <>
      <Header />
      {/* <MenuHeader /> */}
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
