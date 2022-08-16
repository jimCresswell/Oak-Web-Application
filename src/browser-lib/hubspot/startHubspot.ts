/**
 * This implementation is not zero-rated so is only temporary.
 * Largely adapted from DavidWells/analytics plugin.
 *
 * @see: https://github.com/DavidWells/analytics/blob/master/packages/analytics-plugin-hubspot/src/browser.js
 */

import isBrowser from "../../utils/isBrowser";
import scriptAlreadyLoaded from "../../utils/scriptAlreadyLoaded";

if (isBrowser) {
  window._hsq = window._hsq || [];
}

const getScriptSrc = ({ scriptDomain, portalId }: HubspotConfig) => {
  const bustCache = Math.floor(new Date().getTime() / 3600000);
  const scriptLink = `https://${scriptDomain}/${portalId}.js`;
  const src = `${scriptLink}?${bustCache}`;

  return src;
};

export type HubspotConfig = {
  portalId: string;
  scriptDomain: string;
};
const startHubspot = (config: HubspotConfig) => {
  const { portalId, scriptDomain } = config;

  if (!portalId) {
    throw new Error("No hubspot portalId defined");
  }

  // NoOp if hubspot already loaded by external source
  if (scriptAlreadyLoaded(scriptDomain)) {
    return;
  }

  // Create script & append to DOM
  const script = document.createElement("script");
  script.id = "hs-script-loader";
  script.type = "text/javascript";
  script.async = true;
  script.src = getScriptSrc(config);

  // On next tick, inject the script
  setTimeout(() => {
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);
  }, 0);
};

export default startHubspot;