import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SelectExtended from "./SelectExtended";
import { Typography } from "@mui/material";
import { LoginOutlined } from "@mui/icons-material";

export default {
  title: "mui-extended/SelectExtended",
  component: SelectExtended,
} as ComponentMeta<typeof SelectExtended>;

const Template: ComponentStory<typeof SelectExtended> = (args) => <SelectExtended {...args} />;

export const Basic = Template.bind({});

// Basic.args = {
//   title: "Title",
//   icon: <LoginOutlined />,
//   titleColor: "primary",
//   children: <Typography>Inner content could be ReactNode.</Typography>,
// };
