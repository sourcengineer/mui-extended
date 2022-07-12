import { useEffect, useState } from "react";
import {
  Control,
  DeepPartial,
  FormState,
  Path,
  PathValue,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
} from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearchResult } from "../hooks/useSearchResult";
import queryString, { ParseOptions, StringifyOptions } from "query-string";
import { handleDates, stringifyToIsoDate } from "../utils/dateTime";
import nameof from "ts-nameof.macro";
import { PageDto } from "../interfaces/PageDto";
import _ from "lodash";

const QUERY_STRING_STRINGIFY_CONFIG: StringifyOptions = {
  sort: false,
  skipNull: true,
  skipEmptyString: true,
  arrayFormat: "index",
};

const QUERY_STRING_PARSE_CONFIG: ParseOptions = {
  parseNumbers: true,
  parseBooleans: true,
  arrayFormat: "index",
};

type UseSearchFormProps<TForm extends PageDto> = {
  defaultModel: TForm;
  rootSearchPath: string;
  searchAsync: (query: string) => Promise<void>;
  stringifyFlatter?: (model: TForm) => object;
  queryParser?: (parsedQuery: any) => object;
};

export type UseSearchFormReturn<TForm extends PageDto, TResult> = {
  // events
  onSubmit: () => void;
  onPageChanged: (event: React.ChangeEvent<unknown>, page: number) => void;
  onReset: () => void;
  // useSearchResult
  results: Array<TResult>;
  setResults: (data: Array<TResult>, count: number) => void;
  count: number;
  pageCount: number;
  searched: boolean;
  // useForm
  watch: (name: string) => any;
  getValues: (name: string) => any;
  setValue: (name: string, value: any) => void;
  control: Control<TForm, object>;
  formState: FormState<TForm>;
};

const useSearchForm = <TForm extends PageDto, TResult>({
  defaultModel,
  rootSearchPath,
  searchAsync,
  stringifyFlatter,
  queryParser,
}: UseSearchFormProps<TForm>): UseSearchFormReturn<TForm, TResult> => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searched, setSearched] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState(0);
  const search = useSearchResult<TResult>();
  const form = useForm<TForm>({ mode: "all", defaultValues: defaultModel as UnpackNestedValue<DeepPartial<TForm>> });

  useEffect(() => {
    const parsedQuery = queryString.parse(location.search, QUERY_STRING_PARSE_CONFIG);

    if (!_.isEmpty(parsedQuery)) {
      initForm(parsedQuery);
      searchCallback();
    } else {
      reset();
    }
  }, [searchTrigger]);

  const searchCallback = () => {
    const model = form.getValues() as TForm;
    model.offset = model.currentPage * defaultModel.limit - defaultModel.limit;
    model.limit = defaultModel.limit;

    searchAsync(stringify(model)).then(() => setSearched(true));
  };

  const initForm = (parsedQuery: any) => {
    const formSetter = (object: any) => {
      for (const [key, value] of Object.entries(object)) {
        form.setValue(key as Path<TForm>, value as UnpackNestedValue<PathValue<TForm, Path<TForm>>>);
      }
    };

    handleDates(parsedQuery);

    if (queryParser) {
      const unflattedParsedQuery = queryParser(parsedQuery);
      formSetter(unflattedParsedQuery);
    } else {
      formSetter(parsedQuery);
    }
  };

  const onSubmit: SubmitHandler<TForm> = (model: UnpackNestedValue<TForm>) => {
    model.currentPage = defaultModel.currentPage;
    redirect(model);
    return model;
  };

  const onPageChanged = (event: React.ChangeEvent<unknown>, page: number) => {
    form.setValue(
      nameof(defaultModel.currentPage) as Path<TForm>,
      page as UnpackNestedValue<PathValue<TForm, Path<TForm>>>
    );
    redirect(form.getValues());
  };

  const reset = () => {
    search.clear();
    setSearched(false);
    form.reset(defaultModel as UnpackNestedValue<DeepPartial<TForm>>);
    navigate(rootSearchPath);
  };

  const redirect = (model: UnpackNestedValue<TForm>) => {
    navigate({
      pathname: rootSearchPath,
      search: `?${stringify(model as TForm)}`,
    });
    setSearchTrigger(searchTrigger + 1);
  };

  const stringify = (object: TForm): string => {
    if (stringifyFlatter) {
      const flattedObject = stringifyFlatter(object);
      const query = queryString.stringify(stringifyToIsoDate(flattedObject), QUERY_STRING_STRINGIFY_CONFIG);
      return query;
    } else {
      const query = queryString.stringify(stringifyToIsoDate(object), QUERY_STRING_STRINGIFY_CONFIG);
      return query;
    }
  };

  const setInnerValue = (name: string, value: any) => {
    form.setValue(name as Path<TForm>, value as UnpackNestedValue<PathValue<TForm, Path<TForm>>>);
  };

  return {
    // events
    onSubmit: form.handleSubmit(onSubmit),
    onReset: () => reset(),
    onPageChanged,
    // useSearchResult
    results: search.results,
    setResults: search.setResults,
    count: search.count,
    pageCount: _.ceil(search.count / defaultModel.limit),
    searched: searched,
    // useForm
    watch: form.watch,
    getValues: form.getValues,
    setValue: setInnerValue,
    formState: form.formState,
    control: form.control,
  };
};

export default useSearchForm;
