import { Service, VehicleType, ServiceType } from './types';

export const VEHICLE_TYPES: VehicleType[] = [
  VehicleType.Sedan,
  VehicleType.SUV,
];

export const SERVICES: Service[] = [
  { id: 1, name: ServiceType.Outside, price: 10, duration: 40 },
  { id: 2, name: ServiceType.InsideOut, price: 15, duration: 60 },
];

export const OPERATIONAL_HOURS = {
  start: 7 * 60, // 7:00 AM in minutes
  end: 15 * 60,  // 3:00 PM in minutes
};

export const TIME_SLOT_INTERVAL = 15; // check for availability every 15 minutes
export const BUFFER_TIME = 30; // 30 minutes buffer between appointments
