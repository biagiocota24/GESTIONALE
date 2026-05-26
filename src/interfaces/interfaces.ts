export interface Room {
  id: number;
  roomNumber: string;
  type: "single" | "double" | "suite" | "deluxe";
  price: number;
  roomState: "free" | "occupied" | "cleaning" | "maintenance";
  floor: number;
  description: string;
  capacity: number;
}

export interface Guest {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
  nationality: string;
  docType: string;
  document: string;
}

export interface Reservation {
  id: number;
  guestId: number;
  roomId: number;
  checkIn: string;
  checkOut: string;
  reservationState: "confirmed" | "waiting" | "canceled" | "completed";
  kids: number;
  adults: number;
  specialNotes: string;
  totalPrice: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin";
  password: string;
}
