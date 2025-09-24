
import { cookies } from "next/headers";

export async function readCookie(name = "") {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);

  if (!cookie) return null;

  const value = cookie.value;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}