export const initialRooms: Room[] = [
  {
    id: 1,
    roomNumber: "101",
    type: "single",
    price: 80,
    roomState: "free",
    floor: 1,
    description: "Cozy single room with garden view",
    capacity: 2,
  },
  {
    id: 2,
    roomNumber: "102",
    type: "single",
    price: 80,
    roomState: "free",
    floor: 1,
    description: "Cozy single room with garden view",
    capacity: 2,
  },
  {
    id: 3,
    roomNumber: "103",
    type: "double",
    price: 130,
    roomState: "free",
    floor: 1,
    description: "Spacious double room with balcony",
    capacity: 4,
  },
  {
    id: 4,
    roomNumber: "104",
    type: "double",
    price: 130,
    roomState: "free",
    floor: 1,
    description: "Spacious double room with balcony",
    capacity: 4,
  },
  {
    id: 5,
    roomNumber: "201",
    type: "double",
    price: 140,
    roomState: "free",
    floor: 2,
    description: "Double room with sea view",
    capacity: 4,
  },
  {
    id: 6,
    roomNumber: "202",
    type: "deluxe",
    price: 200,
    roomState: "free",
    floor: 2,
    description: "Deluxe room with jacuzzi and sea view",
    capacity: 6,
  },
  {
    id: 7,
    roomNumber: "203",
    type: "deluxe",
    price: 200,
    roomState: "free",
    floor: 2,
    description: "Deluxe room with private terrace",
    capacity: 5,
  },
  {
    id: 8,
    roomNumber: "204",
    type: "suite",
    price: 350,
    roomState: "free",
    floor: 2,
    description: "Luxury suite with panoramic view",
    capacity: 3,
  },
  {
    id: 9,
    roomNumber: "301",
    type: "suite",
    price: 350,
    roomState: "free",
    floor: 3,
    description: "Luxury suite with living room",
    capacity: 4,
  },
  {
    id: 10,
    roomNumber: "302",
    type: "suite",
    price: 400,
    roomState: "free",
    floor: 3,
    description: "Presidential suite with private terrace",
    capacity: 5,
  },
];

// src/data/mockReservations.ts
import type { Reservation } from "../interfaces/interfaces";

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomDate = (start: Date, end: Date) => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
  return date.toISOString().split("T")[0];
};

export const generateMockReservations = (
  guestIds: number[],
  roomIds: number[],
): Reservation[] => {
  return Array.from({ length: 50 }, (_, i) => {
    const checkIn = randomDate(new Date(), new Date("2027-12-01"));
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkIn);
    checkOutDate.setDate(checkInDate.getDate() + randomInt(1, 7));
    const checkOut = checkOutDate.toISOString().split("T")[0];

    return {
      id: Date.now() + i,
      guestId: guestIds[randomInt(0, guestIds.length - 1)],
      roomId: roomIds[randomInt(0, roomIds.length - 1)],
      checkIn,
      checkOut,
      reservationState: ["waiting", "confirmed", "cancelled"][randomInt(0, 2)],
      adults: randomInt(1, 3),
      kids: randomInt(0, 2),
      specialNotes: "",
      totalPrice: randomInt(100, 1000),
    };
  });
};
