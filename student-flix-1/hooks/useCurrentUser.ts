import useSWR from "swr";
// similar to react query; does not need any state management like Redux; first time you fetch api/current, it won't fetch again if data already exists
import fetcher from "@/lib/fetcher";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
