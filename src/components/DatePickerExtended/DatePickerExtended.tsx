import React, { useState } from "react";

import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import bgLocale from "date-fns/locale/bg";
import { Controller, FieldValues, RegisterOptions, UseFormReturn } from "react-hook-form";
import _ from "lodash";

type DatePickerExtendedProps = {
  name: string;
  label: string;
  disabled?: boolean;
  form: any & UseFormReturn<FieldValues, object>;
  minDate?: Date;
  maxDate?: Date;
  rules?: Omit<RegisterOptions, string>;
};

function DatePickerExtended({
  name,
  label,
  disabled,
  form,
  minDate,
  maxDate,
  rules,
  ...props
}: DatePickerExtendedProps) {
  const {
    control,
    formState: { errors },
  } = form;

  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={bgLocale}>
          <DatePicker
            {...props}
            value={value ?? null}
            disabled={disabled}
            minDate={minDate}
            maxDate={maxDate}
            inputFormat="dd.MM.yyyy"
            mask="__.__.____"
            onChange={onChange}
            open={open}
            onClose={() => setOpen(false)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                helperText={_.get(errors, `${name}.message`)}
                error={!!_.get(errors, `${name}`)}
                inputProps={
                  !!_.get(errors, `${name}`) ? { "error-anchor": "", ...params.inputProps } : { ...params.inputProps }
                }
                InputLabelProps={{ shrink: open ? (value ? true : false) : value ? true : false }}
                onClick={() => {
                  if (params.disabled) setOpen(false);
                  else setOpen(!open);
                }}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
}

export default DatePickerExtended;

//export default memo(DatePickerExtended, datetPickerPropsAreEqual);

// function datetPickerPropsAreEqual(prev: DatePickerExtendedProps, next: DatePickerExtendedProps) {
//   const hasError = !!next.form.formState.errors[next.name];
//   const areErrorsEqual = _.isEqualWith(prev.form.formState.errors, next.form.formState.errors);
//   const hasErrorModification = !areErrorsEqual && hasError;

//   const { form: prevForm, rules: prevRules, ...prevInputProps } = prev;
//   const { form: nextForm, rules: nextRules, ...nextInputProps } = next;
//   const arePropsEqual = _.isEqualWith(prevInputProps, nextInputProps);

//   const hasPropsModification = !arePropsEqual;

//   return !(hasErrorModification || hasPropsModification);
// }
