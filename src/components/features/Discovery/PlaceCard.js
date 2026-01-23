import React from 'react';
import { Star, MapPin, Car, ShoppingCart } from 'lucide-react';
import Button from '../../common/Button';

const PlaceCard = ({ place, onBookCab, onAddToCart }) => {
    const { name, image, rating, description, location } = place;

    return (
        <div className="group overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 uppercase-first">
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80'}
                    alt={name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-gray-800">{rating || '4.5'}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-center gap-1 mb-2 text-xs font-semibold tracking-wider text-[#006994] uppercase">
                    <MapPin className="w-3 h-3" />
                    {location || 'Sri Lanka'}
                </div>

                <h3 className="mb-3 text-2xl font-bold text-gray-900 group-hover:text-[#006994] transition-colors">
                    {name}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-gray-600 line-clamp-3">
                    {description || "Explore the breathtaking beauty and rich cultural heritage of this magnificent location. A must-visit destination for any traveler."}
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                        variant="primary"
                        className="flex-1"
                        onClick={() => onBookCab(place)}
                    >
                        <Car className="w-4 h-4" />
                        Book Cab Now
                    </Button>
                    <Button
                        variant="cart"
                        className="flex-shrink-0 px-4"
                        onClick={() => onAddToCart(place)}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Trip Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PlaceCard;
