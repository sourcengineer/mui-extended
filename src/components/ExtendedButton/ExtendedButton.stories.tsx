import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ExtendedButton from "./ExtendedButton";

export default {
  title: "mui-extended/ExtendedButton",
  component: ExtendedButton,
} as ComponentMeta<typeof ExtendedButton>;

const Template: ComponentStory<typeof ExtendedButton> = (args) => <ExtendedButton {...args} />;

export const HelloWorld = Template.bind({});
HelloWorld.args = {
  text: "Hello world!",
};

export const ClickMe = Template.bind({});
ClickMe.args = {
  text: "Click me!",
};
