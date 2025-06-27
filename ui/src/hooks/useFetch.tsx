import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils";
import { useContext, useMemo } from "react";
import { AuthContext } from "../setup/AuthProvider";
import { AxiosError } from "axios";

type UseFetchProps = {
  key: string;
  url: string;
  enabled?: boolean;
  retry?: number;
};

const fetcherFunction = async (url: string, token?: string) => {
  try {
    const result = await axiosInstance.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    });
    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

const useFetch = <T = any,>({
  key,
  url,
  enabled = true,
  retry = 0,
}: UseFetchProps) => {
  const { token } = useContext(AuthContext);

  const queryKey = useMemo(() => [key, token], [key, token]);

  const { data, error, isLoading, isFetching, status, refetch } = useQuery<T>({
    queryKey,
    queryFn: () => fetcherFunction(url, token),
    retry,
    enabled,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, error, isLoading, isFetching, status, refetch };
};

export default useFetch;
