export type AdminCompany = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "pending" | "verified" | "blocked";
  placesCount: number;
};
