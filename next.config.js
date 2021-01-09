const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  return {
    env: {
      API_URL: (() =>
        phase === PHASE_DEVELOPMENT_SERVER ? 'http://localhost:8080' : 'https://zsr.octane.gg')(),
      CONTENT_URL: 'https://content.octane.gg',
      ASSETS_URL: 'https://griffon.octane.gg',
      REDIRECT_URI: (() =>
        phase === PHASE_DEVELOPMENT_SERVER ? 'http://localhost:3000' : 'https://beta.octane.gg')(),
    },
  }
}
