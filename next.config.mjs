/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  // Lets you open the dev server (npm run dev) from another device on your
  // local network, e.g. testing on a phone while it runs on your PC.
  // Dev-only setting, has no effect in production.
  allowedDevOrigins: ["192.168.18.6"],
};

export default nextConfig;
