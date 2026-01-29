import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Compass, Loader2, Sparkles, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import DistrictGrid from './features/Discovery/DistrictGrid';
import axios from 'axios';

const districtsData = [
  {
    id: 1,
    name: "Kandy",
    image: "https://images.unsplash.com/photo-1586166898420-82c4c73b8df0?auto=format&fit=crop&w=800&q=80",
    description: "The cultural capital of Sri Lanka, home to the Temple of the Sacred Tooth Relic and beautiful botanical gardens."
  },
  {
    id: 2,
    name: "Galle",
    image: "https://images.unsplash.com/photo-1590123874657-cd1d7a5f8d6c?auto=format&fit=crop&w=800&q=80",
    description: "A coastal gem known for its colonial charm, Dutch Fort, and stunning Indian Ocean views."
  },
  {
    id: 3,
    name: "Ella",
    image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80",
    description: "A mountain paradise famous for Nine Arch Bridge, Little Adam's Peak, and rolling tea estates."
  },
  {
    id: 4,
    name: "Nuwara Eliya",
    image: "https://images.unsplash.com/photo-1566296440209-54e44a3b7166?auto=format&fit=crop&w=800&q=80",
    description: "Known as 'Little England', this misty highland retreat is the heart of Sri Lanka's tea industry."
  },
  {
    id: 5,
    name: "Sigiriya",
    image: "https://images.unsplash.com/photo-1588598198062-e2a6e6615b6d?auto=format&fit=crop&w=800&q=80",
    description: "Witness the magnificent 'Lion Rock' fortress, an ancient marvel of engineering and art."
  },
  {
    id: 6,
    name: "Colombo",
    image: "https://images.unsplash.com/photo-1578469645742-46cae010e5d4?auto=format&fit=crop&w=800&q=80",
    description: "The vibrant commercial capital, blending colonial architecture with modern skyscrapers and ocean walks."
  }
];

const DistrictList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${apiUrl}/api/districts`);
        if (res.data && res.data.length > 0) {
          setDistricts(res.data);
        } else {
          setDistricts(districtsData);
        }
      } catch (err) {
        console.error("Failed to fetch districts, using fallback data");
        setDistricts(districtsData);
      } finally {
        setLoading(false);
      }
    };
    fetchDistricts();
  }, []);

  const filteredDistricts = districts.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-4 mb-16">
        {/* Background Decorations */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-cyan-50/50 to-yellow-50/50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-secondary/20 to-orange-100 rounded-full text-secondary-dark text-sm font-bold mb-8 border border-secondary/20"
          >
            <Compass className="w-4 h-4" />
            START YOUR ADVENTURE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 leading-[0.9] tracking-tight"
          >
            Discover the Heart of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-600 to-primary">
              Sri Lanka
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            From misty mountains to golden shores, explore the wonders of the{' '}
            <span className="text-gray-700 font-semibold">pearl of the Indian Ocean</span>.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by district (e.g. Kandy, Galle, Ella)..."
              className="w-full pl-16 pr-40 py-6 bg-white rounded-full shadow-2xl shadow-gray-200/50 border-2 border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 text-lg transition-all hover:shadow-3xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3.5 bg-gradient-to-r from-primary to-cyan-600 text-white rounded-full font-bold hover:from-primary-dark hover:to-cyan-700 transition-all shadow-lg shadow-primary/30 flex items-center gap-2">
              Search <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-12"
          >
            <div className="flex items-center gap-2 text-gray-500">
              <Globe className="w-5 h-5 text-primary" />
              <span className="font-medium">25+ Districts</span>
            </div>
            <div className="h-5 w-px bg-gray-200" />
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="w-5 h-5 text-secondary" />
              <span className="font-medium">150+ Destinations</span>
            </div>
            <div className="h-5 w-px bg-gray-200" />
            <div className="flex items-center gap-2 text-gray-500">
              <Sparkles className="w-5 h-5 text-rose-500" />
              <span className="font-medium">10K+ Happy Travelers</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-end justify-between mb-12 px-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-secondary" />
              <span className="text-secondary font-black text-sm tracking-widest uppercase">Explore</span>
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-2">Popular Districts</h2>
            <p className="text-gray-500">Discover the most visited destinations in Sri Lanka</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-gray-400 text-sm font-medium bg-gray-50 px-4 py-2 rounded-full">
            <span>Showing</span>
            <span className="text-primary font-bold">{filteredDistricts.length}</span>
            <span>results</span>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary w-12 h-12 mb-4" />
            <p className="text-gray-400 font-medium">Fetching amazing destinations...</p>
          </div>
        ) : filteredDistricts.length > 0 ? (
          <DistrictGrid
            districts={filteredDistricts}
            onSelectDistrict={(d) => navigate(`/district/${d._id || d.id}`)}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-gradient-to-br from-gray-50 to-white rounded-[2rem] border-2 border-dashed border-gray-200 mx-4"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <MapPin className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No districts found</h3>
            <p className="text-gray-400 mb-6">No results matching "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-colors shadow-lg"
            >
              Clear search
            </button>
          </motion.div>
        )}
      </section>

      <div className="h-20" />
    </div>
  );
};

export default DistrictList;