import { useNavigate } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { useState } from "react";
import usePostLogin from "../queries/login/usePostLogin";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: postLogin } = usePostLogin();

  const handleLoginBtn = () => {
    postLogin({
      username: email,
      password: password,
    });
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-center items-center w-1/2  bg-mainColor">
        <img
          className="rounded-2xl w-32 h-20 shadow-xl shadow-slate-500 "
          src="/Logo.png"
          alt="logo"
        />
        <span className="font-bold text-white text-2xl">BIGS ADMIN</span>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <LoginInput
          title="이메일"
          inputType="text"
          placeholder="이메일을 입력해주세요."
          value={email}
          setValue={setEmail}
        />
        <LoginInput
          title="비밀번호"
          inputType="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          setValue={setPassword}
        />
        <button className="mb-5" onClick={() => navigate("/signup")}>
          <span className="text-sm text-gray-400">회원이 아니신가요?</span>
        </button>
        <button
          onClick={handleLoginBtn}
          disabled={email === "" || password === ""}
          className="bg-mainColor w-1/2 py-3 rounded-full text-white disabled:bg-gray-200"
        >
          <span>로그인</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
