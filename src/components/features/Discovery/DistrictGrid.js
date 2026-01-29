import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Star, Camera } from 'lucide-react';

const DistrictGrid = ({ districts, onSelectDistrict }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {districts.map((district, index) => (
                <motion.div
                    key={district.id || district._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onClick={() => onSelectDistrict(district)}
                    className="group relative cursor-pointer overflow-hidden rounded-[2rem] aspect-[4/5] bg-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-300/50 transition-all duration-500"
                >
                    {/* Image */}
                    <img
                        src={district.image}
                        alt={district.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1588598198062-e2a6e6615b6d?auto=format&fit=crop&w=800&q=80';
                        }}
                    />

                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Rating Badge */}
                    <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <Star className="w-4 h-4 text-secondary fill-secondary" />
                        <span className="text-sm font-bold text-gray-800">4.8</span>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        {/* Location Tag */}
                        <div className="flex items-center gap-2 text-white/80 text-sm font-medium mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="p-1.5 bg-white/20 backdrop-blur-md rounded-full">
                                <MapPin className="w-3 h-3" />
                            </div>
                            <span className="tracking-wide">District of Sri Lanka</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-4xl font-black text-white mb-3 group-hover:text-secondary transition-colors duration-300">
                            {district.name}
                        </h3>

                        {/* Description */}
                        <p className="text-white/70 text-sm leading-relaxed line-clamp-2 mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                            {district.description}
                        </p>

                        {/* Explore Button */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white font-bold text-sm transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                                <span className="px-5 py-2.5 bg-gradient-to-r from-secondary to-orange-500 rounded-full text-black flex items-center gap-2 shadow-lg shadow-secondary/30">
                                    Explore Now <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                            <div className="flex items-center gap-1 text-white/60 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                <Camera className="w-3 h-3" />
                                <span>6+ Places</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-secondary/30 to-transparent rounded-br-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
            ))}
        </div>
    );
};

export default DistrictGrid;
