import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CardBox from "./CardBox";
import { Typography } from "@mui/material";
import { LoginOutlined } from "@mui/icons-material";

export default {
  title: "mui-extended/CardBox",
  component: CardBox,
} as ComponentMeta<typeof CardBox>;

const Template: ComponentStory<typeof CardBox> = (args) => <CardBox {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  title: "Title",
  icon: <LoginOutlined />,
  titleColor: "primary",
  children: <Typography>Inner content could be ReactNode.</Typography>,
};
