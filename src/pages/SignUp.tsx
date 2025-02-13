import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpInput from "../components/SignUpInput";
import usePostSignUp from "../queries/signup/usePostSignUp";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const { mutate: postSignUp } = usePostSignUp();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!%*#?&])[A-Za-z\d!%*#?&]{8,}$/;

  const handleSignUp = async () => {
    let isValid = true;

    if (!emailRegex.test(email)) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!passwordRegex.test(password)) {
      setPasswordError("8자 이상, 숫자, 영문자, 특수문자를 포함해야 합니다.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (name.trim() === "") {
      setNameError("이름을 입력해주세요.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!isValid) return;
    postSignUp({
      username: email,
      name: name,
      password: password,
      confirmPassword: confirmPassword,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          회원가입
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          이미 계정이 있나요?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-mainColor font-semibold hover:underline"
          >
            로그인
          </button>
        </p>

        <div className="mt-6 space-y-4">
          <SignUpInput
            title="이메일"
            inputType="email"
            value={email}
            setValue={setEmail}
            placeholder="example@naver.com"
            error={emailError}
          />
          <SignUpInput
            title="이름"
            inputType="text"
            value={name}
            setValue={setName}
            placeholder="이름을 입력해주세요."
            error={nameError}
          />
          <SignUpInput
            title="비밀번호"
            inputType="password"
            value={password}
            setValue={setPassword}
            placeholder="8자이상, 숫자, 영문자, 특수문자(!%*#?&) 1개 이상"
            error={passwordError}
          />
          <SignUpInput
            title="비밀번호 확인"
            inputType="password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            placeholder="비밀번호를 확인해주세요."
            error={confirmPasswordError}
          />
        </div>

        <button
          onClick={handleSignUp}
          className="w-full mt-6 bg-mainColor text-white py-3 rounded-lg font-semibold hover:bg-subColor transition"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignUp;
