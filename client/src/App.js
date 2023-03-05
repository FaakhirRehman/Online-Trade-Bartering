import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './containers/HomePage/Index';
import { ProductListPage } from './containers/ProductListPage/Index';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={<HomePage />}></Route>
          <Route path='/:slug' element={<ProductListPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
