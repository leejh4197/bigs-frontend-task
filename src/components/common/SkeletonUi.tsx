const SkeletonUi = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center py-10">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg relative">
        <button className="absolute -top-5 left-0 z-10">
          <img src="/Back.png" alt="뒤로가기" className="w-6 h-6" />
        </button>
        <div className="animate-pulse">
          <div className="text-sm bg-gray-100 mt-5 w-1/2 h-5"></div>
          <div className="text-sm bg-gray-100 mt-5 w-1/2 h-5"></div>
          <div className="text-sm bg-gray-100 mt-5 w-1/2 h-5"></div>
          <div className="text-sm bg-gray-100 mt-5 w-1/2 h-5"></div>
        </div>

        <div className="w-full flex justify-end mt-5">
          <button className="px-5 py-2 hover:bg-opacity-40 rounded-full border mr-4 hover:bg-subColor">
            수정
          </button>
          <button className="px-5 py-2 hover:bg-opacity-40 rounded-full border mr-4 hover:bg-subColor text-red-500">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkeletonUi;
