import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DistrictList from './components/DistrictList';
import DistrictDetail from './components/DistrictDetail';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import About from './components/About';
import CartSidebar from './components/features/Booking/CartSidebar';
import { CartProvider, useCart } from './context/CartContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AdminDashboard from './components/Admin/AdminDashboard';
import PlaceList from './components/features/Discovery/PlaceList';
import './App.css';

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, removeFromCart } = useCart();

  const handleBookFullTrip = () => {
    alert("Booking individual cabs for all destinations in your trip...");
    setIsCartOpen(false);
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="App min-h-screen bg-[#fafafa]">
        <Navbar onOpenCart={() => setIsCartOpen(true)} />

        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<DistrictList />} />
            <Route path="/district/:id" element={<DistrictDetail />} />
            <Route path="/places" element={<PlaceList />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemove={removeFromCart}
          onBookAll={handleBookFullTrip}
        />

        {/* Footer Accent */}
        <footer className="py-10 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">
            © 2026 Ceylon Explorer • Travel with Heart
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
