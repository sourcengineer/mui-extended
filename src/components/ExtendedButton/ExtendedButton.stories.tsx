import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ExtendedButton from "./ExtendedButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "mui-extended/ExtendedButton",
  component: ExtendedButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof ExtendedButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ExtendedButton> = (args) => <ExtendedButton {...args} />;

export const HelloWorld = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HelloWorld.args = {
  text: "Hello world!",
};

export const ClickMe = Template.bind({});
ClickMe.args = {
  text: "Click me!",
};
