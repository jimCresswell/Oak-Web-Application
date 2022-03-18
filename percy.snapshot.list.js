/**
 * Generate a list of snapshot configs for use with `percy snapshot`
 * https://docs.percy.io/docs/percy-snapshot#configuration
 */
const baseUrl = process.env.PERCY_BASE_URL;
if (!baseUrl) {
  throw new TypeError("process.env.PERCY_BASE_URL must be defined");
}
console.log("Percy base url:", baseUrl);

// Support single string relative URLs, or objects with a `url` key.
// https://docs.percy.io/docs/percy-snapshot#configuration
const snapshotRelativeUrls = ["/", "/lessons/made_up_slug/"];

const urls = snapshotRelativeUrls.map((relUrl) => {
  if (typeof relUrl === "string") {
    let url = new URL(relUrl, baseUrl).href;
    return { name: url, url };
  } else {
    let url = new URL(relUrl.url, baseUrl).href;
    return {
      // Pass through any fancy config.
      ...relUrl,
      name: url,
      url,
    };
  }
});

module.exports = urls;
