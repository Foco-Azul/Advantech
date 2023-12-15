/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Desactiva la regla durante la construcción
  },
  images: {
    domains: ["admin.advantech.com.ec", "lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.advantech.com.ec",
        port: "",
        pathname: "/uploads/format_webp/**",
      },
    ],
  },
  
};



module.exports = nextConfig;


