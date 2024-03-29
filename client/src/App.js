import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './containers/HomePage/Index';
import { ProductListPage } from './containers/ProductListPage/Index';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, updateCart } from './actions';
import ProductDetailsPage from './containers/ProductDetailsPage/Index';
import CartPage from './containers/CartPage/Index';
import CheckoutPage from './containers/CheckoutPage/Index';
import CheckoutSuccess from './containers/CheckoutSuccess/Index';


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(updateCart());
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={<HomePage />}></Route>
          <Route path='/cart' element={<CartPage />}></Route>
          <Route path='/checkout-success' element={<CheckoutSuccess />}></Route>
          <Route path='/checkout' element={<CheckoutPage />}></Route>
          <Route path='/:productSlug/:productId/p' element={<ProductDetailsPage />}></Route>
          <Route path='/:slug' element={<ProductListPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
