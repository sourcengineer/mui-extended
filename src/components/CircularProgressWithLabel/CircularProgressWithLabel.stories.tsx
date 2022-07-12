import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

export default {
  title: "mui-extended/CircularProgressWithLabel",
  component: CircularProgressWithLabel,
} as ComponentMeta<typeof CircularProgressWithLabel>;

const Template: ComponentStory<typeof CircularProgressWithLabel> = (args) => <CircularProgressWithLabel {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  value: 66,
};
