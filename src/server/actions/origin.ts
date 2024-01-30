"use server";

import { headers } from "next/headers";

export async function getOrigin() {
  const headersList = headers();

  const origin = headersList.get("host");
  return origin;
}
