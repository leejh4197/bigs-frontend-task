import { useNavigate } from "react-router-dom";

type BoardItemType = {
  cate: string;
  title: string;
  time: string;
  index: number;
  id: number;
};
const BoardItem = ({ cate, title, time, index, id }: BoardItemType) => {
  const navigate = useNavigate();
  const handleBoardItemClick = () => {
    navigate(`/board/${id}`);
  };

  const formattedTime = new Date(time).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <div
      className="grid grid-cols-4 text-center border-b border-gray-300 py-2 cursor-pointer hover:bg-gray-100"
      onClick={handleBoardItemClick}
    >
      <div className="w-20">{index + 1}</div>
      <div>{cate}</div>
      <div className="truncate">{title}</div>
      <div className="truncate">{formattedTime}</div>
    </div>
  );
};
export default BoardItem;
