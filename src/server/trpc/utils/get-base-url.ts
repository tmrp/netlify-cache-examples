"use client";

import { apiReact } from "../client/trpc-client-provider";

export function getBaseUrl() {
  if (typeof window !== "undefined") return "";

  const origin = apiReact.next.getOrigin.useQuery();

  return origin.data;
}
