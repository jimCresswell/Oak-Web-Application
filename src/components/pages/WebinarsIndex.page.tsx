import { NextPage } from "next";
import { toPlainText } from "@portabletext/react";

import { BlogListItemProps } from "../../components/Blog/BlogList/BlogListItem";
import Layout from "../../components/Layout";
import { getSeoProps } from "../../browser-lib/seo/getSeoProps";
import { getBlogWebinarListBreadcrumbs } from "../../components/Breadcrumbs/getBreadcrumbs";
import MobileBlogFilters from "../../components/MobileBlogFilters";
import SummaryCard from "../../components/Card/SummaryCard";
import MaxWidth from "../../components/MaxWidth/MaxWidth";
import {
  BlogWebinarCategory,
  WebinarPreview,
} from "../../common-lib/cms-types";
import BlogWebinarsListAndCategories from "../Blog/BlogWebinarsListAndCategories";
import { WebinarsListingPage } from "../../common-lib/cms-types/webinarsListingPage";
import PostListing from "../Posts/PostListing";

export type SerializedWebinarPreview = Omit<WebinarPreview, "date"> & {
  date: string;
};

export type WebinarListingPageProps = {
  webinars: SerializedWebinarPreview[];
  categories: BlogWebinarCategory[];
  categorySlug: string | null;
  pageData: WebinarsListingPage;
};

/**
 * @TODO: Remove /webinars/* from next-sitemap.config.js when built
 */

const WebinarListingPage: NextPage<WebinarListingPageProps> = (props) => {
  const webinars = props.webinars.map(webinarToBlogListItem);
  const { categories, categorySlug, pageData } = props;

  return (
    // <Layout
    //   seoProps={getSeoProps({
    //     title: "Webinars",
    //     description: "Webinars",
    //   })}
    //   $background="white"
    //   breadcrumbs={getBlogWebinarListBreadcrumbs(
    //     categories,
    //     categorySlug,
    //     "beta/webinars",
    //     "Webinars"
    //   )}
    // >
    //   <MaxWidth $pt={[0, 80, 80]}>

    //     <MobileBlogFilters
    //       page={"webinars-index"}
    //       categoryListProps={{
    //         categories,
    //         selectedCategorySlug: categorySlug,
    //       }}
    //     />

    //     <BlogWebinarsListAndCategories
    //       {...props}
    //       blogs={webinars}
    //       page={"webinars-index"}
    //     />
    //   </MaxWidth>
    //   {/* <BlogListJsonLd blogs={props.webinars} /> @todo // needs more data from
    //     sanity */}
    // </Layout>
    <>
      <PostListing
        seo={{
          title: "Webinarss",
          description: "Webinars",
        }}
        title={pageData.title}
        heading={pageData.heading}
        summary={pageData.summary}
        categories={[]}
        categorySlug={null}
        postsWithCategories={props}
        posts={[]}
        variant={{
          slug: "blog",
          title: "",
        }}
      />
    </>
  );
};

export const webinarToBlogListItem = (
  webinar: SerializedWebinarPreview
): BlogListItemProps => ({
  ...webinar,
  contentType: "webinar",
  title: webinar.title,
  summary: toPlainText(webinar.summaryPortableText),
  titleTag: "h3",
  category: webinar.category,
  date: webinar.date,
  mainImage: webinar.video.video.asset.playbackId,
  thumbTime: webinar.video.video.asset.thumbTime,
});

export default WebinarListingPage;
