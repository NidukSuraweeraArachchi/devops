import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Info, Star, Camera, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import PlaceCard from './features/Discovery/PlaceCard';
import Modal from './common/Modal';
import CabBookingForm from './features/Booking/CabBookingForm';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const DistrictDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [district, setDistrict] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchDistrictData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/districts/${id}`);
        setDistrict(res.data.district);
        setPlaces(res.data.places || []);
      } catch (err) {
        console.error('Failed to fetch district data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDistrictData();
  }, [id, apiUrl]);

  const handleBookCab = (place) => {
    setSelectedPlace(place);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = async (data) => {
    console.log('Booking confirmed:', data);
    alert(`Success! Cab booked to ${data.destination}.`);
    setIsBookingModalOpen(false);
  };

  if (loading) {
    return (
      <div className="pt-40 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-primary w-12 h-12 mb-4" />
        <p className="text-gray-400 font-medium">Loading district details...</p>
      </div>
    );
  }

  if (!district) {
    return (
      <div className="pt-40 text-center">
        <h2 className="text-2xl font-bold text-gray-600 mb-2">District Not Found</h2>
        <p className="text-gray-400 mb-6">The district you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-primary text-white rounded-full font-bold">
          Back to Home
        </button>
      </div>
    );
  }

  const headerImage = district.image || 'https://images.unsplash.com/photo-1588598198062-e2a6e6615b6d?auto=format&fit=crop&w=1920&q=80';

  return (
    <div className="pt-20 pb-20">
      {/* Hero Header Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[30rem] w-full overflow-hidden rounded-[2.5rem] mb-16 mx-4"
        style={{ width: 'calc(100% - 2rem)' }}
      >
        <img
          src={headerImage}
          alt={district.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent" />

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold text-white hover:bg-white/20 transition-all border border-white/20"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Explore
        </motion.button>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-sm font-medium mb-6 border border-white/20">
              <MapPin className="w-4 h-4" /> Sri Lanka
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tighter uppercase">
              {district.name}
            </h1>
            <p className="text-xl text-white/80 mb-6">{district.description}</p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-8 text-white/70">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                <span className="font-medium">{places.length} Attractions</span>
              </div>
              {places.length > 0 && (
                <>
                  <div className="h-5 w-px bg-white/30" />
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-secondary fill-secondary" />
                    <span className="font-medium">
                      {(places.reduce((sum, p) => sum + (p.rating || 4.5), 0) / places.length).toFixed(1)} Average Rating
                    </span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Places Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-6 h-6 text-secondary" />
            <span className="text-secondary font-black text-sm tracking-widest uppercase">Discover</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-3">Must Visit Places</h2>
          <p className="text-gray-500 text-lg max-w-2xl">
            Explore the top-rated attractions and hidden gems in {district.name}. Book a cab or add to your trip cart.
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-secondary to-orange-400 rounded-full mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {places.length > 0 ? (
            places.map((place, idx) => (
              <motion.div
                key={place._id || place.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
              >
                <PlaceCard
                  place={place}
                  onBookCab={handleBookCab}
                  onAddToCart={addToCart}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-dashed border-gray-200"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Camera className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">Coming Soon</h3>
              <p className="text-gray-400 font-medium">More details coming soon for this district!</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title="Cab Booking"
      >
        {selectedPlace && (
          <CabBookingForm
            destinationName={selectedPlace.name}
            onSubmit={handleBookingSubmit}
            onCancel={() => setIsBookingModalOpen(false)}
          />
        )}
      </Modal>

      <div className="h-20" />
    </div>
  );
};

export default DistrictDetail;