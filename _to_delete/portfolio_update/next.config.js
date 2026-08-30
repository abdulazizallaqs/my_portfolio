/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Skill icons are remote SVGs served from the devicon CDN.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
    ],
  },
}

module.exports = nextConfig
