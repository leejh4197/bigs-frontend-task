import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PostLogin } from "../../api/api";
import { LoginType } from "../../types/loginType";

const usePostLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ["postLogin"],
    mutationFn: ({ username, password }: LoginType) =>
      PostLogin({ username, password }),
    retry: false,
    onSuccess: (data) => {
      if (data?.accessToken && data?.refreshToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        alert("로그인 성공!");
        queryClient.setQueryData(["postLogin"], data);
        navigate("/home");
      }
    },
    onError: () => {
      alert("로그인 실패: 잘못된 정보입니다.");
    },
  });

  return { mutate, data, isPending, isError, error };
};

export default usePostLogin;
