import { ComponentStory, ComponentMeta } from "@storybook/react";

import Component from ".";

export default {
  title: "Foundations/Circle",
  component: Component,
  argTypes: {
    size: {
      defaultValue: 72,
    },
    $background: {
      defaultValue: "teachersPastelYellow",
    },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (props) => (
  <Component {...props}>Hi!</Component>
);

export const Circle = Template.bind({});
export const CircleWithDropShadow = Template.bind({});
CircleWithDropShadow.args = {
  $dropShadow: "grey20",
};
