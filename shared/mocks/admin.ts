import type { AdminCompany } from "../types/admin";

export const adminCompaniesMock: AdminCompany[] = [
  {
    id: "ac1",
    name: "EcoRoute Partners",
    email: "company@example.com",
    phone: "+7 777 555 44 33",
    status: "verified",
    placesCount: 3,
  },
  {
    id: "ac2",
    name: "Green City Recycling",
    email: "green@example.com",
    phone: "+7 701 222 10 10",
    status: "pending",
    placesCount: 2,
  },
  {
    id: "ac3",
    name: "Recycle Hub Group",
    email: "hub@example.com",
    phone: "+7 705 900 12 12",
    status: "blocked",
    placesCount: 1,
  },
];
