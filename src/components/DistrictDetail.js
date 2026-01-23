import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Info, Star } from 'lucide-react';
import PlaceCard from './features/Discovery/PlaceCard';
import Modal from './common/Modal';
import CabBookingForm from './features/Booking/CabBookingForm';
import useCart from '../hooks/useCart';

// Mock data for places within districts
const placesByDistrict = {
  1: [ // Kandy
    { id: 101, name: "Temple of the Tooth", rating: 4.8, location: "Kandy Town", image: "https://images.unsplash.com/photo-1546708973-b339540b3162?auto=format&fit=crop&q=80", description: "Sri Dalada Maligawa is a Buddhist temple in Kandy, Sri Lanka. It is located in the royal palace complex." },
    { id: 102, name: "Royal Botanical Gardens", rating: 4.6, location: "Peradeniya", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80", description: "Renowned for its collection of orchids, the garden includes more than 4000 species of plants." }
  ],
  2: [ // Galle
    { id: 201, name: "Galle Dutch Fort", rating: 4.9, location: "Galle Fort", image: "https://images.unsplash.com/photo-1549419130-918c50403310?auto=format&fit=crop&q=80", description: "A UNESCO World Heritage site, first built by the Portuguese in 1588, then fortified by the Dutch." },
    { id: 202, name: "Unawatuna Beach", rating: 4.7, location: "Unawatuna", image: "https://images.unsplash.com/photo-1589139598282-3e284a7df2d2?auto=format&fit=crop&q=80", description: "A famous banana-shaped beach with calm turquoise waters and vibrant nightlife." }
  ]
};

const districtsData = {
  1: { name: "Kandy", headerImage: "https://images.unsplash.com/photo-1546708973-b339540b3162?auto=format&fit=crop&q=80" },
  2: { name: "Galle", headerImage: "https://images.unsplash.com/photo-1549419130-918c50403310?auto=format&fit=crop&q=80" }
};

const DistrictDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const district = districtsData[id] || { name: 'District', headerImage: '' };
  const places = placesByDistrict[id] || [];

  const handleBookCab = (place) => {
    setSelectedPlace(place);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = async (data) => {
    console.log('Booking confirmed:', data);
    // Here you would call your backend API
    alert(`Success! Cab booked to ${data.destination}.`);
    setIsBookingModalOpen(false);
  };

  return (
    <div className="pt-20">
      {/* Header Banner */}
      <div className="relative h-[25rem] w-full overflow-hidden rounded-3xl mb-12">
        <img
          src={district.headerImage}
          alt={district.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <button
            onClick={() => navigate('/')}
            className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Explore
          </button>
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase">{district.name}</h1>
            <div className="flex items-center justify-center gap-4 text-white/80">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Sri Lanka</span>
              <span className="h-4 w-px bg-white/20" />
              <span className="flex items-center gap-1"><Info className="w-4 h-4" /> {places.length} Attractions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Places Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-2">Must Visit Places</h2>
          <div className="w-20 h-1.5 bg-[#FFB800] rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {places.length > 0 ? (
            places.map(place => (
              <PlaceCard
                key={place.id}
                place={place}
                onBookCab={handleBookCab}
                onAddToCart={addToCart}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed">
              <p className="text-gray-400 font-bold">More details coming soon for this district!</p>
            </div>
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

      <div className="h-40" />
    </div>
  );
};

export default DistrictDetail;