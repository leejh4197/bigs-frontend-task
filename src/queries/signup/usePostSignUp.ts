import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PostSignUp } from "../../api/api";
import { SignUpType } from "../../types/signUpType";

const usePostSignUp = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ["postSignUp"],
    mutationFn: ({ username, name, password, confirmPassword }: SignUpType) =>
      PostSignUp({ username, name, password, confirmPassword }),
    retry: false,
    onSuccess: (data) => {
      queryClient.setQueryData(["postSignUp"], data);
      alert("회원가입 성공!");
      navigate("/");
    },
    onError: () => {
      alert("중복된 아이디 입니다.");
    },
  });

  return { mutate, data, isPending, isError, error };
};

export default usePostSignUp;
