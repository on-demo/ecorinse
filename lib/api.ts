import { Booking, NewBooking, Service } from '../types';
import { OPERATIONAL_HOURS, BUFFER_TIME, TIME_SLOT_INTERVAL, SERVICES } from '../constants';

// --- In-memory database ---
const MOCK_BOOKINGS: Booking[] = [
  {
    id: 1,
    clientName: 'John Doe',
    bookingDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    startTime: 8 * 60, // 8:00 AM
    endTime: 9 * 60, // 9:00 AM
    serviceId: 2,
  },
  {
    id: 2,
    clientName: 'Jane Smith',
    bookingDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    startTime: 10 * 60, // 10:00 AM
    endTime: 10 * 60 + 40, // 10:40 AM
    serviceId: 1,
  },
  {
    id: 3,
    clientName: 'Peter Jones',
    bookingDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    startTime: 13 * 60, // 1:00 PM
    endTime: 14 * 60, // 2:00 PM
    serviceId: 2,
  },
];

// Dates in YYYY-MM-DD format
const MOCK_UNAVAILABLE_DATES: string[] = [
   new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0] // 3 days from now
];
// --- End of database ---


const simulateNetworkDelay = (delay: number = 500) => new Promise(res => setTimeout(res, delay));

export const getUnavailableDates = async (): Promise<string[]> => {
  await simulateNetworkDelay();
  return Promise.resolve([...MOCK_UNAVAILABLE_DATES]);
};

export const getAvailableSlots = async (date: Date, service: Service): Promise<number[]> => {
  await simulateNetworkDelay(800);
  
  const dateStr = date.toISOString().split('T')[0];
  const bookingsForDay = MOCK_BOOKINGS.filter(b => b.bookingDate === dateStr);
  const availableSlots: number[] = [];

  for (let t = OPERATIONAL_HOURS.start; t < OPERATIONAL_HOURS.end; t += TIME_SLOT_INTERVAL) {
      const slotStart = t;
      const slotEnd = t + service.duration;

      if (slotEnd > OPERATIONAL_HOURS.end) continue;
      
      const collision = bookingsForDay.some(booking => {
          const bookingStart = booking.startTime;
          // Add buffer time to the end of existing bookings to prevent back-to-back scheduling
          const bookingEndWithBuffer = booking.endTime + BUFFER_TIME;
          // Check for overlap
          return slotStart < bookingEndWithBuffer && slotEnd > bookingStart;
      });

      if (!collision) {
          availableSlots.push(slotStart);
      }
  }
  
  // Ensure the last possible start time allows the service to finish before the day ends.
  const lastPossibleStartTime = OPERATIONAL_HOURS.end - service.duration;
  return availableSlots.filter(slot => slot <= lastPossibleStartTime);
};

export const createBooking = async (newBookingData: NewBooking): Promise<Booking> => {
    await simulateNetworkDelay();
    
    const service = SERVICES.find(s => s.id === newBookingData.serviceId);
    if (!service) {
        return Promise.reject(new Error("Service not found"));
    }

    const newBooking: Booking = {
        ...newBookingData,
        id: Math.random(), // In a real DB, this would be auto-generated
        endTime: newBookingData.startTime + service.duration,
    };

    MOCK_BOOKINGS.push(newBooking);
    console.log("New booking added:", newBooking);
    console.log("All bookings:", MOCK_BOOKINGS);
    return Promise.resolve(newBooking);
}
