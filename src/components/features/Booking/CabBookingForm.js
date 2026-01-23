import React, { useState } from 'react';
import { User, MapPin, Calendar, Clock, Loader2 } from 'lucide-react';
import Button from '../../common/Button';

const CabBookingForm = ({ destinationName, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        userName: '',
        pickupLocation: '',
        date: '',
        time: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.userName.trim()) newErrors.userName = 'Name is required';
        if (!formData.pickupLocation.trim()) newErrors.pickupLocation = 'Pickup location is required';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.time) newErrors.time = 'Time is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            await onSubmit({ ...formData, destination: destinationName });
        } catch (error) {
            console.error('Booking failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-100 mb-6">
                <p className="text-sm text-cyan-800">
                    Booking a cab to: <span className="font-bold">{destinationName}</span>
                </p>
            </div>

            <div className="space-y-4">
                {/* User Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                        <User className="w-4 h-4 text-[#006994]" /> Your Name
                    </label>
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 focus:ring-[#006994]/20 ${errors.userName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#006994]'
                            }`}
                    />
                    {errors.userName && <p className="mt-1 text-xs text-red-500 font-medium">{errors.userName}</p>}
                </div>

                {/* Pickup Location */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#006994]" /> Pickup Location
                    </label>
                    <input
                        type="text"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        placeholder="Hotel or Landmark"
                        className={`w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 focus:ring-[#006994]/20 ${errors.pickupLocation ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#006994]'
                            }`}
                    />
                    {errors.pickupLocation && <p className="mt-1 text-xs text-red-500 font-medium">{errors.pickupLocation}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Date */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#006994]" /> Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 focus:ring-[#006994]/20 ${errors.date ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#006994]'
                                }`}
                        />
                        {errors.date && <p className="mt-1 text-xs text-red-500 font-medium">{errors.date}</p>}
                    </div>

                    {/* Time */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#006994]" /> Time
                        </label>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 focus:ring-[#006994]/20 ${errors.time ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#006994]'
                                }`}
                        />
                        {errors.time && <p className="mt-1 text-xs text-red-500 font-medium">{errors.time}</p>}
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mt-8">
                <Button
                    variant="outline"
                    className="flex-1"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Confirm Booking'
                    )}
                </Button>
            </div>
        </form>
    );
};

export default CabBookingForm;
