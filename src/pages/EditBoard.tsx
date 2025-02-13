import { ChangeEvent, useEffect, useRef, useState } from "react";
import BoardCate from "../components/BoardCate";
import ImageUpload from "../components/ImageUpload";
import useGetBoardItem from "../queries/writing/useGetBoardItem";
import { useParams } from "react-router-dom";
import useEditBoard from "../queries/writing/useEditBoard";

const EditBoard = () => {
  const [title, setTitle] = useState("");
  const [cate, setCate] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const { id } = useParams();
  const { data: BoardDetail } = useGetBoardItem(Number(id));
  const { mutate: EditBoard } = useEditBoard();

  useEffect(() => {
    if (BoardDetail) {
      setTitle(BoardDetail.title);
      setContent(BoardDetail.content);
      setCate(BoardDetail.boardCategory);
    }

    if (BoardDetail?.imageUrl) {
      setPreviewImg(`https://front-mission.bigs.or.kr${BoardDetail.imageUrl}`);
    }
  }, [BoardDetail]);

  const handleBoardWrite = async () => {
    const formData = new FormData();
    formData.append(
      "request",
      new Blob(
        [
          JSON.stringify({
            title: title,
            content: content,
            category: cate,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (img) {
      formData.append("file", img);
    } else {
      try {
        const defaultImageResponse = await fetch("/noImg.png");
        const defaultImageBlob = await defaultImageResponse.blob();
        const defaultImageFile = new File([defaultImageBlob], "noImg.png", {
          type: "image/png",
        });
        formData.append("file", defaultImageFile);
      } catch (error) {
        console.error("기본 이미지를 가져오는 데 실패했습니다.", error);
      }
    }

    EditBoard({ id: Number(id), formData });
  };

  const handleResizeHeight = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setContent(value);
    if (textarea.current) {
      textarea.current.style.height = "auto";
      textarea.current.style.height = textarea.current.scrollHeight + "px";
    }
  };

  return (
    <div className="bg-subColor w-full justify-center flex flex-col items-center py-5">
      <div className="w-1/2">
        <div className="flex flex-col w-full">
          <div className="font-bold">
            제목<span className="text-red-500">*</span>
          </div>
          <input
            placeholder="제목을 입력해주세요."
            className="px-3 py-2"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <BoardCate cate={cate} setCate={setCate} />
        <div className="flex flex-col">
          <div className="font-bold">
            내용<span className="text-red-500">*</span>
          </div>
          <textarea
            placeholder="내용을 입력해주세요."
            className="px-5 py-5 resize-none"
            onChange={handleResizeHeight}
            value={content}
            ref={textarea}
            name=""
            id=""
            rows={1}
          ></textarea>
        </div>
        <div>
          <ImageUpload
            setUploadImg={setImg}
            uploadImg={img}
            previewImg={previewImg}
            setPreviewImg={setPreviewImg}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleBoardWrite}
            disabled={title === "" || content === "" || cate === ""}
            className="px-4 py-2 border mt-10 bg-mainColor text-white hover:bg-opacity-45 disabled:bg-gray-400"
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBoard;
