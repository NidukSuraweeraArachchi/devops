import { useState, useEffect } from 'react';

const useCart = () => {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('tripCart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('tripCart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (place) => {
        setCartItems(prev => {
            if (prev.find(item => item.id === place.id)) return prev;
            return [...prev, place];
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems: cartItems.length
    };
};

export default useCart;
