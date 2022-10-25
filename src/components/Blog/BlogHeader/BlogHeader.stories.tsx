import { ComponentStory, ComponentMeta } from "@storybook/react";

import Component from "./BlogHeader";

export default {
  title: "Blogs",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => {
  return <Component {...args} />;
};

export const BlogHeader = Template.bind({});
BlogHeader.args = {
  blog: {
    title: "A blog",
    id: "5",
    date: "2025-01-01",
    slug: "a-blog",
    author: { id: "000", name: "Author McAuthorFace" },
    mainImage: {
      asset: {
        _id: "",
        url: "",
      },
    },
    summary: "Lorem ipsum",
    contentPortableText: [],
    category: {
      title: "Lesson Plabning",
      slug: "lesson-planning",
    },
  },
};