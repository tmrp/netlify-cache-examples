import type { Context, Config } from "@netlify/edge-functions";

export const config: Config = {
  cache: "manual",
  excludedPath: [
    "/.netlify/functions/*",
    "/_next/*",
    "/__nextjs_original-stack-frame",
  ],
  path: "/*",
};

export default async function EdgeCache(request: Request, context: Context) {
  const response = await context.next();

  const html = await response.text();

  return new Response(html, {
    headers: {
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Cdn-Cache-Control": "public, s-maxage=31536000, must-revalidate",
      "Content-Type": "text/html",
      "Netlify-Vary": "query",
    },
    status: 200,
  });
}
