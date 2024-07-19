/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'qyu3h57rhdymwauz.public.blob.vercel-storage.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '3000',
          pathname: '/**',
        },
      ],
  },
};

export default nextConfig;
