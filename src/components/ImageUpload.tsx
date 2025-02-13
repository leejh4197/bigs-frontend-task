import { useRef } from "react";

type ImageUploadType = {
  uploadImg: File | null;
  setUploadImg: React.Dispatch<React.SetStateAction<File | null>>;
  previewImg: string | null;
  setPreviewImg: React.Dispatch<React.SetStateAction<string | null>>;
};

const ImageUpload = ({
  setUploadImg,
  previewImg,
  setPreviewImg,
}: ImageUploadType) => {
  const imgClickRef = useRef<HTMLInputElement | null>(null);

  const onchangeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploadImg(file); // File 저장

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPreviewImg(reader.result); // 미리보기 이미지 저장
      }
    };
  };

  return (
    <div className="mt-10 flex w-1/2 items-center">
      {!previewImg && (
        <button
          className="border w-20 h-20"
          onClick={() => imgClickRef.current?.click()}
        >
          <img className="animate-pulse" src="/plusBtn.png" alt="" />
        </button>
      )}
      <input
        className="hidden"
        type="file"
        accept="image/*"
        onChange={onchangeImageUpload}
        ref={imgClickRef}
      />
      {previewImg ? (
        <div className="w-40 h-40 flex">
          <img
            className="w-full h-full object-cover"
            src={previewImg}
            alt="img"
          />
          <button
            onClick={() => {
              setUploadImg(null);
              setPreviewImg(null);
            }}
            className="flex w-5 h-5 items-center text-2xl text-MainColor"
          >
            x
          </button>
        </div>
      ) : (
        <div>대표 이미지를 첨부해주세요.</div>
      )}
    </div>
  );
};

export default ImageUpload;
