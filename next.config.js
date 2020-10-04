const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  return {
    env: {
      API_URL: "https://zsr.octane.gg",
      REDIRECT_URI: (() => {
        return phase === PHASE_DEVELOPMENT_SERVER
          ? "http://localhost:3000"
          : "https://beta.octane.gg";
      })(),
    },
  };
};
