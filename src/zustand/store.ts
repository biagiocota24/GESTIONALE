import { create } from "zustand";
import type { Guest, Reservation, Room, User } from "../interfaces/interfaces";
import { persist } from "zustand/middleware";
import { initialRooms } from "../data/mockData";

interface HotelStoreInterface {
  rooms: Room[];
  guests: Guest[];
  reservations: Reservation[];
  admins: User[];
  currentUser: Guest | null;
  //RESERVATIONS
  addReservation: (reservation: Reservation) => void;
  removeReservation: (reservation: Reservation) => void;
  updateReservation: (update: Reservation) => void;
  //ROOMS
  updateRoomState: (roomId: number, state: Room["roomState"]) => void;
  //GUESTS
  addGuest: (newGuest: Guest) => void;
  setCurrentUser: (user: Guest | null) => void;
  loadReservations: (reservation: Reservation[]) => void;
}

export const useHotelStore = create<HotelStoreInterface>()(
  persist(
    (set) => ({
      rooms: initialRooms,
      guests: [],
      reservations: [],
      admins: [],
      currentUser: null,

      addReservation: (newReservation: Reservation) =>
        set((state) => ({
          reservations: [...state.reservations, newReservation],
        })),
      removeReservation: (reservation: Reservation) =>
        set((state) => ({
          reservations: state.reservations.filter(
            (r) => r.id !== reservation.id,
          ),
        })),
      updateReservation: (updated: Reservation) =>
        set((state) => ({
          reservations: state.reservations.map((r) =>
            r.id === updated.id ? updated : r,
          ),
        })),
      updateRoomState: (roomId: number, state: Room["roomState"]) =>
        set((prevState) => ({
          rooms: prevState.rooms.map((r) =>
            r.id === roomId ? { ...r, roomState: state } : r,
          ),
        })),
      addGuest: (newGuest: Guest) =>
        set((state) => ({
          guests: [...state.guests, newGuest],
        })),
      setCurrentUser: (user) => set({ currentUser: user }),
      loadReservations: (newReservations: Reservation[]) =>
        set(() => ({ reservations: newReservations })),
    }),
    {
      name: "hotel-storage",
    },
  ),
);
