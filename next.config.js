const withPWA = require('next-pwa')

module.exports = withPWA({
  typescript: {
    ignoreBuildErrors: true
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  }
});
