import { useNavigate, useParams } from "react-router-dom";
import useGetBoardItem from "../queries/writing/useGetBoardItem";
import useDeleteBoardItem from "../queries/writing/useDeleteBoardItem";
import SkeletonUi from "../components/common/SkeletonUi";

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: BoardDetail, isFetching } = useGetBoardItem(Number(id));
  const { mutate: DeleteBoard } = useDeleteBoardItem();

  const formattedTime = new Date(BoardDetail?.createdAt).toLocaleString(
    "ko-KR",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );

  const handleDeleteClick = () => {
    if (confirm("삭제하시겠습니까?")) {
      DeleteBoard(Number(id));
    } else {
      return;
    }
  };
  const handleEditClick = () => {
    navigate(`/editboard/${Number(id)}`);
  };

  if (isFetching) {
    return <SkeletonUi />;
  }
  return (
    <div className="flex flex-col justify-center items-center py-10">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute -top-5 left-0 z-10"
          onClick={() => navigate("/board")}
        >
          <img src="/Back.png" alt="뒤로가기" className="w-6 h-6" />
        </button>

        <div className="text-xl font-semibold text-gray-700 mb-3">
          {BoardDetail?.boardCategory}
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-5">
          {BoardDetail?.title}
        </div>
        <div className="text-lg text-gray-800 mb-5">{BoardDetail?.content}</div>

        {BoardDetail?.imageUrl && (
          <div className="w-full flex justify-center mb-5">
            <img
              src={`${import.meta.env.VITE_BASE_URL}${BoardDetail?.imageUrl}`}
              alt="게시물 이미지"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}

        <div className="text-sm text-gray-500 mt-5">
          <div>작성일: {formattedTime}</div>
        </div>

        <div className="w-full flex justify-end mt-5">
          <button
            onClick={handleEditClick}
            className="px-5 py-2 hover:bg-opacity-40 rounded-full border mr-4 hover:bg-subColor"
          >
            수정
          </button>
          <button
            onClick={handleDeleteClick}
            className="px-5 py-2 hover:bg-opacity-40 rounded-full border mr-4 hover:bg-subColor text-red-500"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
