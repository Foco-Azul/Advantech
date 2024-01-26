/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Desactiva la regla durante la construcción
  },
  images: {
    domains: ["dev.advantech.com.ec:1334", "lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev.advantech.com.ec:1334",
        port: "",
        pathname: "/uploads/format_webp/**",
      },
    ],
  },
  
};



module.exports = nextConfig;


