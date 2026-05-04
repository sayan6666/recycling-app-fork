import { adminCompaniesMock } from "../mocks/admin";
import type { AdminCompany } from "../types/admin";

export async function getAdminCompanies(): Promise<AdminCompany[]> {
  return adminCompaniesMock;
}
