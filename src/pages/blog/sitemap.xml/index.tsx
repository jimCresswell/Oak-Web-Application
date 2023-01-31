import { GetServerSideProps } from "next";

import CMSClient from "../../../node-lib/cms";
import { getServerSideSitemapEntries } from "../../../node-lib/isr";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // SITEMAP_BASE_URL is written to the .env file during next.config.js execution.
  const sitemapBaseUrl = process.env.SITEMAP_BASE_URL || "";

  const blogResults = await CMSClient.blogPosts();
  const blogSlugs = blogResults.map((blog) => blog.slug);

  return getServerSideSitemapEntries(
    context,
    sitemapBaseUrl,
    "/blog/",
    blogSlugs
  );
};

// Default export to prevent next.js errors
// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function Sitemap() {}
