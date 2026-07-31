/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
