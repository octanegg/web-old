const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  return {
    env: {
      API_URL: (() => {
        return phase === PHASE_DEVELOPMENT_SERVER
          ? "http://localhost:8080"
          : "https://zsr-core.octane.gg";
      })(),
    },
  };
};
