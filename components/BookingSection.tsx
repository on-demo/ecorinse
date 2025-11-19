import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { VehicleType, Service, NewBooking } from '../types';
import { VEHICLE_TYPES, SERVICES } from '../constants';
import { LocationPinIcon } from './IconComponents';
import OtpModal from './OtpModal';
import ConfirmationModal from './ConfirmationModal';
import * as api from '../lib/api';

const Calendar = ({ selectedDate, setSelectedDate, unavailableDates, isLoading }: { selectedDate: Date | null, setSelectedDate: (date: Date) => void, unavailableDates: string[], isLoading: boolean }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const changeMonth = (offset: number) => {
        const newDate = new Date(currentYear, currentMonth + offset);
        setCurrentMonth(newDate.getMonth());
        setCurrentYear(newDate.getFullYear());
    };

    const isDateUnavailable = (date: Date) => {
        return date.getDay() === 0 || date < today || unavailableDates.includes(date.toISOString().split('T')[0]);
    };

    if (isLoading) {
        return (
            <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-center h-[268px]">
                <p>Loading calendar...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth(-1)} className="px-2 py-1 rounded hover:bg-gray-700">&lt;</button>
                <div className="font-bold">{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
                <button onClick={() => changeMonth(1)} className="px-2 py-1 rounded hover:bg-gray-700">&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day} className="font-semibold text-gray-400">{day}</div>)}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}
                {Array.from({ length: daysInMonth }).map((_, day) => {
                    const date = new Date(currentYear, currentMonth, day + 1);
                    const isUnavailable = isDateUnavailable(date);
                    const isSelected = selectedDate?.toDateString() === date.toDateString();

                    return (
                        <button
                            key={day}
                            disabled={isUnavailable}
                            onClick={() => setSelectedDate(date)}
                            className={`py-2 rounded-full transition-colors ${
                                isSelected ? 'bg-yellow-400 text-gray-900 font-bold' :
                                isUnavailable ? 'text-gray-600 cursor-not-allowed' : 'hover:bg-gray-700'
                            }`}
                        >
                            {day + 1}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};


const BookingSection: React.FC = () => {
    const [vehicleType, setVehicleType] = useState<VehicleType | ''>('');
    const [clientName, setClientName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [serviceId, setServiceId] = useState<number | null>(null);
    const [paymentPreference, setPaymentPreference] = useState<'Cash' | 'Card'>('Cash');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<number | null>(null);
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const [bookingDetails, setBookingDetails] = useState<NewBooking | null>(null);

    // API related state
    const [unavailableDates, setUnavailableDates] = useState<string[]>([]);
    const [availableSlots, setAvailableSlots] = useState<number[]>([]);
    const [calendarLoading, setCalendarLoading] = useState(true);
    const [slotsLoading, setSlotsLoading] = useState(false);


    const selectedService = useMemo(() => SERVICES.find(s => s.id === serviceId), [serviceId]);

    // Fetch unavailable dates on mount
    useEffect(() => {
        const fetchDates = async () => {
            setCalendarLoading(true);
            const dates = await api.getUnavailableDates();
            setUnavailableDates(dates);
            setCalendarLoading(false);
        };
        fetchDates();
    }, []);
    
    // Fetch available slots when date or service changes
    useEffect(() => {
        if (selectedDate && selectedService) {
            const fetchSlots = async () => {
                setSlotsLoading(true);
                setSelectedTime(null); // Reset time when dependencies change
                const slots = await api.getAvailableSlots(selectedDate, selectedService);
                setAvailableSlots(slots);
                setSlotsLoading(false);
            };
            fetchSlots();
        } else {
            setAvailableSlots([]);
        }
    }, [selectedDate, selectedService]);

    const handleUseCurrentLocation = () => {
        setLocationLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // In a real app, you'd use a geocoding service to convert lat/lng to an address.
                // For this demo, we'll just indicate that the location was fetched.
                setAddress(`Lat: ${position.coords.latitude.toFixed(4)}, Lon: ${position.coords.longitude.toFixed(4)} (Address would be here)`);
                setLocationLoading(false);
            },
            (error) => {
                alert('Could not get your location. Please enable permissions and try again.');
                setLocationLoading(false);
            }
        );
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation
        if (!vehicleType || !clientName || !phone || !address || !serviceId || !selectedDate || selectedTime === null) {
            alert('Please fill out all fields and select a date and time.');
            return;
        }

        const newBooking: NewBooking = {
            clientName,
            bookingDate: selectedDate.toISOString().split('T')[0],
            startTime: selectedTime,
            serviceId,
        };
        setBookingDetails(newBooking);
        setIsOtpModalOpen(true);
    };

    const handleOtpSuccess = async () => {
        if (!bookingDetails) return;
        
        try {
            await api.createBooking(bookingDetails);
            setIsOtpModalOpen(false);
            setIsConfirmationModalOpen(true);
            // Reset form
            setVehicleType('');
            setClientName('');
            setPhone('');
            setAddress('');
            setServiceId(null);
            setSelectedDate(null);
            setSelectedTime(null);
            setBookingDetails(null);
        } catch (error) {
            alert('Something went wrong with the booking. Please try again.');
        }
    };

    const formatTime = (minutes: number) => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        const ampm = h >= 12 ? 'PM' : 'AM';
        const formattedH = h % 12 === 0 ? 12 : h % 12;
        return `${formattedH}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    return (
        <section id="booking" className="py-20 bg-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center mb-12">Book Your Eco-Friendly Wash</h2>
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Column 1: Booking Details */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-lg font-semibold mb-2">1. Vehicle Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                {VEHICLE_TYPES.map(vt => (
                                    <button type="button" key={vt} onClick={() => setVehicleType(vt)} className={`p-3 rounded-lg text-left transition-colors ${vehicleType === vt ? 'bg-yellow-400 text-gray-900 font-bold' : 'bg-gray-700 hover:bg-gray-600'}`}>
                                        {vt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-2">2. Service Type</label>
                            <div className="space-y-2">
                                {SERVICES.map(s => (
                                    <button type="button" key={s.id} onClick={() => setServiceId(s.id)} className={`w-full p-3 rounded-lg text-left transition-colors flex justify-between items-center ${serviceId === s.id ? 'bg-yellow-400 text-gray-900 font-bold' : 'bg-gray-700 hover:bg-gray-600'}`}>
                                        <span>{s.name}</span>
                                        <span className="font-semibold">€{s.price}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="clientName" className="block text-lg font-semibold mb-2">3. Your Details</label>
                            <input type="text" id="clientName" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Your Name" className="w-full bg-gray-700 p-3 rounded-lg border border-transparent focus:ring-2 focus:ring-yellow-400 focus:outline-none" required/>
                            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" className="mt-2 w-full bg-gray-700 p-3 rounded-lg border border-transparent focus:ring-2 focus:ring-yellow-400 focus:outline-none" required/>
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-lg font-semibold mb-2">4. Address</label>
                             <div className="relative">
                                <input type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Service Address" className="w-full bg-gray-700 p-3 rounded-lg border border-transparent focus:ring-2 focus:ring-yellow-400 focus:outline-none" required/>
                                <button type="button" onClick={handleUseCurrentLocation} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-yellow-400" disabled={locationLoading}>
                                    <LocationPinIcon className="h-5 w-5"/>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-2">5. Payment Preference</label>
                            <div className="flex gap-2">
                                <button type="button" onClick={() => setPaymentPreference('Cash')} className={`flex-1 p-3 rounded-lg transition-colors ${paymentPreference === 'Cash' ? 'bg-yellow-400 text-gray-900 font-bold' : 'bg-gray-700 hover:bg-gray-600'}`}>Cash</button>
                                <button type="button" onClick={() => setPaymentPreference('Card')} className={`flex-1 p-3 rounded-lg transition-colors ${paymentPreference === 'Card' ? 'bg-yellow-400 text-gray-900 font-bold' : 'bg-gray-700 hover:bg-gray-600'}`}>Card</button>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">No upfront payment required. This helps us prepare.</p>
                        </div>
                    </div>
                    {/* Column 2: Date & Time */}
                    <div className="space-y-6">
                         <div>
                            <label className="block text-lg font-semibold mb-2">6. Select Date</label>
                            <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} unavailableDates={unavailableDates} isLoading={calendarLoading} />
                         </div>
                         <div>
                            <label className="block text-lg font-semibold mb-2">7. Select Time</label>
                            {selectedDate && serviceId ? (
                                slotsLoading ? (
                                    <div className="bg-gray-700 p-4 rounded-lg text-center">
                                        <p>Loading available times...</p>
                                    </div>
                                ) : availableSlots.length > 0 ? (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-60 overflow-y-auto pr-2">
                                        {availableSlots.map(slot => (
                                            <button type="button" key={slot} onClick={() => setSelectedTime(slot)} className={`p-3 rounded-lg transition-colors text-sm ${selectedTime === slot ? 'bg-yellow-400 text-gray-900 font-bold' : 'bg-gray-700 hover:bg-gray-600'}`}>
                                                {formatTime(slot)}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-gray-700 p-4 rounded-lg text-center">
                                      <p>We apologize, but there are no available slots for this day.</p>
                                      <p className="text-sm text-gray-400 mt-2">Our last booking begins before 2:45 PM. Please select another day or call us at (123) 456-7890 for urgent inquiries.</p>
                                    </div>
                                )
                            ) : (
                                <div className="bg-gray-700 p-4 rounded-lg text-center text-gray-400">
                                    Please select a service and date first.
                                </div>
                            )}
                        </div>
                        <button type="submit" className="w-full bg-yellow-400 text-gray-900 font-bold py-4 px-8 rounded-lg hover:bg-yellow-300 transition duration-300 text-xl shadow-lg">
                            Confirm & Book
                        </button>
                    </div>
                </form>
            </div>
            <OtpModal isOpen={isOtpModalOpen} onClose={() => setIsOtpModalOpen(false)} onSuccess={handleOtpSuccess} />
            <ConfirmationModal isOpen={isConfirmationModalOpen} onClose={() => setIsConfirmationModalOpen(false)} />
        </section>
    );
};

export default BookingSection;
