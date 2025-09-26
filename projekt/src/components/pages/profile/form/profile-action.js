"use server";
import { readCookie } from "@/utils/async/cookies";
import { revalidatePath } from "next/cache";
import z from "zod";

export default async function profileAction(prevState, formData) {
  const { firstname, lastname, email, password } = Object.fromEntries(formData);

  const schema = z.object({
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    email: z.email({ message: "Invalid email" }),
    password: z.string().min(1, { message: "Password is required" })
  });

  const validated = schema.safeParse({ firstname, lastname, email, password: password?.trim() });

  if (!validated.success) {
    return {
      ...validated,
      ...(z.treeifyError(validated.error)),
      data: { firstname, lastname, email, password }
    };
  }

  const accessToken = await readCookie("sh_access_token");
  const userId = await readCookie("sh_user_id");

  if (!accessToken || !userId) {
    return {
      success: false,
      errors: ["Authentication error. Please log in again."],
      data: validated.data
    };
  }

  const response = await fetch(`http://localhost:4000/api/v1/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      firstname: validated.data.firstname,
      lastname: validated.data.lastname,
      email: validated.data.email,
      password: validated.data.password
    })
  });

  if (!response.ok) {
    return {
      success: false,
      errors: ["Could not update profile. Try again later."]
    };
  }

  revalidatePath("localhost:3000/profile");

  return {
    success: true,
    message: "Successfully updated profile!"
  };
}
