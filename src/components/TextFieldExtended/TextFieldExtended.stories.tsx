import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TextFieldExtended from "./TextFieldExtended";
import { Typography } from "@mui/material";
import { LoginOutlined } from "@mui/icons-material";

export default {
  title: "mui-extended/TextFieldExtended",
  component: TextFieldExtended,
} as ComponentMeta<typeof TextFieldExtended>;

const Template: ComponentStory<typeof TextFieldExtended> = (args) => <TextFieldExtended {...args} />;

export const Basic = Template.bind({});

// Basic.args = {
//   title: "Title",
//   icon: <LoginOutlined />,
//   titleColor: "primary",
//   children: <Typography>Inner content could be ReactNode.</Typography>,
// };
