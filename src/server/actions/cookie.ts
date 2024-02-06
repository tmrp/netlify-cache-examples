"use server";

import { cookies } from "next/headers";

export async function getCookie(key: string) {
  return cookies().get(key);
}

export async function setCookie(key: string, value: string) {
  cookies().set({ httpOnly: true, name: key, value });
}
