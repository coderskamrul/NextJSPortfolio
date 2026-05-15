/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    IS_PLUGIN_ROLE: process.env.IS_PLUGIN_ROLE,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
