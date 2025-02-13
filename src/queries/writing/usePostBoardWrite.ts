import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PostBoardWrite } from "../../api/api";

const usePostBoardWrite = () => {
  const navigate = useNavigate();

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ["postBoardWrite"],
    mutationFn: (formData: FormData) => PostBoardWrite(formData),
    retry: false,
    onSuccess: () => {
      alert("작성완료!");
      navigate("/board");
    },
    onError: (error) => {
      alert(error);
    },
  });

  return { mutate, data, isPending, isError, error };
};

export default usePostBoardWrite;
