"use server"
import { openDb } from "../opendb";
import { cookies } from "next/headers"
import { UserProfile } from "@/shared/types"

export async function getPoints() {
    const db = await openDb();
    const points = await db.all("SELECT * FROM points");
    return points;
}

export async function getSession() {
    const nextCookies = await cookies();
    const session = nextCookies.get("session")?.value;
    return session ? session : null;
}

export async function getProfile() {
    const sessionType = await getSession();
    const db = await openDb();
    let profile = null;
    if (sessionType != null) {
        profile = await db.all("SELECT name, email FROM " + sessionType.split("_")[1] + "s WHERE email=?", sessionType.split("_")[0]);
    }
    return profile;
}

export async function getCompanySession() {
    const nextCookies = await cookies();
    const companySession = nextCookies.get("companySession")?.value;
    return companySession ? companySession : null;
}

export async function getCompany() {
    const companySession = await getCompanySession();
    const db = await openDb();
    let company = null;
    if (companySession != null) {
        company = await db.all("SELECT * FROM companies WHERE email=?", companySession);
    }
    return company;
}