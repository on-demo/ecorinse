export enum VehicleType {
  Small = 'Small Car',
  Sedan = 'Sedan',
  SUV = 'SUV/Crossover',
  Minivan = 'Minivan',
}

export enum ServiceType {
  Outside = 'Outside Wash Only',
  InsideOut = 'Outside + Inside Wash',
}

export interface Service {
  id: number;
  name: ServiceType;
  price: number;
  duration: number; // in minutes
}

export interface Booking {
  id: number;
  clientName: string;
  bookingDate: string; // YYYY-MM-DD
  startTime: number; // minutes from midnight
  endTime: number; // minutes from midnight
  serviceId: number;
}

export type NewBooking = Omit<Booking, 'id' | 'endTime'>;
