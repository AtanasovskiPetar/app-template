import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils";

type UseFetchProps = {
  key: string;
  url: string;
  retry?: number;
};

const fetcherFunction = async (url: string) => {
  //   const token = (await Auth.currentSession()).getIdToken().getJwtToken();

  const result = await axiosInstance.get(url, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  });

  return result.data;
};

const useFetch = ({ key, url, retry }: UseFetchProps) => {
  const { data, error, isLoading, isFetching, status, refetch } = useQuery({
    queryKey: [key],
    queryFn: () => fetcherFunction(url),
    retry: retry ?? 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, error, isLoading, isFetching, status, refetch };
};

export default useFetch;
