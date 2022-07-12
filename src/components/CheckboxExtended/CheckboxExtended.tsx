import React from "react";
import { Checkbox, FormControlLabel, FormHelperText, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import { CheckBoxOutlineBlank, CheckOutlined } from "@mui/icons-material";

import { Controller, FieldValues, RegisterOptions, UseFormReturn } from "react-hook-form";
import _ from "lodash";

const formControlLabelStyle = (theme: Theme, error: any): SxProps => {
  return {
    color: !!error ? theme.palette.error.main : theme.palette.text.secondary,
    mt: "-10px",
    mr: "10px",
    mb: "-10px",
    ml: -1,
  };
};

const checkBoxOutlineBlankStyle = (theme: Theme, error: any): SxProps => {
  return {
    color: "transparent",
    borderRadius: "3px",
    fontSize: 30,
    border: !!error ? "1px solid" + theme.palette.error.main : "1px solid" + theme.palette.grey[400],
  };
};

const checkOutlinedStyle = (theme: Theme, disabled?: boolean): SxProps => {
  return {
    borderRadius: "3px",
    backgroundColor: theme.palette.common.white,
    fontSize: 30,
    border: disabled ? "1px solid" + theme.palette.grey[400] : "1px solid" + theme.palette.grey[400],
    color: disabled ? theme.palette.grey[400] : theme.palette.secondary.main,
  };
};

type CheckboxExtendedProps = {
  name: string;
  label: string;
  disabled?: boolean;
  form: any & UseFormReturn<FieldValues, object>;
  rules?: Omit<RegisterOptions, string>;
};

function CheckboxExtended({ name, label, disabled, form, rules, ...props }: CheckboxExtendedProps) {
  const {
    control,
    formState: { errors },
  } = form;

  const error = _.get(errors, `${name}`);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onBlur, onChange, value } }) => (
        <>
          <FormControlLabel
            sx={(theme) => ({ ...formControlLabelStyle(theme, error) })}
            control={
              <Checkbox
                {...props}
                checked={!!value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                icon={<CheckBoxOutlineBlank sx={(theme) => ({ ...checkBoxOutlineBlankStyle(theme, error) })} />}
                checkedIcon={<CheckOutlined sx={(theme) => ({ ...checkOutlinedStyle(theme, disabled) })} />}
              />
            }
            label={label}
          />
          {!!error && <FormHelperText error>{error.message}</FormHelperText>}
        </>
      )}
    />
  );
}

export default CheckboxExtended;

//export default memo(CheckboxExtended, checkboxPropsAreEqual);

// function checkboxPropsAreEqual(prev: CheckboxExtendedProps, next: CheckboxExtendedProps) {
//   const hasError = !!next.form.formState.errors[next.name];
//   const areErrorsEqual = _.isEqualWith(prev.form.formState.errors, next.form.formState.errors);
//   const hasErrorModification = !areErrorsEqual && hasError;

//   const { form: prevForm, rules: prevRules, ...prevInputProps } = prev;
//   const { form: nextForm, rules: nextRules, ...nextInputProps } = next;
//   const arePropsEqual = _.isEqualWith(prevInputProps, nextInputProps);

//   const hasPropsModification = !arePropsEqual;

//   return !(hasErrorModification || hasPropsModification);
// }
