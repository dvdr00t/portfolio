/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'bestr.it',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'openbadges.bestr.it',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'media.licdn.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
