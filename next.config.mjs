/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pokemonctg.io',
      },
      {
        protocol: 'https',
        hostname: 'pokemonctg.io',
      },
    ],
  },
};

export default nextConfig;
