const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  switch (phase) {
    case PHASE_DEVELOPMENT_SERVER:
      return {
        publicRuntimeConfig: {
          API_KEY: 'LOCALAPIKEY',
        },
        env: {
          API_URL: 'http://localhost:8080',
          SEARCH_API_URL: 'http://localhost:8080',
          ADMIN_API_URL: 'http://localhost:8080',
          CONTENT_URL: 'https://content.octane.gg',
          ASSETS_URL: 'https://griffon.octane.gg',
          IDP_DOMAIN: 'auth.octane.gg',
          USER_POOL_ID: 'us-east-1_6FP8xPu3j',
          USER_POOL_CLIENT_ID: '751ef70870h0a5palie6eooqns',
          REDIRECT_SIGN_IN: 'http://localhost:3000/token',
          REDIRECT_SIGN_OUT: 'http://localhost:3000/',
          AUTH_COOKIE_DOMAIN: 'localhost',
          GOOGLE_ANALYTICS: 'G-76KQWXWMBV',
          AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
          AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        },
      }
    default:
      return {
        publicRuntimeConfig: {
          API_KEY: process.env.API_KEY,
        },
        env: {
          API_URL: 'https://zsr-internal.octane.gg',
          SEARCH_API_URL: 'https://zsr.octane.gg',
          ADMIN_API_URL: 'https://zsr.octane.gg',
          CONTENT_URL: 'https://content.octane.gg',
          ASSETS_URL: 'https://griffon.octane.gg',
          IDP_DOMAIN: 'auth.octane.gg',
          USER_POOL_ID: 'us-east-1_6FP8xPu3j',
          USER_POOL_CLIENT_ID: '6c7tl40so5gm6ro1hg5atcntdd',
          REDIRECT_SIGN_IN: 'https://www.octane.gg/token',
          REDIRECT_SIGN_OUT: 'https://www.octane.gg/',
          AUTH_COOKIE_DOMAIN: 'octane.gg',
          GOOGLE_ANALYTICS: 'G-76KQWXWMBV',
          AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
          AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        },
      }
  }
}
