import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CheckboxSelectExtended from "./CheckboxSelectExtended";
import { useForm } from "react-hook-form";

export default {
  title: "mui-extended/CheckboxSelectExtended",
  component: CheckboxSelectExtended,
} as ComponentMeta<typeof CheckboxSelectExtended>;

const Template: ComponentStory<typeof CheckboxSelectExtended> = (args) => <CheckboxSelectExtended {...args} />;

export const Basic = Template.bind({});

// const form = useForm({
//   mode: "all",
//   shouldFocusError: false,
//   defaultValues: { list: [] },
// });

// Basic.args = {
//   name: "list",
//   label: "label",
//   options: [
//     { value: "one", name: "one" },
//     { value: "two", name: "two" },
//     { value: "three", name: "three" },
//   ],
//   form: form,
// };

// name: string;
// label: string;
// disabled?: boolean;
// options: Array<EnumNomenclature>;
// form: any & UseFormReturn<FieldValues, object>;
// rules?: Omit<RegisterOptions, string>;
