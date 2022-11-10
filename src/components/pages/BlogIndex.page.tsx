import { NextPage } from "next";

import { BlogListJsonLd } from "../../browser-lib/seo/getJsonLd";
import { getSeoProps } from "../../browser-lib/seo/getSeoProps";
import {
  BlogPostPreview,
  BlogWebinarCategory,
} from "../../common-lib/cms-types";
import { BlogListItemProps } from "../Blog/BlogList/BlogListItem";
import { getBlogWebinarListBreadcrumbs } from "../Breadcrumbs/getBreadcrumbs";
import SummaryCard from "../Card/SummaryCard";
import Layout from "../Layout";
import MaxWidth from "../MaxWidth/MaxWidth";
import MobileBlogFilters from "../MobileBlogFilters";
import BlogWebinarsListAndCategories from "../Blog/BlogWebinarsListAndCategories";

export type SerializedBlogPostPreview = Omit<BlogPostPreview, "date"> & {
  date: string;
};

export type BlogListingPageProps = {
  blogs: SerializedBlogPostPreview[];
  categories: BlogWebinarCategory[];
  categorySlug: string | null;
};

const BlogListingPage: NextPage<BlogListingPageProps> = (props) => {
  const { blogs, categories, categorySlug } = props;

  const cardImage = {
    src: "/images/illustrations/teacher-carrying-stuff-237-286.png",
    alt: "",
  };

  const blogListItems = blogs.map(blogToBlogListItem);

  return (
    <Layout
      seoProps={getSeoProps({
        title: "Latest Blogs & Insights",
        description:
          "Keep up to date with our latest blog posts, filled with insights, news and updates from Oak National Academy.",
      })}
      $background="white"
      breadcrumbs={getBlogWebinarListBreadcrumbs(
        categories,
        categorySlug,
        "blog",
        "Blog"
      )}
    >
      <MaxWidth $pt={[0, 80, 80]}>
        <SummaryCard
          title={"Blog Listing"}
          heading={"Inspiration for inside and outside the classroom"}
          // TODO: Replace line summary with new field from CMS
          summary={
            "Read blogs from our in-house experts to find ideas to take away and try, from curriculum planning to lesson delivery. Plus, keep up to date with the latest news and insights from Oak."
          }
          imageProps={cardImage}
        />

        <MobileBlogFilters
          page={"blog-index"}
          categoryListProps={{
            categories,
            selectedCategorySlug: categorySlug,
          }}
        />

        <BlogWebinarsListAndCategories
          {...props}
          blogs={blogListItems}
          page={"blog-index"}
        />
      </MaxWidth>
      <BlogListJsonLd blogs={props.blogs} />
    </Layout>
  );
};

export const blogToBlogListItem = (
  blog: SerializedBlogPostPreview
): BlogListItemProps => ({
  ...blog,
  contentType: "blog-post",
  titleTag: "h3",
  category: blog.category,
  date: blog.date,
  mainImage: blog?.mainImage,
});

export default BlogListingPage;
