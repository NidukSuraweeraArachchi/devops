const mongoose = require('mongoose');
require('dotenv').config();
const { District, Place } = require('./models');

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/travel_db';

const placesData = {
    'Kandy': [
        { name: 'Temple of the Tooth', rating: 4.8, location: 'Kandy Town', image: 'https://images.unsplash.com/photo-1586166898420-82c4c73b8df0?auto=format&fit=crop&w=800&q=80', description: 'Sri Dalada Maligawa is a Buddhist temple housing the sacred tooth relic of Lord Buddha, located in the royal palace complex.' },
        { name: 'Royal Botanical Gardens', rating: 4.6, location: 'Peradeniya', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', description: 'Renowned for its collection of orchids, the garden includes more than 4000 species of plants, including rare medicinal plants and spice trees.' },
        { name: 'Kandy Lake', rating: 4.5, location: 'Kandy City', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80', description: 'An artificial lake in the heart of Kandy, built in 1807 by the last king of Sri Lanka, surrounded by historic sites and peaceful walking paths.' }
    ],
    'Galle': [
        { name: 'Galle Dutch Fort', rating: 4.9, location: 'Galle Fort', image: 'https://images.unsplash.com/photo-1590123874657-cd1d7a5f8d6c?auto=format&fit=crop&w=800&q=80', description: 'A UNESCO World Heritage site, first built by the Portuguese in 1588, then extensively fortified by the Dutch.' },
        { name: 'Unawatuna Beach', rating: 4.7, location: 'Unawatuna', image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=800&q=80', description: 'A famous banana-shaped beach with calm turquoise waters, vibrant coral reefs, and a lively nightlife scene.' },
        { name: 'Japanese Peace Pagoda', rating: 4.6, location: 'Rumassala', image: 'https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=800&q=80', description: 'A beautiful white stupa perched on a hilltop offering panoramic views of Galle and the Indian Ocean.' }
    ],
    'Ella': [
        { name: 'Nine Arch Bridge', rating: 4.9, location: 'Demodara', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80', description: 'An iconic colonial-era railway bridge set among lush green tea plantations and misty mountains.' },
        { name: "Little Adam's Peak", rating: 4.7, location: 'Ella Town', image: 'https://images.unsplash.com/photo-1546587348-d12660c30c50?auto=format&fit=crop&w=800&q=80', description: 'A moderate hike offering breathtaking panoramic views of Ella Gap, surrounding tea estates, and the southern coast.' },
        { name: 'Ravana Falls', rating: 4.5, location: 'Ella-Wellawaya Road', image: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba8b24?auto=format&fit=crop&w=800&q=80', description: 'A stunning 25-meter waterfall connected to the legend of King Ravana. A popular stop for visitors.' }
    ],
    'Nuwara Eliya': [
        { name: 'Gregory Lake', rating: 4.6, location: 'Nuwara Eliya Town', image: 'https://images.unsplash.com/photo-1566296440209-54e44a3b7166?auto=format&fit=crop&w=800&q=80', description: 'A picturesque lake surrounded by lush greenery, offering boat rides, pony rides, and a scenic walking path.' },
        { name: 'Horton Plains', rating: 4.8, location: 'Ohiya', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80', description: "A UNESCO World Heritage Site featuring World's End, a sheer cliff with a 4,000-foot drop." },
        { name: 'Pedro Tea Estate', rating: 4.5, location: 'Kandapola', image: 'https://images.unsplash.com/photo-1582126892906-5ba118eaf46e?auto=format&fit=crop&w=800&q=80', description: "One of the oldest tea factories in Sri Lanka, offering guided tours and tastings of the world's finest Ceylon tea." }
    ],
    'Sigiriya': [
        { name: 'Sigiriya Rock Fortress', rating: 4.9, location: 'Sigiriya', image: 'https://images.unsplash.com/photo-1588598198062-e2a6e6615b6d?auto=format&fit=crop&w=800&q=80', description: 'An ancient rock fortress and UNESCO World Heritage Site rising 200 meters above the jungle.' },
        { name: 'Pidurangala Rock', rating: 4.7, location: 'Pidurangala', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80', description: 'A massive rock formation offering the best panoramic views of Sigiriya Rock.' },
        { name: 'Minneriya National Park', rating: 4.6, location: 'Minneriya', image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=800&q=80', description: "Famous for 'The Gathering' — one of the largest wild elephant gatherings in Asia." }
    ],
    'Colombo': [
        { name: 'Gangaramaya Temple', rating: 4.7, location: 'Slave Island', image: 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?auto=format&fit=crop&w=800&q=80', description: 'One of the most important temples in Colombo, blending modern architecture with cultural essence.' },
        { name: 'Galle Face Green', rating: 4.5, location: 'Colombo 03', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', description: 'A 5-hectare oceanfront urban park. Perfect for sunset walks, street food, and kite flying.' },
        { name: 'National Museum', rating: 4.6, location: 'Colombo 07', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80', description: "The largest museum in Sri Lanka, showcasing the country's rich history with over 100,000 artifacts." }
    ]
};

async function seed() {
    try {
        await mongoose.connect(mongoUrl);
        console.log('Connected to MongoDB');

        const districts = await District.find();
        if (districts.length === 0) {
            console.log('No districts found in DB. Please add districts first via the admin panel.');
            process.exit(1);
        }

        // Clear existing places
        await Place.deleteMany({});
        console.log('Cleared existing places');

        let totalPlaces = 0;
        for (const district of districts) {
            const places = placesData[district.name];
            if (places) {
                const placeDocs = places.map(p => ({ ...p, districtId: district._id }));
                await Place.insertMany(placeDocs);
                totalPlaces += placeDocs.length;
                console.log(`  Added ${placeDocs.length} places for ${district.name}`);
            } else {
                console.log(`  No seed data for district: ${district.name}`);
            }
        }

        console.log(`\nDone! Seeded ${totalPlaces} places across ${districts.length} districts.`);
        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
}

seed();
