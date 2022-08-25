import { merge } from "lodash/fp";

import { WindowOakThemes } from "../../hooks/useOakTheme";
import isBrowser from "../../utils/isBrowser";
import { WindowOakHubspot } from "../hubspot/startHubspot";

type OakGlobals = {
  oakThemes?: WindowOakThemes;
  hubspot?: WindowOakHubspot;
};

declare global {
  interface Window {
    __oakGlobals: OakGlobals;
  }
}

if (isBrowser) {
  window.__oakGlobals = window.__oakGlobals || {};
}

export const getOakGlobals = () => {
  if (isBrowser) {
    return window.__oakGlobals;
  }
  return {};
};
export const setOakGlobals = (value: Partial<OakGlobals>) => {
  if (isBrowser) {
    window.__oakGlobals = merge(getOakGlobals(), value);
  }
};
