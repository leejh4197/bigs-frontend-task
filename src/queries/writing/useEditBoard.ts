import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { EditBoardItem } from "../../api/api";

const useEditBoard = () => {
  const navigate = useNavigate();

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ["editBoard"],
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      EditBoardItem(id, formData),
    retry: false,
    onSuccess: (_data, variables) => {
      alert("수정완료!");
      navigate(`/board/${variables.id}`);
    },
    onError: (error) => {
      alert(error);
    },
  });

  return { mutate, data, isPending, isError, error };
};

export default useEditBoard;
