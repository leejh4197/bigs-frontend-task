import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type SignUpInputType = {
  title: string;
  inputType: string;
  value: string;
  placeholder: string;
  setValue: (value: string) => void;
  error?: string;
};

const SignUpInput = ({
  title,
  inputType,
  value,
  setValue,
  placeholder,
  error,
}: SignUpInputType) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = inputType === "password";

  return (
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium mb-1">{title}</label>
      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : inputType}
          value={value}
          onChange={(e) => setValue && setValue(e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
            error ? "border-red-500 focus:ring-red-500" : "focus:ring-mainColor"
          }`}
          placeholder={placeholder}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SignUpInput;
