import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Component from "./SiteFooter";

export default {
  title: "Headers & Footers/Site Footer",
  component: Component,
  argTypes: {},
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <div style={{ background: "lightGrey", padding: "100px" }}>
    <Component {...args} />
  </div>
);

export const SiteFooter = Template.bind({});
