import { useNavigate } from "react-router-dom";

const WriteBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/writeboard")}
      className="absolute right-1/4 -bottom-16 border px-10 py-3 rounded-full bg-mainColor text-white"
    >
      글쓰기
    </button>
  );
};

export default WriteBtn;
