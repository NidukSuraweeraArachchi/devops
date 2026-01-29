import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Info, Star, Camera, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import PlaceCard from './features/Discovery/PlaceCard';
import Modal from './common/Modal';
import CabBookingForm from './features/Booking/CabBookingForm';
import { useCart } from '../context/CartContext';

// Enhanced mock data for places within districts with reliable images
const placesByDistrict = {
  1: [ // Kandy
    {
      id: 101,
      name: "Temple of the Tooth",
      rating: 4.8,
      location: "Kandy Town",
      image: "https://images.unsplash.com/photo-1586166898420-82c4c73b8df0?auto=format&fit=crop&w=800&q=80",
      description: "Sri Dalada Maligawa is a Buddhist temple in Kandy, Sri Lanka. It is located in the royal palace complex, housing the sacred tooth relic of Lord Buddha."
    },
    {
      id: 102,
      name: "Royal Botanical Gardens",
      rating: 4.6,
      location: "Peradeniya",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      description: "Renowned for its collection of orchids, the garden includes more than 4000 species of plants, including rare medicinal plants and spice trees."
    },
    {
      id: 103,
      name: "Kandy Lake",
      rating: 4.5,
      location: "Kandy City",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
      description: "An artificial lake in the heart of Kandy, built in 1807 by the last king of Sri Lanka, surrounded by historic sites and peaceful walking paths."
    }
  ],
  2: [ // Galle
    {
      id: 201,
      name: "Galle Dutch Fort",
      rating: 4.9,
      location: "Galle Fort",
      image: "https://images.unsplash.com/photo-1590123874657-cd1d7a5f8d6c?auto=format&fit=crop&w=800&q=80",
      description: "A UNESCO World Heritage site, first built by the Portuguese in 1588, then extensively fortified by the Dutch. Home to charming streets and colonial architecture."
    },
    {
      id: 202,
      name: "Unawatuna Beach",
      rating: 4.7,
      location: "Unawatuna",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=800&q=80",
      description: "A famous banana-shaped beach with calm turquoise waters, vibrant coral reefs, and a lively nightlife scene. Perfect for swimming and snorkeling."
    },
    {
      id: 203,
      name: "Japanese Peace Pagoda",
      rating: 4.6,
      location: "Rumassala",
      image: "https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=800&q=80",
      description: "A beautiful white stupa perched on a hilltop offering panoramic views of Galle, the Indian Ocean, and surrounding jungle."
    }
  ]
};

const districtsData = {
  1: {
    name: "Kandy",
    headerImage: "https://images.unsplash.com/photo-1586166898420-82c4c73b8df0?auto=format&fit=crop&w=1920&q=80",
    description: "The cultural capital of Sri Lanka",
    highlights: ["Temple of the Tooth", "Botanical Gardens", "Scenic Train Rides"]
  },
  2: {
    name: "Galle",
    headerImage: "https://images.unsplash.com/photo-1590123874657-cd1d7a5f8d6c?auto=format&fit=crop&w=1920&q=80",
    description: "Colonial charm meets coastal beauty",
    highlights: ["Dutch Fort", "Pristine Beaches", "Historic Architecture"]
  }
};

const DistrictDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const district = districtsData[id] || {
    name: 'District',
    headerImage: 'https://images.unsplash.com/photo-1588598198062-e2a6e6615b6d?auto=format&fit=crop&w=1920&q=80',
    description: 'Explore the beauty of Sri Lanka',
    highlights: ['Scenic Views', 'Local Culture', 'Adventure']
  };
  const places = placesByDistrict[id] || [];

  const handleBookCab = (place) => {
    setSelectedPlace(place);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = async (data) => {
    console.log('Booking confirmed:', data);
    alert(`Success! Cab booked to ${data.destination}.`);
    setIsBookingModalOpen(false);
  };

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
          src={district.headerImage}
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

            {/* Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              {district.highlights.map((highlight, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-secondary/20 backdrop-blur-md rounded-full text-secondary text-sm font-bold border border-secondary/30"
                >
                  {highlight}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-8 text-white/70">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                <span className="font-medium">{places.length} Attractions</span>
              </div>
              <div className="h-5 w-px bg-white/30" />
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-secondary fill-secondary" />
                <span className="font-medium">4.8 Average Rating</span>
              </div>
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
                key={place.id}
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