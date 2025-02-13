import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { DeleteBoardItem } from "../../api/api";

const useDeleteBoardItem = () => {
  const navigate = useNavigate();

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ["deleteBoardItem"],
    mutationFn: (id: number) => DeleteBoardItem(id),
    retry: false,
    onSuccess: () => {
      alert("삭제완료!");
      navigate("/board");
    },
    onError: (error) => {
      alert(error);
    },
  });

  return { mutate, data, isPending, isError, error };
};

export default useDeleteBoardItem;
