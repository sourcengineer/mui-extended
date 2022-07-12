import { useEffect, useMemo, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

const LOADER_DELAY_IN_MILLISECOND: number = 200;

export const useAxiosLoader = (defaultLoading: boolean = false) => {
  let timeoutId: NodeJS.Timeout;
  const [loading, setLoading] = useState(defaultLoading);

  const interceptors = useMemo(() => {
    const setLoadingWithDelay = (loading: boolean) => {
      clearTimeout(timeoutId);
      if (loading === true) {
        timeoutId = setTimeout(() => {
          setLoading(true);
        }, LOADER_DELAY_IN_MILLISECOND);
      } else {
        setLoading(false);
      }
    };

    return {
      // eslint-disable-next-line
      request: (config: AxiosRequestConfig) => (setLoadingWithDelay(true), config),
      // eslint-disable-next-line
      response: (response: AxiosRequestConfig) => (setLoadingWithDelay(false), response),
      // eslint-disable-next-line
      error: (error: any) => (setLoadingWithDelay(false), Promise.reject(error)),
    };
  }, []);

  useEffect(() => {
    const reqInterceptor = axios.interceptors.request.use(interceptors.request, interceptors.error);
    const resInterceptor = axios.interceptors.response.use(interceptors.response, interceptors.error);

    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [interceptors]);

  return loading;
};
