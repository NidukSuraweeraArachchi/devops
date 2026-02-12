import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Save, X, Loader2, Image as ImageIcon, MapPin, Star } from 'lucide-react';
import Button from '../common/Button';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('districts');
    const [districts, setDistricts] = useState([]);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '', image: '' });
    const [placeFormData, setPlaceFormData] = useState({ name: '', description: '', image: '', location: '', rating: '', districtId: '' });
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const api = axios.create({
        baseURL: `${apiUrl}/api`,
        headers: { Authorization: `Bearer ${token}` }
    });

    useEffect(() => {
        fetchDistricts();
        fetchPlaces();
    }, []);

    const fetchDistricts = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/districts`);
            setDistricts(res.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch districts');
            setLoading(false);
        }
    };

    const fetchPlaces = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/places`);
            setPlaces(res.data);
        } catch (err) {
            console.error('Failed to fetch places');
        }
    };

    // ---- District CRUD ----
    const handleSaveDistrict = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/districts/${editingId}`, formData);
            } else {
                await api.post('/districts', formData);
            }
            fetchDistricts();
            resetForm();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save district');
        }
    };

    const handleDeleteDistrict = async (id) => {
        if (!window.confirm('Are you sure you want to delete this district? All its places will also be removed.')) return;
        try {
            await api.delete(`/districts/${id}`);
            fetchDistricts();
            fetchPlaces();
        } catch (err) {
            setError('Failed to delete district');
        }
    };

    const startEditDistrict = (district) => {
        setEditingId(district._id);
        setFormData({ name: district.name, description: district.description, image: district.image });
        setIsAdding(true);
    };

    // ---- Place CRUD ----
    const handleSavePlace = async (e) => {
        e.preventDefault();
        try {
            const data = { ...placeFormData, rating: parseFloat(placeFormData.rating) || 4.5 };
            if (editingId) {
                await api.put(`/places/${editingId}`, data);
            } else {
                await api.post('/places', data);
            }
            fetchPlaces();
            resetForm();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save place');
        }
    };

    const handleDeletePlace = async (id) => {
        if (!window.confirm('Are you sure you want to delete this place?')) return;
        try {
            await api.delete(`/places/${id}`);
            fetchPlaces();
        } catch (err) {
            setError('Failed to delete place');
        }
    };

    const startEditPlace = (place) => {
        setEditingId(place._id);
        setPlaceFormData({
            name: place.name,
            description: place.description,
            image: place.image || '',
            location: place.location || '',
            rating: place.rating?.toString() || '',
            districtId: place.districtId?._id || place.districtId || ''
        });
        setIsAdding(true);
    };

    const resetForm = () => {
        setIsAdding(false);
        setEditingId(null);
        setFormData({ name: '', description: '', image: '' });
        setPlaceFormData({ name: '', description: '', image: '', location: '', rating: '', districtId: '' });
        setError('');
    };

    const getDistrictName = (districtId) => {
        const id = districtId?._id || districtId;
        const d = districts.find(d => d._id === id);
        return d ? d.name : 'Unknown';
    };

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary w-12 h-12" /></div>;

    return (
        <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 mb-2">Admin Dashboard</h1>
                    <div className="w-20 h-1.5 bg-secondary rounded-full" />
                </div>
                {!isAdding && (
                    <Button onClick={() => setIsAdding(true)} variant="primary" className="flex items-center gap-2">
                        <Plus className="w-5 h-5" /> Add New {activeTab === 'districts' ? 'District' : 'Place'}
                    </Button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8">
                <button
                    onClick={() => { setActiveTab('districts'); resetForm(); }}
                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'districts' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Districts ({districts.length})
                </button>
                <button
                    onClick={() => { setActiveTab('places'); resetForm(); }}
                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'places' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                    <Star className="w-4 h-4 inline mr-2" />
                    Places ({places.length})
                </button>
            </div>

            {error && (
                <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex justify-between items-center">
                    <span>{error}</span>
                    <button onClick={() => setError('')}><X className="w-5 h-5" /></button>
                </div>
            )}

            {/* ============ DISTRICTS TAB ============ */}
            {activeTab === 'districts' && (
                <>
                    {isAdding && (
                        <div className="mb-12 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit District' : 'Add New District'}</h2>
                            <form onSubmit={handleSaveDistrict} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">District Name</label>
                                        <input type="text" required className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Ella" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Image URL</label>
                                        <input type="text" required className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20" placeholder="Unsplash image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Description</label>
                                    <textarea required rows="4" className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20" placeholder="Describe the district..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                                </div>
                                <div className="flex gap-4">
                                    <Button type="submit" variant="primary" className="px-10">
                                        <Save className="w-5 h-5 mr-2" /> {editingId ? 'Update' : 'Save'} District
                                    </Button>
                                    <Button onClick={resetForm} variant="outline">Cancel</Button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {districts.map((district) => (
                            <div key={district._id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                    {district.image ? (
                                        <img src={district.image} alt={district.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <ImageIcon className="w-12 h-12" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                        <button onClick={() => startEditDistrict(district)} className="p-2 bg-white/90 backdrop-blur rounded-lg text-primary hover:bg-white transition-colors shadow-lg">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDeleteDistrict(district._id)} className="p-2 bg-white/90 backdrop-blur rounded-lg text-red-500 hover:bg-white transition-colors shadow-lg">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-black text-gray-900 mb-2">{district.name}</h3>
                                    <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">{district.description}</p>
                                    <div className="mt-3 text-xs font-bold text-primary">
                                        {places.filter(p => (p.districtId?._id || p.districtId) === district._id).length} places
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* ============ PLACES TAB ============ */}
            {activeTab === 'places' && (
                <>
                    {isAdding && (
                        <div className="mb-12 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Place' : 'Add New Place'}</h2>
                            <form onSubmit={handleSavePlace} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Place Name</label>
                                        <input type="text" required className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Nine Arch Bridge" value={placeFormData.name} onChange={(e) => setPlaceFormData({ ...placeFormData, name: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">District</label>
                                        <select required className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20" value={placeFormData.districtId} onChange={(e) => setPlaceFormData({ ...placeFormData, districtId: e.target.value })}>
                                            <option value="">Select a district</option>
                                            {districts.map(d => (
                                                <option key={d._id} value={d._id}>{d.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Image URL</label>
                                        <input type="text" className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20" placeholder="Unsplash image URL" value={placeFormData.image} onChange={(e) => setPlaceFormData({ ...placeFormData, image: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Location</label>
                                        <input type="text" className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Kandy Town" value={placeFormData.location} onChange={(e) => setPlaceFormData({ ...placeFormData, location: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Rating (1-5)</label>
                                        <input type="number" min="1" max="5" step="0.1" className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20" placeholder="4.5" value={placeFormData.rating} onChange={(e) => setPlaceFormData({ ...placeFormData, rating: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Description</label>
                                    <textarea required rows="4" className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20" placeholder="Describe the place..." value={placeFormData.description} onChange={(e) => setPlaceFormData({ ...placeFormData, description: e.target.value })} />
                                </div>
                                <div className="flex gap-4">
                                    <Button type="submit" variant="primary" className="px-10">
                                        <Save className="w-5 h-5 mr-2" /> {editingId ? 'Update' : 'Save'} Place
                                    </Button>
                                    <Button onClick={resetForm} variant="outline">Cancel</Button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Filter by district */}
                    {districts.map(district => {
                        const districtPlaces = places.filter(p => (p.districtId?._id || p.districtId) === district._id);
                        if (districtPlaces.length === 0) return null;
                        return (
                            <div key={district._id} className="mb-12">
                                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                    <MapPin className="w-6 h-6 text-primary" />
                                    {district.name}
                                    <span className="text-sm font-medium text-gray-400">({districtPlaces.length} places)</span>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {districtPlaces.map(place => (
                                        <div key={place._id} className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 group hover:shadow-xl transition-all">
                                            <div className="relative h-40 overflow-hidden bg-gray-100">
                                                {place.image ? (
                                                    <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <ImageIcon className="w-10 h-10" />
                                                    </div>
                                                )}
                                                {place.rating && (
                                                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold">
                                                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                        {place.rating}
                                                    </div>
                                                )}
                                                <div className="absolute top-3 left-3 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                                    <button onClick={() => startEditPlace(place)} className="p-1.5 bg-white/90 backdrop-blur rounded-lg text-primary hover:bg-white shadow-lg">
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button onClick={() => handleDeletePlace(place._id)} className="p-1.5 bg-white/90 backdrop-blur rounded-lg text-red-500 hover:bg-white shadow-lg">
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-bold text-gray-900 mb-1">{place.name}</h4>
                                                {place.location && (
                                                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                                                        <MapPin className="w-3 h-3" />
                                                        {place.location}
                                                    </div>
                                                )}
                                                <p className="text-gray-500 text-xs line-clamp-2">{place.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {/* Places with no district or empty state */}
                    {places.length === 0 && (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 mb-20">
                            <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-600 mb-2">No Places Yet</h3>
                            <p className="text-gray-400 mb-6">Add places to your districts so visitors can explore them.</p>
                            <Button onClick={() => setIsAdding(true)} variant="primary">
                                <Plus className="w-5 h-5" /> Add First Place
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
