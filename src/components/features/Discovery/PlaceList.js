import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Loader2, AlertCircle, Camera } from 'lucide-react';
import Button from '../../common/Button';

const PlaceList = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                // Using the requested robust fetching logic
                const response = await axios.get('http://localhost:5000/api/places');
                setPlaces(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.response?.data?.message || 'Failed to fetch places. Is the backend running?');
                setLoading(false);
            }
        };

        fetchPlaces();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl mt-12">
                <Loader2 className="animate-spin text-primary w-12 h-12 mb-4" />
                <p className="text-gray-500 font-medium font-outfit">Fetching the wonders of Sri Lanka...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto mt-12 p-8 bg-red-50 rounded-3xl border border-red-100 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-outfit">Connection Error</h3>
                <p className="text-red-600 mb-6 font-medium">{error}</p>
                <Button onClick={() => window.location.reload()} variant="primary" className="w-full">
                    Retry Connection
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-2 font-outfit uppercase tracking-tight">
                    Must-Visit <span className="text-primary">Destinations</span>
                </h2>
                <div className="w-20 h-1.5 bg-secondary rounded-full" />
            </div>

            {places.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <Camera className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-medium">No places found in the database yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {places.map((place) => (
                        <div key={place._id} className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-50 group hover:-translate-y-2 transition-all duration-500">
                            <div className="relative h-64 overflow-hidden bg-gray-100">
                                {place.image ? (
                                    <img
                                        src={place.image}
                                        alt={place.name}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Camera className="w-10 h-10 text-gray-300" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                                    <MapPin className="w-3.5 h-3.5 text-primary" />
                                    <span className="text-xs font-black text-gray-900 uppercase tracking-wider">
                                        {place.districtId?.name || 'Local Destination'}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-black text-gray-900 mb-3 font-outfit uppercase tracking-tight">
                                    {place.name}
                                </h3>
                                <p className="text-gray-500 leading-relaxed mb-6 font-medium line-clamp-3">
                                    {place.description}
                                </p>
                                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                    <div className="text-sm">
                                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Est. Fare</p>
                                        <p className="text-gray-900 font-black text-lg">
                                            Rs. {place.estimatedCabFare?.toLocaleString() || '---'}
                                        </p>
                                    </div>
                                    <Button variant="secondary" className="px-8 shadow-md hover:shadow-yellow-500/30">
                                        Explore
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlaceList;
