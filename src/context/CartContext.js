import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    // const [loading, setLoading] = useState(false); // Maybe add loading state later

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    // Helper to get auth header
    const getAuthHeader = () => {
        const token = localStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const fetchCart = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setCartItems([]);
            return;
        }

        try {
            const res = await axios.get(`${apiUrl}/api/cart/${userId}`, {
                headers: getAuthHeader()
            });
            // Normalize: flatten structure so items look like places but have cartItemId
            const normalizedItems = res.data.map(item => ({
                ...item.placeId,
                id: item.placeId._id, // Ensure id is placeId
                cartItemId: item._id // Store cart item ID for deletion
            }));
            setCartItems(normalizedItems);
        } catch (err) {
            console.error('Failed to fetch cart:', err);
        }
    };

    // Watch for login/logout (userId change in localStorage is not automatically detected by React state, 
    // but we can check on mount and maybe poll or expose a refresh method. 
    // Better: We can rely on components re-mounting or the app structure.
    // However, since Login/Navbar force navigation, this component might not unmount if it's high up.
    // Let's add a listener for storage events or just expose a refresh.
    // Actually, simple solution: useEffect with no deps to load on mount, 
    // and maybe expose a 'refreshCart' function that Login/Navbar calls? 
    // Or just use a custom event.
    // For now, let's assume CartProvider is high up. 
    // When navigating, it might not re-render. 
    // But since we use `window.location` or `navigate`, we can trigger updates.
    // Let's rely on the fact that `userId` is in localStorage. 
    // We can add a simple interval or event listener if needed, 
    // but typically `useEffect` with a key or trigger is better.
    // Let's try to fetch on mount.
    // Users might need to refresh page to see cart if we don't handle this dynamic update.
    // A better way is to check `userId` prop or use a `user` context.
    // But sticking to simple changes:
    // We will listen to 'storage' events (only works across tabs) or custom event.
    // Let's verify if `Login` navigates. Yes `navigate('/')`. 
    // If `CartProvider` is in `App` wrapping routes, it won't unmount.
    // We can use `useLocation` from router to trigger check?
    // Let's try `window.addEventListener('storage', ...)` and a custom event.

    useEffect(() => {
        fetchCart();

        // Custom event for same-tab updates (like after login/logout)
        const handleCartUpdate = () => fetchCart();
        window.addEventListener('cart-updated', handleCartUpdate);

        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    const addToCart = async (place) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert("Please login to add items to cart");
            return;
        }

        // Optimistic check
        if (cartItems.find(item => item.id === (place._id || place.id))) return;

        try {
            const res = await axios.post(`${apiUrl}/api/cart`, {
                placeId: place._id || place.id,
                userId
            }, { headers: getAuthHeader() });

            // The API returns the new CartItem
            // We need to construct the frontend item. 
            // The API response might not populate 'placeId' immediately?
            // `api.js` says: `const newCartItem = await cartItem.save(); res.status(201).json(newCartItem);`
            // It does NOT populate. So `res.data.placeId` is just the ID String/ObjectId.
            // So we can't fully construct the item from response alone without the `place` object passed in.

            const newItem = {
                ...place,
                id: place._id || place.id,
                cartItemId: res.data._id
            };

            setCartItems(prev => [...prev, newItem]);
        } catch (err) {
            console.error('Failed to add to cart:', err);
            alert('Failed to add to cart');
        }
    };

    const removeFromCart = async (placeId) => {
        const itemToRemove = cartItems.find(item => item.id === placeId);
        if (!itemToRemove || !itemToRemove.cartItemId) {
            // If it's a local-only item or missing ID, just filter
            setCartItems(prev => prev.filter(item => item.id !== placeId));
            return;
        }

        try {
            await axios.delete(`${apiUrl}/api/cart/${itemToRemove.cartItemId}`, {
                headers: getAuthHeader()
            });
            setCartItems(prev => prev.filter(item => item.id !== placeId));
        } catch (err) {
            console.error('Failed to remove from cart:', err);
        }
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            totalItems: cartItems.length,
            refreshCart: fetchCart // Expose method if needed
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext;
