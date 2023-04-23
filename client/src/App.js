import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './containers/HomePage/Index';
import { ProductListPage } from './containers/ProductListPage/Index';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions';
import ProductDetailsPage from './containers/ProductDetailsPage/Index';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
    
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={<HomePage />}></Route>
          <Route path='/:productSlug/:productId/p' element={<ProductDetailsPage />}></Route>
          <Route path='/:slug' element={<ProductListPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
