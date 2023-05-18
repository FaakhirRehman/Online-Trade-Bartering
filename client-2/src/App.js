import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetailsPage from './containers/ProductDetailsPage/Index';
import { ProductListPage } from './containers/ProductListPage/Index';
import CheckoutSuccess from './containers/CheckoutSuccess/Index';
import CheckoutPage from './containers/CheckoutPage/Index';
import { useDispatch, useSelector } from 'react-redux';
// import { isUserLoggedIn, updateCart } from './actions';
import HomePage from './containers/HomePage/Index';
import CartPage from './containers/CartPage/Index';
import { getAllCategory } from './actions';
import ShopPage from './containers/ShopPage';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import LoginModel from './AppComponent/LoginModel';

function App() {
  const dispatch = useDispatch();
  // const auth = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (!auth.authenticate) {
  //     dispatch(isUserLoggedIn());
  //   }
  // }, [auth.authenticate]);

  // useEffect(() => {
  //   dispatch(updateCart());
  // }, [auth.authenticate]);

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);
  return (
    <div className="App">
    <LoginModel/>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/shop" element={<ShopPage />}></Route>
          <Route path="/shop/:categorySlug" element={<ShopPage />}></Route>
          <Route path="/checkout-success" element={<CheckoutSuccess />}></Route>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
          <Route
            path="/:productSlug/:productId/p"
            element={<ProductDetailsPage />}
          ></Route>
          <Route path="/:slug" element={<ProductListPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
