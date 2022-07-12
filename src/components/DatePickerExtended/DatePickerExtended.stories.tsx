import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import DatePickerExtended from "./DatePickerExtended";
import { Typography } from "@mui/material";
import { LoginOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";

export default {
  title: "mui-extended/DatePickerExtended",
  component: DatePickerExtended,
} as ComponentMeta<typeof DatePickerExtended>;

const Template: ComponentStory<typeof DatePickerExtended> = (args) => <DatePickerExtended {...args} />;

export const Basic = Template.bind({});

// const form = useForm({
//   mode: "all",
//   shouldFocusError: false,
//   defaultValues: { date: new Date() },
// });

// Basic.args = {
//   name: "date",
//   label: "Date",
//   form: form,
// };

// name: string;
// label: string;
// disabled?: boolean;
// form: any & UseFormReturn<FieldValues, object>;
// minDate?: Date;
// maxDate?: Date;
// rules?: Omit<RegisterOptions, string>;
