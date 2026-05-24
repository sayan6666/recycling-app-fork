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