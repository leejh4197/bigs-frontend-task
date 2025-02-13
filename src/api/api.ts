import { jwtDecode } from "jwt-decode";
import { LoginType } from "../types/loginType";
import { SignUpType } from "../types/signUpType";
import { baseInstance, userInstance } from "./instance";

interface CustomJwtPayload {
  username: string;
  name: string;
}

// 회원가입
export const PostSignUp = async (data: SignUpType) => {
  try {
    const response = await baseInstance.post("/auth/signup", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 로그인
export const PostLogin = async (data: LoginType) => {
  try {
    const response = await baseInstance.post("/auth/signin", data);
    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      const decodedToken: CustomJwtPayload = jwtDecode(accessToken);
      const { name, username } = decodedToken;

      localStorage.setItem("userInfo", JSON.stringify({ name, username }));
      return response.data;
    } else {
      throw new Error("로그인 실패");
    }
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

// 게시물리스트
export const GetBoardList = (page: number, size: number) =>
  userInstance.get(`/boards?page=${page}&size=${size}`).then((res) => res.data);

// 카테고리
export const GetBoardCate = () =>
  userInstance.get("/boards/categories").then((res) => res.data);

// 게시물 작성
export const PostBoardWrite = async (formData: FormData) => {
  try {
    const response = await userInstance.post("/boards", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("게시글 작성 실패:", error);
    throw error;
  }
};
// 게시물 조회
export const GetBoardItem = (id: number) =>
  userInstance.get(`/boards/${id}`).then((res) => res.data);

// 게시물 삭제
export const DeleteBoardItem = (id: number) =>
  userInstance.delete(`/boards/${id}`).then((res) => res.data);

// 게시물 수정

export const EditBoardItem = async (id: number, formData: FormData) => {
  try {
    const response = await userInstance.patch(`/boards/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("게시글 작성 실패:", error);
    throw error;
  }
};
