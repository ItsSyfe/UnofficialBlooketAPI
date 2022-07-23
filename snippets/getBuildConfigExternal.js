const axios = require("axios");

async function getBuildConfigExternal() {
  const response = await axios
    .get("https://dashboard.blooket.com/api/config")
    .then((res) => res.data);
  const scripts = await response.match(/<script src=".{59,67}">/g).slice(1);

  return new Promise((resolve) => {
    scripts.forEach(async (script) => {
      const scriptContent = await axios
        .get(`https://dashboard.blooket.com/${script.split('"')[1]}`)
        .then((res) => res.data);
      if (
        /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(scriptContent) &&
        /\(new TextEncoder\)\.encode\("(.+?)"\)/.test(scriptContent)
      ) {
        resolve({
          buildId: scriptContent.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)[0],
          secret: scriptContent.match(
            /\(new TextEncoder\)\.encode\("(.+?)"\)/
          )[1],
        });
      }
    });
  });
}

/**
 * returns a promise that resolves with the build config while being external from a browser
 */
