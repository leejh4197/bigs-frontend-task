import { useEffect, useState } from "react";
import CustomPagination from "../components/common/CustomPagination";
import WriteBtn from "../components/WriteBtn";
import useGetBoardList from "../queries/writing/useGetBoardList";
import BoardItem from "../components/BoardItem";
import { BoardItemType } from "../types/boardItemType";

const Board = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data: BoardList, isPending } = useGetBoardList(page, pageSize);

  useEffect(() => {
    if (BoardList?.pageable.pageSize) {
      setPageSize(BoardList.pageable.pageSize);
    }
  }, [BoardList]);
  const handlePageClick = (selected: number) => {
    setPage(selected);
  };

  if (isPending)
    return <div className="flex justify-center">게시물 불러오는 중...</div>;
  if (!BoardList)
    return (
      <div className="flex justify-center">리스트를 불러올 수 없습니다.</div>
    );
  return (
    <div className="relative flex flex-col justify-center items-center">
      <div className="w-1/2 mt-5">
        <div className="w-full">
          <div className="w-full grid grid-cols-4 text-center font-bold bg-subColor py-2">
            <div className="w-20">NO.</div>
            <div>카테고리</div>
            <div>제목</div>
            <div>작성일</div>
          </div>

          {BoardList?.content.map((el: BoardItemType, index: number) => (
            <div key={el.id}>
              <BoardItem
                id={el.id}
                index={index}
                cate={el.category}
                title={el.title}
                time={el.createdAt}
              />
            </div>
          ))}
        </div>
        <WriteBtn />
        <CustomPagination
          totalPage={BoardList?.totalPages}
          forcePage={BoardList?.pageable.pageNumber}
          handlePageClick={handlePageClick}
        />
      </div>
    </div>
  );
};

export default Board;
