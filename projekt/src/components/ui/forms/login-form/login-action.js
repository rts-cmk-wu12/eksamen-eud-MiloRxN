// Taget fra tidligere projekt.
"use server"
import { cookies } from "next/headers";
import z from "zod";

export default async function loginAction(prevState, formData){
  console.log(formData);
  const { username, password } = Object.fromEntries(formData);
  
  const schema = z.object({
    username: z.string().min(1, { message: "Du skal udfylde et brugernavn" }),
    password: z.string().min(1, { message: "Du skal udfylde en adgangskode" })
  })

  const validated = schema.safeParse({
    username, password
  })

  if (!validated.success) return {
    ...validated,
    ...z.treeifyError(validated.error),
    data: {
      username,
      password
    }
  }

  const response = await fetch(`${process.env.API_AUTH_URL}`, {
    method: "POST", 
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      username: validated.data.username,
      password: validated.data.password
    })
  })

  // guard clause
  if (!response.ok) return {
    success: false,
    errors: ["Forkert brugernavn eller adgangskode"],
    data: {
      username,
      password
    }
  }

  const json = await response.json();

  const cookieStore = await cookies()

  cookieStore.set({
    name: "ld_token",
    value: json.token,
  })

  cookieStore.set({
    name: "ld_userid",
    value: json.userId,
  })

  cookieStore.set({
    name: "ld_userrole",
    value: json.role,
  })

  // redirect("/")

  return {
    success: true,
    data: {
      username,
      password
    }
  }
}