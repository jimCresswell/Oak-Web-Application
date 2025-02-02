import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ToastProvider } from "../../context/Toast";
import CopyLinkButton from "../Button/CopyLinkButton";
import PostHogDecorator from "../../storybook-decorators/PostHogDecorator";

import Component from ".";

export default {
  title: "Interactive/Toast",
  decorators: [PostHogDecorator],
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = () => {
  return (
    <ToastProvider>
      <Component />
      <CopyLinkButton />
    </ToastProvider>
  );
};

export const Toast = Template.bind({});
