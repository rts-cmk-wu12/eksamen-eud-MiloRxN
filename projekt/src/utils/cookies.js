import { cookies } from "next/headers";

const cookieStore = await cookies()

export function readCookie(name = "") {
  const cookie = cookieStore.get(name);

  if (!cookie) return null;

  const value = cookie.value;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}