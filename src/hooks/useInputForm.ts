import { useState } from "react";
import { Control, DeepPartial, FormState, Path, PathValue, UnpackNestedValue, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useScroller } from "../hooks/useScroller";
import { AxiosResponse } from "axios";

export enum Step {
  INPUT = 1,
  PREVIEW = 2,
  SUCCESS = 3,
}

export enum Mode {
  NEW = 1,
  EDIT = 2,
}

type UseInputFormProps<TForm> = {
  defaultModel: TForm;
  addAsync: (model: TForm) => Promise<AxiosResponse<TForm>>;
  updateAsync: (model: TForm) => Promise<AxiosResponse<TForm>>;
  validate?: (model: TForm) => Promise<void>;
};

export type UseInputFormReturn<TForm> = {
  // events
  onSubmit: () => void;
  onEdit: () => void;
  scrollToFirstError: () => void;
  // useInputForm
  id: number;
  mode: Mode;
  step: Step;
  recreateForm: (model: TForm) => void;
  // useForm
  watch: (name: string) => any;
  getValues: (name: string) => any;
  setValue: (name: string, value: any) => void;
  setError: (name: string, message: string) => void;
  trigger: (name: string) => Promise<boolean>;
  unregister: (name: string) => void;
  control: Control<TForm, object>;
  formState: FormState<TForm>;
};

export const useInputForm = <TForm>({
  defaultModel,
  addAsync,
  updateAsync,
  validate,
}: UseInputFormProps<TForm>): UseInputFormReturn<TForm> => {
  const { id: paramId } = useParams();
  const id: number = parseInt(paramId as string);

  const mode = id ? Mode.EDIT : Mode.NEW;
  const [step, setStep] = useState(Step.INPUT);

  const [tryScrollToFirstError, scrollToTop] = useScroller();

  const form = useForm<TForm>({
    mode: "all",
    shouldFocusError: false,
    defaultValues: defaultModel as UnpackNestedValue<DeepPartial<TForm>>,
  });

  const onSubmit = async (model: any) => {
    if (validate) {
      await validate(model as TForm);
    }

    if (form.formState.errors && Object.keys(form.formState.errors).length > 0) {
      tryScrollToFirstError();
    } else {
      if (step === Step.PREVIEW) {
        await (mode === Mode.NEW ? addAsync(model) : updateAsync(model)).then(() => {
          setStep(Step.SUCCESS);
          scrollToTop();
        });
      } else {
        setStep(Step.PREVIEW);
        scrollToTop();
      }
    }
  };

  const onEdit = () => {
    scrollToTop();
    setStep(Step.INPUT);
  };

  const recreateForm = (model: TForm) => {
    for (const [key, value] of Object.entries(model)) {
      form.setValue(key as Path<TForm>, value as UnpackNestedValue<PathValue<TForm, Path<TForm>>>);
    }
  };

  const setInnerValue = (name: string, value: any) => {
    form.setValue(name as Path<TForm>, value as UnpackNestedValue<PathValue<TForm, Path<TForm>>>);
  };

  const setInnerError = (name: string, message: string) => {
    form.setError(name as Path<TForm>, { message: message }, { shouldFocus: true });
  };

  const innerUnregister = (name: string) => {
    form.unregister(name as Path<TForm>);
  };

  return {
    // events
    onSubmit: form.handleSubmit(onSubmit),
    onEdit,
    scrollToFirstError: tryScrollToFirstError,
    // useInputForm
    id: id,
    mode: mode,
    step: step,
    recreateForm: recreateForm,
    // useForm
    watch: form.watch,
    getValues: form.getValues,
    setValue: setInnerValue,
    setError: setInnerError,
    trigger: async (name: string) => await form.trigger(name as Path<TForm>),
    unregister: innerUnregister,
    control: form.control,
    formState: form.formState,
  };
};
