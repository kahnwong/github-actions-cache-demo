/** @type {import('next').NextConfig} */
const path = require('path')

const publicRuntimeConfig = {
  DOMAIN_NAME: process.env.DOMAIN_NAME || 'http://localhost:3000',
  SITE_URL: process.env.SITE_URL || 'https://prop2share.com',
  END_POINT: process.env.END_POINT || 'https://api-dev.prop2share.com/api',
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  HOTJAR_ID: process.env.HOTJAR_ID,
  COOKIE_WOW: process.env.COOKIE_WOW || 'false',
  COOKIE_WOW_DATA_CWCID:
    process.env.COOKIE_WOW_DATA_CWCID || 'TkaSthbcFjNYegmUm1oc5CE1',
  FIREBASE_API_KEY:
    process.env.FIREBASE_API_KEY || 'AIzaSyCxla6iWCE84ZWuICGiKD523DnoVKjLSac',
  FIREBASE_AUTH_DOMAIN:
    process.env.FIREBASE_AUTH_DOMAIN || 'prop2share.firebaseapp.com',
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || 'prop2share',
  FIREBASE_STORAGE_BUCKET:
    process.env.FIREBASE_STORAGE_BUCKET || 'prop2share.appspot.com',
  FIREBASE_SENDER_ID: process.env.FIREBASE_SENDER_ID || '540753951252',
  FIREBASE_APP_ID:
    process.env.FIREBASE_APP_ID || '1:540753951252:web:9d293dbc723d3963894501',
  COMPANY_NAME: process.env.COMPANY_NAME || 'Baania'
}

const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@company': path.resolve(
        __dirname,
        `company/${process.env.COMPANY_NAME || 'Baania'}`
      )
    }

    return config
  },
  rewrites: async () => [
    // {
    //   source: '/api/:path*',
    //   destination: `${
    //     process.env.URL_REWRITE_ENDPOINT || 'https://api-dev.prop2share.com'
    //   }/api/:path*`
    // },
    // {
    //   source: '/version',
    //   destination: `${
    //     process.env.URL_REWRITE_ENDPOINT || 'https://api-dev.prop2share.com'
    //   }/version`
    // },
    {
      source: '/a/:slug',
      destination: '/landing/:slug'
    }
  ],
  async redirects() {
    return [
      {
        source: '/landing/:slug',
        destination: '/',
        permanent: false
      }
    ]
  },
  reactStrictMode: true,
  pageExtensions: ['entry.tsx'],
  publicRuntimeConfig,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: [
      's3.ap-southeast-1.amazonaws.com',
      'cdn.baaniathailand.com',
      'cdn.baania.com',
      'baania-backend-dev.s3.ap-southeast-1.amazonaws.com',
      'platform-lookaside.fbsbx.com',
      'static.wixstatic.com',
      'lh3.googleusercontent.com',
      'cdn.baaniathailand.com.s3.ap-southeast-1.amazonaws.com',
      'document.jmtnetwork.co.th',
      'storage.googleapis.com',
      'cdn2.baaniathailand.com'
    ]
  }

  // typescript: {
  //   ignoreBuildErrors: true
  // },
  // eslint: {
  //   ignoreDuringBuilds: true
  // }
}

module.exports = nextConfig
