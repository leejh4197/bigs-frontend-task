import { useQuery } from "@tanstack/react-query";
import { GetBoardList } from "../../api/api";

const useGetBoardList = (page: number, size: number) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getBoardList", page, size],
    queryFn: () => GetBoardList(page, size),
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isPending, isError, error };
};

export default useGetBoardList;
