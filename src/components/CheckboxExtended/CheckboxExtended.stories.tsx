import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CheckboxExtended from "./CheckboxExtended";
import { useForm } from "react-hook-form";

export default {
  title: "mui-extended/CheckboxExtended",
  component: CheckboxExtended,
} as ComponentMeta<typeof CheckboxExtended>;

const Template: ComponentStory<typeof CheckboxExtended> = (args) => <CheckboxExtended {...args} />;

export const Basic = Template.bind({});

// const form = useForm({
//   mode: "all",
//   shouldFocusError: false,
//   defaultValues: { isActive: true },
// });

// Basic.args = {
//   name: "isActive",
//   label: "IsActive",
//   form: form,
// };

// name: string;
// label: string;
// disabled?: boolean;
// form: any & UseFormReturn<FieldValues, object>;
// rules?: Omit<RegisterOptions, string>;
