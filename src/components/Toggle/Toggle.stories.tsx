import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Component from ".";

export default {
  title: "Interactive/Toggle",
  component: Component,
  argTypes: {
    labelOn: {
      defaultValue: "Label",
    },
    labelOff: {
      defaultValue: "Label",
    },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => {
  const [value, setValue] = useState(false);
  return (
    <div style={{ background: "lightGrey", padding: "100px" }}>
      <Component {...args} checked={value} onChange={() => setValue(!value)} />
    </div>
  );
};

export const Toggle = Template.bind({});

export const ToggleDisabled = Template.bind({});

ToggleDisabled.args = {
  disabled: true,
};
