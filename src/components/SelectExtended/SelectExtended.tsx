import React, { useState, useEffect } from "react";

import { Autocomplete, Box, Chip, CircularProgress, TextField } from "@mui/material";

import { Controller, FieldValues, RegisterOptions, UseFormReturn } from "react-hook-form";
import { AxiosResponse } from "axios";
import _ from "lodash";
export interface Nomenclature {
  id: number;
  name: string;
}

type SelectExtendedProps = {
  name: string;
  label: string;
  disabled?: boolean;
  multiple?: boolean;
  parentId?: number;
  initRequest: (ids: Array<number>) => Promise<AxiosResponse<Array<Nomenclature>>>;
  searchRequest: (
    offset: number,
    limit: number,
    keyword?: string,
    parentId?: number
  ) => Promise<AxiosResponse<Array<Nomenclature>>>;
  form: any & UseFormReturn<FieldValues, object>;
  rules?: Omit<RegisterOptions, string>;
};

const LIMIT: number = 20;

function SelectExtended({
  name,
  label,
  disabled,
  multiple = false,
  parentId,
  searchRequest: service,
  initRequest: initService,
  form,
  rules,
  ...props
}: SelectExtendedProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(Array<Nomenclature>());
  const [loading, showLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [scollerHeight, setScollerHeight] = useState(0);

  const [selectedOptions, setSelectedOptions] = useState<Nomenclature | Array<Nomenclature> | null>(
    multiple ? [] : null
  );

  const {
    control,
    setValue: formSetValue,
    getValues,
    watch,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (multiple) {
      const oldIds: Array<number> = getValues(name);
      const newIds: Array<number> = getSelectedIds();
      if (_.xor(oldIds, newIds).length > 0) {
        const ids = _.union(oldIds, newIds);
        init(ids);
      }
    } else {
      const oldId: number = getValues(name);
      const newId: number | null = getSelectedId();
      if (!_.isEqual(oldId, newId)) {
        newId ? init(newId) : init(oldId);
      }
    }
  }, [watch(name)]);

  const getSelectedId = (): number | null => {
    if (!Array.isArray(selectedOptions) && selectedOptions?.id) return selectedOptions.id;
    else return null;
  };

  const getSelectedIds = (): Array<number> => {
    if (Array.isArray(selectedOptions) && selectedOptions.length > 0) return selectedOptions.map((i) => i.id);
    else return [];
  };

  const load = (offset: number, keyword: string, attach: boolean = false) => {
    showLoading(true);

    (async () => {
      await service(offset, LIMIT, keyword, parentId).then(({ data }) => {
        if (attach) {
          setOptions([...options, ...data]);
        } else {
          setOptions([...data]);
        }
        showLoading(false);
      });
    })();
  };

  const init = (initIds: number | Array<number>) => {
    const ids: Array<number> = Array.isArray(initIds) ? initIds : initIds ? [initIds] : [];

    if (ids.length > 0) {
      (async () => {
        initService &&
          (await initService(ids).then(({ data }) => {
            setOptions([...data]);
            setSelectedOptions([...data]);
          }));
      })();
    }
  };

  useEffect(() => {
    const isCascading = parentId || parentId === null;
    if (isCascading) {
      formSetValue(name, null);
    }
  }, [parentId]);

  useEffect(() => {
    if (open) {
      load(0, "");
    }
  }, [open]);

  const toNomenclature = (value: number | Array<number>) => {
    if (multiple) {
      let currentOptions = Array<Nomenclature>();

      const ids: Array<number> = Array.isArray(value) ? value : value ? [value] : [];

      ids.forEach((searchedId) => {
        const searchedOption = options.find((item) => item.id === searchedId);

        if (searchedOption) {
          currentOptions.push(searchedOption);
        }
      });

      // if (ids.length > 0 && currentOptions.length === 0) {
      //   init(ids);
      // }

      return currentOptions;
    } else {
      if (value) {
        const id = value as number;

        const currentOption = options.find((item) => item.id === id);

        // if (currentOption === undefined) {
        //   init(Array(1).fill(id));
        // }

        return currentOption ? currentOption : null;
      } else return null;
    }
  };

  const fromNomenclature = (value: Nomenclature | Array<Nomenclature>) => {
    if (multiple) {
      const ids = Array<number>();

      const selectedOptions = value as Array<Nomenclature>;
      selectedOptions.forEach((item) => ids.push(item.id));

      return ids;
    } else {
      const selectedOption = value as Nomenclature;
      return selectedOption ? selectedOption.id : null;
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          {...props}
          value={toNomenclature(value) as any}
          multiple={multiple}
          disabled={disabled}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onChange={(_, value) => {
            setSelectedOptions(value);
            onChange(fromNomenclature(value));
          }}
          isOptionEqualToValue={(option, value) => {
            return value && value.id !== undefined ? option.id === value.id : false;
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
          loading={loading}
          loadingText="Зареждане..."
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.name}
            </Box>
          )}
          ListboxProps={{
            onScroll: (event: React.SyntheticEvent) => {
              const listboxNode = event.currentTarget;

              if (listboxNode.scrollTop === 0) {
                listboxNode.scrollBy({ top: scollerHeight - 300 });
              }

              if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight - 20) {
                setScollerHeight(listboxNode.scrollHeight);
                load(options.length, keyword, true);
              }
            },
          }}
          onInputChange={(e, value, reason) => {
            if (!multiple && e?.constructor.name === "SyntheticBaseEvent" && reason !== "reset") {
              setKeyword(value);
              load(0, value);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={
                !!_.get(errors, `${name}`) ? { "error-anchor": "", ...params.inputProps } : { ...params.inputProps }
              }
              label={label}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress size={20} sx={{ mr: 4 }} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
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

export default SelectExtended;
//export default memo(SelectExtended, selectPropsAreEqual);

// function selectPropsAreEqual(prev: SelectExtendedProps, next: SelectExtendedProps) {
//   const areErrorsEqual = _.isEqualWith(prev.form.formState.errors, next.form.formState.errors);
//   const hasErrorModification = !areErrorsEqual;

//   const { form: prevForm, rules: prevRules, ...prevInputProps } = prev;
//   const { form: nextForm, rules: nextRules, ...nextInputProps } = next;
//   const arePropsEqual = _.isEqualWith(prevInputProps, nextInputProps);

//   const hasPropsModification = !arePropsEqual;

//   return !(hasErrorModification || hasPropsModification);
// }
