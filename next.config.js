const { PHASE_TEST } = require("next/constants");

const {
  getAppVersion,
  getReleaseStage,
  RELEASE_STAGE_PRODUCTION,
} = require("./scripts/build/build_config_helpers");
const fetchConfig = require("./scripts/build/fetch_config");

// With this set up, "production" builds can only happen on Vercel.
// When we come to sort out a failover we may need to tweak this functionality.
// Defaults to "development".
const releaseStage = getReleaseStage(process.env.VERCEL_ENV);
const isProductionBuild = releaseStage === RELEASE_STAGE_PRODUCTION;

const appVersion = getAppVersion(isProductionBuild);
console.log(`Found app version: "${appVersion}"`);

// https://nextjs.org/docs/api-reference/next.config.js/introduction
module.exports = async (phase) => {
  /** @type {import('./scripts/build/fetch_config/config_types').OakConfig} */
  let oakConfig;

  // If we are in a test phase use the fake test config values.
  if (phase === PHASE_TEST) {
    oakConfig = await fetchConfig("oak.config.test.json");
  } else {
    oakConfig = await fetchConfig();
  }

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    env: {
      // Values calculated in this file.
      NEXT_PUBLIC_APP_VERSION: appVersion,
      NEXT_PUBLIC_RELEASE_STAGE: releaseStage,

      // Values read from the config file.

      // Firebase
      NEXT_PUBLIC_FIREBASE_API_HOST: oakConfig.firebase.apiHost,
      NEXT_PUBLIC_FIREBASE_API_KEY: oakConfig.firebase.apiKey,
      NEXT_PUBLIC_FIREBASE_APP_ID: oakConfig.firebase.appId,
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: oakConfig.firebase.authDomain,
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
        oakConfig.firebase.messagingSenderId,
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: oakConfig.firebase.projectId,
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: oakConfig.firebase.storageBucket,
      NEXT_PUBLIC_FIREBASE_TOKEN_API_HOST: oakConfig.firebase.tokenHost,

      // Hasura
      NEXT_PUBLIC_GRAPHQL_API_URL: oakConfig.hasura.graphqlApiUrl,

      // Oak
      NEXT_PUBLIC_CLIENT_APP_BASE_URL: process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : oakConfig.oak.appBaseUrl,
    },
  };

  // DEBUG
  console.log("Next config", nextConfig);

  return nextConfig;
};
