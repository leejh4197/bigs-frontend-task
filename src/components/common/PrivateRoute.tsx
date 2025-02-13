import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = window.localStorage.getItem("accessToken");

  if (!token) {
    alert("로그인이 필요한 페이지입니다.");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
