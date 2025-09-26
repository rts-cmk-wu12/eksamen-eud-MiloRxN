"use server"

import { redirect } from "next/navigation";
import z, { success } from "zod";

export default async function registerAction(prevState, formData) {
  const { firstname, lastname, email, password } = Object.fromEntries(formData);

  const schema = z.object({
    firstname: z.string().min(1, "First name required"),
    lastname: z.string().min(1, "Last name required"),
    email: z.email("Invalid email address"),
    password: z.string().min(1, "Password required")
  })

  const validated = schema.safeParse({ firstname, lastname, email, password });

  if (!validated.success) return {
    ...validated,
    ...(z.treeifyError(validated.error)),
    data: { firstname, lastname, email, password }
  };

  const response = await fetch("http://localhost:4000/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstname: validated.data.firstname,
      lastname: validated.data.lastname,
      email: validated.data.email,
      password: validated.data.password
    })
  })

  if (response.status === 409) return {
    success: false,
    properties: {
      email: { errors: "Email is already in use." }
    },
    data: validated.data
  }

  if (!response.ok) return {
    success: false,
    errors: ["Account could not be created. Please try again later."],
    data: validated.data
  }

  redirect("/login")
}