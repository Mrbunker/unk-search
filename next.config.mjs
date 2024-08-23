/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.uniqlo.cn",
      },
    ],
  },
};

export default nextConfig;
