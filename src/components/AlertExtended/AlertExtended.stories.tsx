import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import AlertExtended from "./AlertExtended";
import { Typography } from "@mui/material";

export default {
  title: "mui-extended/AlertExtended",
  component: AlertExtended,
} as ComponentMeta<typeof AlertExtended>;

const Template: ComponentStory<typeof AlertExtended> = (args) => <AlertExtended {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  type: "success",
  title: "Title",
  children: <Typography>Inner content could be ReactNode.</Typography>,
};
