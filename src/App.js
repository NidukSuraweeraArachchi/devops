import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DistrictList from './components/DistrictList';
import DistrictDetail from './components/DistrictDetail';
import Cart from './components/Cart';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto py-8 px-4">
          <Routes>
            <Route path="/" element={<DistrictList />} />
            <Route path="/district/:id" element={<DistrictDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
