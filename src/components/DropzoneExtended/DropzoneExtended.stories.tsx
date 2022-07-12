import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import DropzoneExtended from "./DropzoneExtended";
import { Typography } from "@mui/material";
import { LoginOutlined } from "@mui/icons-material";
import { AxiosResponse } from "axios";
import { FileDto } from "../../interfaces/FileDto";
import { useForm } from "react-hook-form";

export default {
  title: "mui-extended/DropzoneExtended",
  component: DropzoneExtended,
} as ComponentMeta<typeof DropzoneExtended>;

const Template: ComponentStory<typeof DropzoneExtended> = (args) => <DropzoneExtended {...args} />;

export const Basic = Template.bind({});

// const fakeUpload = async (file: File, onProgress: (event: any) => void): Promise<AxiosResponse<FileDto>> => {
//   return Promise.resolve({ data: null } as AxiosResponse);
// };

// const fakeInit = async (fileId: number): Promise<AxiosResponse<FileDto>> => {
//   return Promise.resolve({ data: null } as AxiosResponse);
// };

// const form = useForm({
//   mode: "all",
//   shouldFocusError: false,
//   defaultValues: { fileId: 0 },
// });

// Basic.args = {
//   name: "fileId",
//   form: form,
//   initRequest: fakeInit,
//   uploadRequest: fakeUpload,
// };
