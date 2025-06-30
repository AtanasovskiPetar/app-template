import { useMutation as useReactQueryMutation } from "@tanstack/react-query";
import { useContext } from "react";

import { AuthContext } from "../setup/AuthProvider";
import { axiosInstance } from "../utils";

import type { AxiosResponse } from "axios";

type UseMutationProps<TData> = {
  url?: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
};

type RequestExtras = {
  urlPath?: string;
  fullUrl?: string;
};

const useMutation = <TResponse, TRequest = {}>({
  url,
  method,
  onSuccess,
  onError,
}: UseMutationProps<AxiosResponse<TResponse>>) => {
  const { token } = useContext(AuthContext);

  const mutation = useReactQueryMutation({
    throwOnError: false,
    mutationFn: async (
      body?: TRequest & RequestExtras,
    ): Promise<AxiosResponse<TResponse>> => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let requestUrl = url || "";
      if (body?.fullUrl) {
        requestUrl = body.fullUrl;
      } else if (body?.urlPath) {
        const cleanUrl = requestUrl.endsWith("/")
          ? requestUrl.slice(0, -1)
          : requestUrl;
        const path = body.urlPath.startsWith("/")
          ? body.urlPath
          : `/${body.urlPath}`;
        requestUrl = cleanUrl + path;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { fullUrl, urlPath, ...cleanBody } = body || {};

      return axiosInstance.request<TResponse>({
        method,
        url: requestUrl,
        data: cleanBody,
        headers,
      });
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const rawMessage = error?.response?.data?.message;
      const message = Array.isArray(rawMessage)
        ? rawMessage.join(", ")
        : rawMessage || "Bad request";

      error.message = message;
      onError?.(error);
    },
  });

  const mutateAsyncWithErrorHandling = async (
    data?: TRequest & { urlPath?: string; fullUrl?: string },
  ): Promise<AxiosResponse<TResponse> | undefined> => {
    try {
      const response = await mutation.mutateAsync(data);
      return response;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
  };

  return {
    ...mutation,
    mutateAsync: mutateAsyncWithErrorHandling,
  };
};

export default useMutation;
