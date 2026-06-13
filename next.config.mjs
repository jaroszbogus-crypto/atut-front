/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.0.20.63",
      },
    ],
  },
  // To odblokuje WebSockets (HMR) dla współpracowników w sieci lokalnej
  allowedDevOrigins: ["10.0.20.63:3000", "10.0.20.63"],
};
export default nextConfig;
