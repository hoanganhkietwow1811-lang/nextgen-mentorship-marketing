import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cấu hình cho phép ảnh từ các nguồn ngoài
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: '*.fbcdn.net',
      },
    ],
  },
  // --- QUAN TRỌNG: Tăng giới hạn upload lên 10MB ---
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;