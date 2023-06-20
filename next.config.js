/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "saas.focoazul.com",
        port: "",
        pathname: "/uploads/format_webp/**",
      },
    ],
  },
};

module.exports = nextConfig;
