import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const DistrictDetail = () => {
  const { id } = useParams();
  const [places, setPlaces] = useState([]);
  const [district, setDistrict] = useState(null);

  useEffect(() => {
    // Sample data - replace with API calls in real app
    const sampleDistrict = {
      id: 1,
      name: 'Wayanad',
      description: 'Beautiful hill station with wildlife sanctuaries',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80'
    };

    const samplePlaces = [
      {
        id: 1,
        name: 'Banasura Sagar Dam',
        description: 'Largest earth dam in India',
        image: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 2,
        name: 'Edakkal Caves',
        description: 'Ancient cave with petroglyphs',
        image: 'https://images.unsplash.com/photo-1529676468690-0f98c1d9b0f3?auto=format&fit=crop&w=800&q=80'
      }
    ];

    setDistrict(sampleDistrict);
    setPlaces(samplePlaces);
  }, [id]);

  if (!district) return <div className="page-container">Loading...</div>;

  return (
    <div className="page-container">
      <div className="relative rounded-lg overflow-hidden mb-6">
        <img src={district.image} alt={district.name} className="w-full h-64 md:h-96 object-cover filter brightness-75" />
        <div className="absolute inset-0 flex items-center">
          <div className="text-white pl-6">
            <h1 className="text-4xl md:text-5xl font-extrabold">{district.name}</h1>
            <p className="mt-2 text-lg md:text-xl opacity-90">{district.description}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Popular Places</h2>
        <Link to="/" className="text-indigo-600 hover:underline">← Back to districts</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map(place => (
          <article key={place.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="h-44 w-full">
              <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
              <p className="text-gray-600 mb-4">{place.description}</p>
              <div className="flex items-center gap-3">
                <Link to={`/place/${place.id}`} className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">View Details</Link>
                <button onClick={() => console.log('Added to cart:', place.name)} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Add to Cart</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default DistrictDetail;