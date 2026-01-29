import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Save, X, Loader2, Image as ImageIcon } from 'lucide-react';
import Button from '../common/Button';

const AdminDashboard = () => {
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '', image: '' });
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const api = axios.create({
        baseURL: `${apiUrl}/api`,
        headers: { Authorization: `Bearer ${token}` }
    });

    useEffect(() => {
        fetchDistricts();
    }, []);

    const fetchDistricts = async () => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const res = await axios.get(`${apiUrl}/api/districts`);
            setDistricts(res.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch districts');
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
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

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this district?')) return;
        try {
            await api.delete(`/districts/${id}`);
            fetchDistricts();
        } catch (err) {
            setError('Failed to delete district');
        }
    };

    const startEdit = (district) => {
        setEditingId(district._id);
        setFormData({ name: district.name, description: district.description, image: district.image });
        setIsAdding(true);
    };

    const resetForm = () => {
        setIsAdding(false);
        setEditingId(null);
        setFormData({ name: '', description: '', image: '' });
        setError('');
    };

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary w-12 h-12" /></div>;

    return (
        <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 mb-2">Admin Dashboard</h1>
                    <div className="w-20 h-1.5 bg-secondary rounded-full" />
                </div>
                {!isAdding && (
                    <Button onClick={() => setIsAdding(true)} variant="primary" className="flex items-center gap-2">
                        <Plus className="w-5 h-5" /> Add New District
                    </Button>
                )}
            </div>

            {error && (
                <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex justify-between items-center">
                    <span>{error}</span>
                    <button onClick={() => setError('')}><X className="w-5 h-5" /></button>
                </div>
            )}

            {isAdding && (
                <div className="mb-12 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit District' : 'Add New District'}</h2>
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">District Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="e.g. Ella"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Image URL</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="Unsplash image URL"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Description</label>
                            <textarea
                                required
                                rows="4"
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20"
                                placeholder="Describe the district..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
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
                                <button onClick={() => startEdit(district)} className="p-2 bg-white/90 backdrop-blur rounded-lg text-primary hover:bg-white transition-colors shadow-lg">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(district._id)} className="p-2 bg-white/90 backdrop-blur rounded-lg text-red-500 hover:bg-white transition-colors shadow-lg">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-black text-gray-900 mb-2">{district.name}</h3>
                            <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">{district.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
