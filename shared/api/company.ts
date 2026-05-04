import { companyMock } from "../mocks/company";
import type { CompanyPlace, CompanyProfile } from "../types/company";

export async function getCompanyProfile(): Promise<CompanyProfile> {
  return companyMock;
}

export async function getCompanyPlaces(): Promise<CompanyPlace[]> {
  return companyMock.places;
}

export async function getCompanyPlaceById(
  id: string,
): Promise<CompanyPlace | null> {
  return companyMock.places.find((place) => place.id === id) ?? null;
}
