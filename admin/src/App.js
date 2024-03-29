import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Venderdashboard from './containers/Venderdashboard/Index';
import Usersignin from './containers/Usersignin/Index';
import Usersignup from './containers/Usersignup/Index';
import Home from './containers/Home/Index';
import PrivateRoute from './components/HOC/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getInitialData } from './actions';
import { Products } from './containers/Products/Index';
import { Orders } from './containers/Orders/Index';
import { Category } from './containers/Category/Index';
import NewPage from './containers/NewPage/Index';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state =>  state.auth)

  // ComponenetDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
    if(auth.authenticate) {
      dispatch(getInitialData())
    }
  }, [auth.authenticate])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path='/' element={<Home />} />
          </Route>
          <Route path='/products' element={<PrivateRoute />}>
            <Route path='/products' element={ <Products /> } />
          </Route>
          <Route path='/page' element={<PrivateRoute />}>
            <Route path='/page' element={ <NewPage /> } />
          </Route>
          <Route path='/orders' element={<PrivateRoute />}>
            <Route path='/orders' element={ <Orders /> } />
          </Route>
          <Route path='/category' element={<PrivateRoute />}>
            <Route path='/category' element={ <Category /> } />
          </Route>
          <Route path='/dashboard' element={<Venderdashboard />}></Route>
          <Route path='/admin/signin' element={<Usersignin />}></Route>
          <Route path='/admin/signup' element={<Usersignup />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
