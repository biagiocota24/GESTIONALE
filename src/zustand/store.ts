import { create } from "zustand";
import type { Guest, Reservation, Room, User } from "../interfaces/interfaces";
import { persist } from "zustand/middleware";
import { initialRooms } from "../data/mockData";

interface HotelStoreIterface {
  rooms: Room[];
  guests: Guest[];
  reservations: Reservation[];
  registrati: Guest[];
  admins: User[];

  addReservation: (reservation: Reservation) => void;
  addGuest: (newGuest: Guest) => void;
}

export const useHotelStore = create<HotelStoreIterface>()(
  persist(
    (set) => ({
      rooms: initialRooms,
      guests: [],
      reservations: [],
      registrati: [],
      admins: [],

      addReservation: (newReservation: Reservation) =>
        set((state) => ({
          reservations: [...state.reservations, newReservation],
        })),
      addGuest: (newGuest: Guest) =>
        set((state) => ({
          guests: [...state.guests, newGuest],
        })),
    }),
    {
      name: "hotel-storage",
    },
  ),
);
