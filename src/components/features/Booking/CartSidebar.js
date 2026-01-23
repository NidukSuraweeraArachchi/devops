import React from 'react';
import { X, Trash2, MapPin, Car, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';

const CartSidebar = ({ isOpen, onClose, items, onRemove, onBookAll }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <Briefcase className="w-6 h-6 text-[#E5A600]" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Your Trip Cart</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 transition-colors rounded-full hover:bg-gray-100"
                            >
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <div className="w-20 h-20 mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                                        <Briefcase className="w-10 h-10 text-gray-300" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                                    <p className="text-sm text-gray-500 mt-1">Start adding places to plan your trip.</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 p-3 border rounded-xl hover:border-[#006994] transition-colors bg-white group"
                                    >
                                        <div className="w-20 h-20 overflow-hidden rounded-lg flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <h4 className="font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {item.location}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => onRemove(item.id)}
                                                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium w-fit"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 bg-gray-50 border-t">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-gray-600 font-medium">Total Destinations</span>
                                    <span className="text-2xl font-black text-[#006994]">{items.length}</span>
                                </div>
                                <Button
                                    variant="primary"
                                    className="w-full py-4 text-lg shadow-xl shadow-cyan-900/10"
                                    onClick={onBookAll}
                                >
                                    <Car className="w-5 h-5" />
                                    Book Cab for Full Trip
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;
