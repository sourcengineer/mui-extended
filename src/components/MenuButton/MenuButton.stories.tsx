import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import MenuButton from "./MenuButton";
import { Typography } from "@mui/material";
import { LoginOutlined } from "@mui/icons-material";

export default {
  title: "mui-extended/MenuButton",
  component: MenuButton,
} as ComponentMeta<typeof MenuButton>;

const Template: ComponentStory<typeof MenuButton> = (args) => <MenuButton {...args} />;

export const Basic = Template.bind({});

// Basic.args = {
//   title: "Title",
//   icon: <LoginOutlined />,
//   titleColor: "primary",
//   children: <Typography>Inner content could be ReactNode.</Typography>,
// };
