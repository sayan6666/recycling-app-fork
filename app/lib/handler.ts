"use server";
import { openDb } from "../opendb";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import { getCompany, getPoints } from "./actions";

const regSchema = z.object({
  name: z.string().min(1, { message: "name" }),
  surname: z.string().min(1, { message: "surname" }),
  email: z.string().email({ message: "email" }),
  password: z.string().min(1, { message: "password" }),
  password_repeat: z.string().min(1, { message: "password_repeat" }),
});

export async function handleRegistration(prevstate: any, formData: FormData) {
  const data = Object.fromEntries(formData);
  const validatedData = regSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      errors: {
        name: validatedData.error.flatten().fieldErrors?.name,
        surname: validatedData.error.flatten().fieldErrors?.surname,
        email: validatedData.error.flatten().fieldErrors?.email,
        password: validatedData.error.flatten().fieldErrors?.password,
        password_repeat:
          validatedData.error.flatten().fieldErrors?.password_repeat,
      },
    };
  }
  const db = await openDb();
  const users = await db.all("SELECT * FROM users");
  for (let i = 0; i < users.length; i++) {
    if (users[i]["email"] == validatedData.data.email) {
      return {
        errors: {
          name: "none",
          surname: "none",
          email: "taken",
          password: "none",
          password_repeat: "none",
        },
      };
    }
  }
  if (validatedData.data.password != validatedData.data.password_repeat) {
    return {
      errors: {
        name: "none",
        surname: "none",
        email: "none",
        password: "unmatch",
        password_repeat: "unmatch",
      },
    };
  }
  await db.run("INSERT INTO users (name,email,password) VALUES (?, ?, ?)", [
    validatedData.data.name + " " + validatedData.data.surname,
    validatedData.data.email,
    validatedData.data.password,
  ]);
  const expires = new Date(Date.now() + 10 * 100000);
  const cookieStore = await cookies();
  const user = await db.get(
    "SELECT * FROM users WHERE email=?",
    validatedData.data.email,
  );
  cookieStore.set("session", user["email"] + "_user", {
    expires,
    httpOnly: true,
  });
  await db.close();
  redirect("/profile");
  return;
  {
    success: "ok";
  }
}

const logSchema = z.object({
  email: z.string().email({ message: "email" }),
  password: z.string().min(1, { message: "password" }),
});

export async function handleLogin(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData);
  const validatedData = logSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      errors: {
        email: validatedData.error.flatten().fieldErrors?.email,
        password: validatedData.error.flatten().fieldErrors?.password,
      },
    };
  }
  const db = await openDb();
  const admins = await db.get(
    "SELECT * FROM admins WHERE email=?",
    validatedData.data.email,
  );
  const users = await db.get(
    "SELECT * FROM users WHERE email=?",
    validatedData.data.email,
  );
  const companies = await db.get(
    "SELECT * FROM companies WHERE email=?",
    validatedData.data.email,
  );
  if (admins) {
    if (admins["password"] == validatedData.data.password) {
      const expires = new Date(Date.now() + 10 * 100000);
      const cookieStore = await cookies();
      cookieStore.set("session", admins["email"] + "_admin", {
        expires,
        httpOnly: true,
      });
      await db.close();
      redirect("/");
    }
  }
  if (users) {
    if (users["password"] == validatedData.data.password) {
      const expires = new Date(Date.now() + 10 * 100000);
      const cookieStore = await cookies();
      cookieStore.set("session", users["email"] + "_user", {
        expires,
        httpOnly: true,
      });
      await db.close();
      redirect("/");
    }
  }
  if (companies) {
    if (companies["password"] == validatedData.data.password) {
      const expires = new Date(Date.now() + 10 * 100000);
      const cookieStore = await cookies();
      cookieStore.set("session", companies["email"] + "_company", {
        expires,
        httpOnly: true,
      });
      await db.close();
      redirect("/");
    }
  }
  return;
  {
    success: "ok";
  }
}

const pointSchema = z.object({
    x: z.coerce.number(),
    y: z.coerce.number(),
    type: z.string(),
    name: z.string(),
    adress: z.string(),
    workhours: z.string(),
    status: z.string()
});

export async function handlePointAdding(prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData);
    const validatedData = pointSchema.safeParse(data);
    if (!validatedData.success) {
        return {
            error: "error"
        }
    }
    const db = await openDb();
    const company = await getCompany();
    if (company) {
    await db.run("INSERT INTO points(x,y,type,company_id,name,adress,contacts,workhours,description,status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [validatedData.data.x, validatedData.data.y, validatedData.data.type,
    company[0]["id"], validatedData.data.name, validatedData.data.adress,
        "+7", validatedData.data.workhours, "", validatedData.data.status]);
    await db.close;
    }
}

const pointSchema2 = z.object({
    id: z.coerce.number(),
    x: z.coerce.number(),
    y: z.coerce.number(),
    type: z.string(),
    name: z.string(),
    adress: z.string(),
    workhours: z.string(),
    status: z.string()
});

export async function handlePointChange(prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData);
    const validatedData = pointSchema2.safeParse(data);
    if (!validatedData.success) {
        return {
            error: "error"
        }
    }
    const db = await openDb();
    await db.run("UPDATE points SET x=?, y=?, type=?, name=?, adress=?, workhours=?, status=? WHERE id=?", [validatedData.data.x, validatedData.data.y, validatedData.data.type,
        validatedData.data.name, validatedData.data.adress, validatedData.data.workhours, validatedData.data.status, validatedData.data.id]);
    await db.close();
    redirect("/company/places");
}

const profileSchema = z.object({
    email: z.string(),
    password: z.string(),
    surname: z.string(),
    name: z.string(),
});

export async function handleSettingChange(prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData);
    const validatedData = profileSchema.safeParse(data);
    if (!validatedData.success) {
        return {
            error: "error"
        }
    }
    const prev_email = validatedData.data.email;
    const db = await openDb();
    await db.run("UPDATE users SET name=?, surname=?, email=?, password=? WHERE email=?", [validatedData.data.name, validatedData.data.surname, validatedData.data.email, validatedData.data.password, prev_email]);
    await db.close();
    redirect("/profile");
}

const profileSchema2 = z.object({
    recycled: z.coerce.number(),
    visited: z.coerce.number(),
    reminders: z.coerce.number(),
    email: z.string(),
});

export async function handleEdit(prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData);
    const validatedData = profileSchema2.safeParse(data);
    if (!validatedData.success) {
        return {
            error: "error"
        }
    }
    const db = await openDb();
    await db.run("UPDATE users SET recycled=?, visited=?, reminders=? WHERE email=?", [validatedData.data.recycled, validatedData.data.visited, validatedData.data.reminders, validatedData.data.email]);
    await db.close();
    redirect("/profile");
}
