import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DistrictList = () => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    // Sample data (in a real app, fetch from API)
    const sampleDistricts = [
      {
        id: 1,
        name: 'Wayanad',
        description: 'Beautiful hill station with wildlife sanctuaries',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 2,
        name: 'Alappuzha',
        description: 'Famous for houseboats and backwaters',
        image: 'https://images.unsplash.com/photo-1505765058505-cc0a9a1b14c7?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 3,
        name: 'Kochi',
        description: 'Commercial hub with historic significance',
        image: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1200&q=80'
      }
    ];
    setDistricts(sampleDistricts);
  }, []);

  return (
    <div className="page-container">
      {/* Hero */}
      <div className="relative rounded-lg overflow-hidden mb-8">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80"
          alt="Kerala landscape"
          className="w-full h-56 md:h-72 object-cover filter brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow">Explore Districts</h1>
            <p className="mt-2 text-lg md:text-xl opacity-90">Discover places, activities and local experiences</p>
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {districts.map(district => (
          <article key={district.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition">
            <div className="h-48 md:h-56 w-full">
              <img src={district.image} alt={district.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-2">{district.name}</h2>
              <p className="text-gray-600 mb-4">{district.description}</p>
              <div className="flex items-center justify-between">
                <Link to={`/district/${district.id}`} className="text-indigo-600 font-medium hover:underline">
                  Explore Places →
                </Link>
                <button className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">Save</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default DistrictList;