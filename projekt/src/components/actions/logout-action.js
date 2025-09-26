"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("sh_access_token");
  cookieStore.delete("sh_user_id");

  redirect("/");
}