import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterModal from './Components/Register';  
import LoginModal from './Components/Login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import UserActivation from './Components/UserActivation'; 
import LandingPage from './Components/Pages/LandingPage';
import HomePage from './Components/Pages/HomePage';
import ProductsList from './Components/products/ProductList';
import Profile from './Components/Profile';

const App = () => {
  const toastContainerStyle = {
    top: 16,
    right: 16,
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/register" element={<RegisterModal />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/activate/:uid/:token" element={<UserActivation />} />
      </Routes>
      <ToastContainer style={toastContainerStyle} />
    </Router>
  );
};

export default App;
