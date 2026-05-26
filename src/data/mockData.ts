import type { User } from "../interfaces/interfaces";

export const aggiungiNelloStorage = (dove: string, cosa: unknown) => {
  const esistente = localStorage.getItem(dove);
  const array = esistente ? JSON.parse(esistente) : [];
  array.push(cosa);
  localStorage.setItem(dove, JSON.stringify(array));
};

export const users: User[] = [
  {
    id: 1,
    name: "Admin",
    email: "admin@hotel.com",
    role: "admin",
    password: "admin123",
  },
  {
    id: 2,
    name: "Mario Bianchi",
    email: "mario@hotel.com",
    role: "receptionist",
    password: "mario123",
  },
  {
    id: 3,
    name: "Laura Conti",
    email: "laura@hotel.com",
    role: "receptionist",
    password: "laura123",
  },
];


