import type { CompanyProfile } from "../types/company";

export const companyMock: CompanyProfile = {
  id: "c1",
  companyName: "EcoRoute Partners",
  email: "company@example.com",
  phone: "+7 777 555 44 33",
  status: "verified",
  placesCount: 3,
  activePromotionsCount: 1,
  places: [
    {
      id: "cp1",
      name: "ЭкоПункт Центральный",
      address: "ул. Абая, 10",
      wasteTypes: ["plastic", "paper", "glass"],
      status: "active",
      workHours: "09:00–18:00",
    },
    {
      id: "cp2",
      name: "GreenDrop East",
      address: "пр. Назарбаева, 52",
      wasteTypes: ["metal", "electronics"],
      status: "active",
      workHours: "10:00–19:00",
    },
    {
      id: "cp3",
      name: "Draft Point",
      address: "ул. Сатпаева, 88",
      wasteTypes: ["paper"],
      status: "draft",
      workHours: "Не указано",
    },
  ],
};
