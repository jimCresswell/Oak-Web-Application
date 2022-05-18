import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ButtonComponent from "./Button";

export default {
  title: "Components/Buttons/Button",
  component: ButtonComponent,
  argTypes: {
    argTypes: { onClick: { action: "clicked" } },
    label: {
      defaultValue: "Button",
    },
    variant: {
      defaultValue: "primary",
    },
    background: {
      defaultValue: "teachers-primary",
    },
  },
} as ComponentMeta<typeof ButtonComponent>;

const Template: ComponentStory<typeof ButtonComponent> = (args) => (
  <div>
    <div>
      <h1>Button</h1>

      <ButtonComponent {...args} />
    </div>
  </div>
);

export const Example = Template.bind({});

Example.args = {
  label: "Click me",
  variant: "primary",
};
