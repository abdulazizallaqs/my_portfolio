/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Friendly short links for each project, e.g. /math-heroes -> /projects/math-heroes
      { source: '/math-heroes', destination: '/projects/math-heroes', permanent: true },
      { source: '/student-helper', destination: '/projects/student-helper', permanent: true },
      { source: '/quran-app', destination: '/projects/quran-app', permanent: true },
      {
        source: '/tender-management-system',
        destination: '/projects/tender-management-system',
        permanent: true,
      },
      {
        source: '/ecommerce-data-pipeline',
        destination: '/projects/ecommerce-data-pipeline',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
