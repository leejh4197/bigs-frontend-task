import { useQuery } from "@tanstack/react-query";
import { GetBoardCate } from "../../api/api";

const useGetBoardCate = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getBoardCate"],
    queryFn: () => GetBoardCate(),
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isPending, isError, error };
};

export default useGetBoardCate;
