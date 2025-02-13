import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type LoginInputType = {
  title: string;
  inputType: string;
  placeholder: string;
  setValue: (value: string) => void;
  value: string;
};

const LoginInput = ({
  title,
  inputType,
  placeholder,
  value,
  setValue,
}: LoginInputType) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-1/2 mb-5">
      <span className="font-bold mb-3">{title}</span>
      <div className="relative">
        <input
          className="outline-none border-b w-full"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue && setValue(e.target.value)}
          type={inputType === "password" && showPassword ? "text" : inputType}
        />
        {inputType === "password" && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};
export default LoginInput;
