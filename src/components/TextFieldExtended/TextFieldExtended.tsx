import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

import { Controller, FieldValues, RegisterOptions, UseFormReturn } from "react-hook-form";
import _ from "lodash";

type TextFieldExtendedProps = {
  name: string;
  form: any & UseFormReturn<FieldValues, object>;
  rules?: Omit<RegisterOptions, string>;
} & TextFieldProps;

function TextFieldExtended({ name, form, rules, ...props }: TextFieldExtendedProps) {
  const errors = form.formState.errors;

  const { multiline } = props;
  if (multiline) {
    props = { minRows: 3, maxRows: 10, ...props };
  }

  return (
    <Controller
      name={name}
      control={form.control}
      rules={rules}
      render={({ field: { onBlur, onChange, value } }) => (
        <TextField
          {...props}
          inputProps={!!_.get(errors, `${name}`) ? { "error-anchor": "" } : {}}
          name={name}
          value={value ?? ""}
          helperText={_.get(errors, `${name}.message`)}
          error={!!_.get(errors, `${name}`)}
          onBlur={onBlur}
          onChange={onChange}
        />
      )}
    />
  );
}

export default TextFieldExtended;
//export default memo(TextFieldExtended, textFieldPropsAreEqual);

// function textFieldPropsAreEqual(prev: TextFieldExtendedProps, next: TextFieldExtendedProps) {
//   console.log(`prev:${prev.name}`, prev.form.formState.errors);
//   console.log(`next:${next.name}`, next.form.formState.errors);
//   const hasError = !!next.form.formState.errors[next.name];
//   const areErrorsEqual = _.isEqualWith(prev.form.formState.errors, next.form.formState.errors);
//   const hasErrorModification = !areErrorsEqual && hasError;

//   const { form: prevForm, rules: prevRules, ...prevInputProps } = prev;
//   const { form: nextForm, rules: nextRules, ...nextInputProps } = next;
//   const arePropsEqual = _.isEqualWith(prevInputProps, nextInputProps);

//   const hasPropsModification = !arePropsEqual;

//   return !(hasErrorModification || hasPropsModification);
// }
