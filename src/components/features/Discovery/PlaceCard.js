import React from 'react';
import { Star, MapPin, Car, ShoppingCart, Camera, Sparkles } from 'lucide-react';
import Button from '../../common/Button';

const PlaceCard = ({ place, onBookCab, onAddToCart }) => {
    const { name, image, rating, description, location } = place;

    return (
        <div className="group overflow-hidden bg-white rounded-[2rem] shadow-lg shadow-gray-100/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 border border-gray-50">
            {/* Image Container */}
            <div className="relative h-72 overflow-hidden bg-gray-100">
                <img
                    src={image || 'https://images.unsplash.com/photo-1588598198062-e2a6e6615b6d?auto=format&fit=crop&w=800&q=80'}
                    alt={name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1588598198062-e2a6e6615b6d?auto=format&fit=crop&w=800&q=80';
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-2 bg-white/95 backdrop-blur-md rounded-full shadow-lg">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-gray-800">{rating || '4.5'}</span>
                </div>

                {/* Featured Badge */}
                {rating >= 4.7 && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-secondary to-orange-500 rounded-full shadow-lg">
                        <Sparkles className="w-3 h-3 text-black" />
                        <span className="text-xs font-bold text-black uppercase tracking-wider">Top Rated</span>
                    </div>
                )}

                {/* Quick View on Hover */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full">
                        <Camera className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold text-gray-800">View Details</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-7">
                {/* Location Tag */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full">
                        <MapPin className="w-3 h-3 text-primary" />
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                            {location || 'Sri Lanka'}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="mb-3 text-2xl font-black text-gray-900 group-hover:text-primary transition-colors leading-tight">
                    {name}
                </h3>

                {/* Description */}
                <p className="mb-6 text-sm leading-relaxed text-gray-500 line-clamp-3">
                    {description || "Explore the breathtaking beauty and rich cultural heritage of this magnificent location. A must-visit destination for any traveler."}
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                        variant="primary"
                        className="flex-1 py-3 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                        onClick={() => onBookCab(place)}
                    >
                        <Car className="w-4 h-4" />
                        Book Cab Now
                    </Button>
                    <Button
                        variant="cart"
                        className="flex-shrink-0 px-5 py-3 shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30"
                        onClick={() => onAddToCart(place)}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Trip
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PlaceCard;
