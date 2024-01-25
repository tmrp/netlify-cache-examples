import type { Context, Config } from "@netlify/edge-functions";

export const config: Config = {
  cache: "manual",
  excludedPath: [
    "/.netlify/functions/*",
    "/_next/*",
    "/__nextjs_original-stack-frame",
    "/_ipx/*",
    "/favicon.ico",
  ],
  path: "/cookie",
};

export default async function EdgeCookieCache(
  request: Request,
  context: Context,
) {
  const response = await context.next();

  const html = await response.text();

  return new Response(html, {
    headers: {
      "Cache-Control": "public, max-age=300",
      "Cdn-Cache-Control": "public, max-age=300",
      "Content-Type": "text/html",
      "Netlify-Cache-Control": "public, max-age=300",
      "Netlify-Vary": "cookie=one|two",
    },
    status: 200,
  });
}
