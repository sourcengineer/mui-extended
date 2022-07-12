import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import RadioGroupExtended from "./RadioGroupExtended";
import { Typography } from "@mui/material";
import { LoginOutlined } from "@mui/icons-material";

export default {
  title: "mui-extended/RadioGroupExtended",
  component: RadioGroupExtended,
} as ComponentMeta<typeof RadioGroupExtended>;

const Template: ComponentStory<typeof RadioGroupExtended> = (args) => <RadioGroupExtended {...args} />;

export const Basic = Template.bind({});

// Basic.args = {
//   title: "Title",
//   icon: <LoginOutlined />,
//   titleColor: "primary",
//   children: <Typography>Inner content could be ReactNode.</Typography>,
// };
