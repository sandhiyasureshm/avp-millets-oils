"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitInquiry(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    if (!name || !phone || !message) {
      return { success: false, error: "All fields are required." };
    }

    // Basic phone validation (can be adjusted based on needs)
    if (phone.length < 10) {
      return { success: false, error: "Please enter a valid phone number." };
    }

    await prisma.inquiry.create({
      data: {
        name,
        phone,
        message,
        status: "NEW",
      },
    });

    // Revalidate admin dashboard inquiry path if needed
    revalidatePath("/admin/inquiries");

    return { success: true, message: "Your message has been sent successfully. We will get back to you soon!" };
  } catch (error) {
    console.error("Failed to submit inquiry:", error);
    return { success: false, error: "Something went wrong. Please try again later or contact us via WhatsApp." };
  }
}
