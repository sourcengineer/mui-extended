import React, { useState } from "react";

import { Autocomplete, Box, Checkbox, Chip, SxProps, TextField, Theme } from "@mui/material";

import { Controller, FieldValues, RegisterOptions, UseFormReturn } from "react-hook-form";
import CheckBoxOutlineBlank from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckOutlined from "@mui/icons-material/CheckOutlined";
import _ from "lodash";

export interface EnumNomenclature {
  value: string;
  name: string;
}

type CheckboxSelectExtendedProps = {
  name: string;
  label: string;
  disabled?: boolean;
  options: Array<EnumNomenclature>;
  form: any & UseFormReturn<FieldValues, object>;
  rules?: Omit<RegisterOptions, string>;
};

const checkBoxOutlineBlankStyle = (theme: Theme): SxProps => {
  return {
    color: "transparent",
    borderRadius: "3px",
    fontSize: 30,
    border: "1px solid" + theme.palette.grey[400],
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

const icon = <CheckBoxOutlineBlank sx={(theme: Theme) => ({ ...checkBoxOutlineBlankStyle(theme) })} />;
const checkedIcon = <CheckOutlined sx={(theme: Theme) => ({ ...checkOutlinedStyle(theme, false) })} />;

function CheckboxSelectExtended({
  name,
  label,
  disabled,
  options,
  form,
  rules,
  ...props
}: CheckboxSelectExtendedProps) {
  const [open, setOpen] = useState(false);

  const {
    control,
    formState: { errors },
  } = form;

  const getValue = (value: string | Array<string>) => {
    const ids = Array.isArray(value) ? (value as Array<string>) : ([value] as Array<string>);
    let currentOptions = Array<EnumNomenclature>();

    ids.forEach((searchedId) => {
      const searchedOption = options.find((item) => item.value === searchedId);

      if (searchedOption) {
        currentOptions.push(searchedOption);
      }
    });

    return currentOptions;
  };

  const setValue = (value: EnumNomenclature | Array<EnumNomenclature>) => {
    const ids = Array<string>();
    const selectedOptions = value as Array<EnumNomenclature>;

    selectedOptions.forEach((item) => ids.push(item.value));

    return ids;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          {...props}
          value={getValue(value) as any}
          multiple={true}
          disabled={disabled}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onChange={(_, value) => {
            onChange(setValue(value));
          }}
          isOptionEqualToValue={(option, value) => {
            return value && value.value !== undefined ? option.value === value.value : false;
          }}
          getOptionLabel={(option) => {
            return option && option.name ? option.name : "";
          }}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip size="small" label={option.name} sx={{ m: 0 }} {...getTagProps({ index })} />
            ))
          }
          options={options}
          loadingText="Зареждане..."
          disableCloseOnSelect
          renderOption={(props, option, { selected }) => (
            <Box component="li" {...props}>
              <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={
                !!_.get(errors, `${name}`) ? { "error-anchor": "", ...params.inputProps } : { ...params.inputProps }
              }
              label={label}
              InputProps={{
                ...params.InputProps,
              }}
              helperText={_.get(errors, `${name}.message`)}
              error={!!_.get(errors, `${name}`)}
            />
          )}
        />
      )}
    />
  );
}

export default CheckboxSelectExtended;
