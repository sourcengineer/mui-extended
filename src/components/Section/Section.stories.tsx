import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Section from "./Section";
import { Typography } from "@mui/material";
import { LoginOutlined } from "@mui/icons-material";

export default {
  title: "mui-extended/Section",
  component: Section,
} as ComponentMeta<typeof Section>;

const Template: ComponentStory<typeof Section> = (args) => <Section {...args} />;

export const Basic = Template.bind({});

// Basic.args = {
//   title: "Title",
//   icon: <LoginOutlined />,
//   titleColor: "primary",
//   children: <Typography>Inner content could be ReactNode.</Typography>,
// };
