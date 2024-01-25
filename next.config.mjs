/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "default",
    remotePatterns: [
      {
        hostname: "images.pokemontcg.io",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
