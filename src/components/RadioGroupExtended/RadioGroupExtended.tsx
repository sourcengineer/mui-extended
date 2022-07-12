import React from "react";
import { FormControlLabel, Radio, RadioGroup, RadioGroupProps } from "@mui/material";

import { Controller, FieldValues, RegisterOptions, UseFormReturn } from "react-hook-form";

type RadioGroupExtendedProps = {
  name: string;
  options: Array<[label: string, value: string]>;
  form: any & UseFormReturn<FieldValues, object>;
  disabled?: boolean;
  rules?: Omit<RegisterOptions, string>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
} & RadioGroupProps;

export default function RadioGroupExtended({
  name,
  options,
  form,
  rules,
  disabled,
  onChange,
  ...props
}: RadioGroupExtendedProps) {
  const { control } = form;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange: onInnerChange, value } }) => (
        <RadioGroup
          {...props}
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>, value: string) => {
            onInnerChange(event, value);
            if (onChange) {
              onChange(event, value);
            }
          }}
        >
          {options.map((item) => (
            <FormControlLabel disabled={disabled} key={item[0]} label={item[0]} value={item[1]} control={<Radio />} />
          ))}
        </RadioGroup>
      )}
    />
  );
}
