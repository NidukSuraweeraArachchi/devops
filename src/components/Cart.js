import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Banasura Sagar Dam',
      district: 'Wayanad',
      price: 500 // Sample cab fare
    }
  ]);

  const bookCab = (item) => {
    console.log('Booking cab for:', item.name);
    // Implement cab booking logic
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Travel Cart</h1>
      
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="border rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600">District: {item.district}</p>
              <p className="text-gray-600 mb-4">Estimated cab fare: ₹{item.price}</p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => bookCab(item)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Book Cab Now
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        to="/"
        className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Continue Exploring
      </Link>
    </div>
  );
};

export default Cart;