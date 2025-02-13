import useGetBoardCate from "../queries/writing/useGetBoardCate";

type BoardCateType = {
  setCate: React.Dispatch<React.SetStateAction<string>>;
  cate: string;
};

const BoardCate = ({ cate, setCate }: BoardCateType) => {
  const { data: BoardCate, isPending } = useGetBoardCate();

  if (isPending)
    return <div className="flex justify-center">카테고리 불러오는중...</div>;
  if (!BoardCate)
    return (
      <div className="flex justify-center">카테고리를 불러올 수 없습니다.</div>
    );
  return (
    <div className="flex flex-col w-1/2 gap-2 my-2">
      <div className="font-bold">
        카테고리를 선택해주세요<span className="text-red-500">*</span>
      </div>
      <div>
        {Object.entries(BoardCate).map(([key, value]) => (
          <button
            key={key}
            value={key}
            onClick={() => setCate(key)}
            className={`px-4 py-2 border rounded ${
              cate === key ? "bg-mainColor text-white" : "bg-white"
            } hover:bg-mainColor hover:text-white`}
          >
            {value as string}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BoardCate;
