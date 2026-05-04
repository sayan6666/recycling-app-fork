import { profileMock } from "../mocks/profile";
import type { UserProfile } from "../types/profile";

export async function getUserProfile(): Promise<UserProfile> {
  return profileMock;
}
