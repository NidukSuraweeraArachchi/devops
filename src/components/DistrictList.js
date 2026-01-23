import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Compass } from 'lucide-react';
import DistrictGrid from './features/Discovery/DistrictGrid';

const districtsData = [
  {
    id: 1,
    name: "Kandy",
    image: "https://images.unsplash.com/photo-1546708973-b339540b3162?auto=format&fit=crop&q=80",
    description: "The cultural capital of Sri Lanka, home to the Temple of the Sacred Tooth Relic and beautiful botanical gardens."
  },
  {
    id: 2,
    name: "Galle",
    image: "https://images.unsplash.com/photo-1549419130-918c50403310?auto=format&fit=crop&q=80",
    description: "A coastal gem known for its colonial charm, Dutch Fort, and stunning Indian Ocean views."
  },
  {
    id: 3,
    name: "Ella",
    image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80",
    description: "A mountain paradise famous for Nine Arch Bridge, Little Adam's Peak, and rolling tea estates."
  },
  {
    id: 4,
    name: "Nuwara Eliya",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80",
    description: "Known as 'Little England', this misty highland retreat is the heart of Sri Lanka's tea industry."
  },
  {
    id: 5,
    name: "Sigiriya",
    image: "https://images.unsplash.com/photo-1616213791054-00155b93d08c?auto=format&fit=crop&q=80",
    description: "Witness the magnificent 'Lion Rock' fortress, an ancient marvel of engineering and art."
  },
  {
    id: 6,
    name: "Colombo",
    image: "https://images.unsplash.com/photo-1562916893-5ba2b00dc96e?auto=format&fit=crop&q=80",
    description: "The vibrant commercial capital, blending colonial architecture with modern skyscrapers and ocean walks."
  }
];

const DistrictList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredDistricts = districtsData.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full text-[#E5A600] text-sm font-bold mb-6">
            <Compass className="w-4 h-4" />
            START YOUR ADVENTURE
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Discover the Heart of <span className="text-[#006994]">Sri Lanka</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            From misty mountains to golden shores, explore the wonders of the pearl of the Indian Ocean.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by district (e.g. Kandy, Galle)..."
              className="w-full pl-16 pr-8 py-6 bg-white rounded-full shadow-2xl shadow-cyan-900/10 border-none focus:ring-4 focus:ring-[#006994]/20 text-lg transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 px-8 py-3 bg-[#006994] text-white rounded-full font-bold hover:bg-[#005a82] transition-colors shadow-lg">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 px-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Popular Districts</h2>
            <div className="w-20 h-1.5 bg-[#FFB800] rounded-full" />
          </div>
          <div className="text-gray-400 text-sm font-medium hidden md:block">
            Showing {filteredDistricts.length} results
          </div>
        </div>

        {filteredDistricts.length > 0 ? (
          <DistrictGrid
            districts={filteredDistricts}
            onSelectDistrict={(d) => navigate(`/district/${d.id}`)}
          />
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600">No districts found matching "{searchTerm}"</h3>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-[#006994] font-bold hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </section>

      <div className="h-40" />
    </div>
  );
};

export default DistrictList;