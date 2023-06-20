/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["saas.focoazul.com", "lh3.googleusercontent.com"],
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
