import { useQuery } from "@tanstack/react-query";
import { GetBoardItem } from "../../api/api";

const useGetBoardItem = (id: number) => {
  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: ["getBoardItem"],
    queryFn: () => GetBoardItem(id),
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isPending, isError, error, isFetching };
};

export default useGetBoardItem;
