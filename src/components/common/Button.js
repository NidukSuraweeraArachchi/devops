import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) => {
    const baseStyles = 'px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2';

    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-cyan-900/20',
        secondary: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
        cart: 'bg-secondary text-black hover:bg-secondary-dark shadow-md hover:shadow-yellow-900/20',
        outline: 'border-2 border-gray-200 text-gray-600 hover:border-primary hover:text-primary',
        link: 'text-primary hover:underline p-0 underline-offset-4'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
