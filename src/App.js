import { Row } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { allProductsKey, baseUrl } from './constants/ApiEndPoints';
// import {ProductCard} from './ProductCard';
import "./components/ProductCard.css"
import { MyNavbar } from './components/Navbar';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import { LoginSignupForm } from './pages/Login';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import backgroundImage from './background.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { Spinner } from 'react-bootstrap';
import { Cart } from 'react-bootstrap-icons';
import { CartPage } from './pages/CartsPage';
import { useContext } from 'react';
import { FavouritesPage } from './pages/FavouritesPage';
import { PrivateRoute } from './PrivateRoute';

// export const favList=[{}];
export const MyContext = React.createContext([{}]);

function App() {
  const [category, setCategory] = useState('all');


  const handleCategoryChange = (eventKey) => {
    setCategory(eventKey);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (
    <div className='gradient-background'>
        <MyNavbar handleCategory={handleCategoryChange} setCategory={setCategory} isAuthenticated={isAuthenticated} />
      <BrowserRouter>
      <Routes>
  <Route path='/' element={<Navigate to="/home" />} />
  <Route path='/login' element={<LoginSignupForm setIsAuthenticated={setIsAuthenticated} />} />
  <Route path='/home' element={<PrivateRoute isAuthenticated={isAuthenticated} category={category} setCategory={setCategory} ><Home /></PrivateRoute>} />
  <Route path='/product/:id' element={<ProductDetailPage />} />
  <Route path='/carts' element={<CartPage />} />
  <Route path='*' element={<h1>Page Not Found</h1>} />
</Routes>
      </BrowserRouter>
      <Footer />

    </div>

  );
}

export default App;
