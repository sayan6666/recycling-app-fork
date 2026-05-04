export type CompanyPlace = {
  id: string;
  name: string;
  address: string;
  wasteTypes: string[];
  status: "active" | "draft";
  workHours: string;
};

export type CompanyProfile = {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  status: "verified" | "pending";
  placesCount: number;
  activePromotionsCount: number;
  places: CompanyPlace[];
};
