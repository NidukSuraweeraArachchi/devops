import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

const DistrictGrid = ({ districts, onSelectDistrict }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {districts.map((district, index) => (
                <motion.div
                    key={district.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onSelectDistrict(district)}
                    className="group relative cursor-pointer overflow-hidden rounded-3xl aspect-[4/5] bg-gray-200"
                >
                    {/* Image */}
                    <img
                        src={district.image}
                        alt={district.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <div className="flex items-center gap-2 text-white/80 text-sm font-medium mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <MapPin className="w-4 h-4" />
                            <span>District of Sri Lanka</span>
                        </div>
                        <h3 className="text-3xl font-black text-white mb-2 group-hover:text-yellow-400 transition-colors">
                            {district.name}
                        </h3>
                        <p className="text-white/70 text-sm line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {district.description}
                        </p>
                        <div className="flex items-center gap-2 text-white font-bold text-sm transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                            Explore Now <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default DistrictGrid;
