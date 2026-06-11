"use server";

import { prisma } from "@/lib/db";
import * as bcrypt from "bcryptjs";
import { encrypt } from "./session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return { error: "Invalid email or password." };
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return { error: "Invalid email or password." };
    }

    // Create session
    const sessionPayload = {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    };

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
    const session = await encrypt(sessionPayload);

    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/admin/login");
}
