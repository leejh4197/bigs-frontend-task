import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { sidBarContent } from "../dummy/sideBar";

const SideBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handlePathClick = (path: string) => {
    navigate(path);
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
    alert("로그아웃 완료!");
    navigate("/");
  };
  return (
    <>
      <div className="flex justify-around border-b mt-5">
        {sidBarContent.map((el, index) => (
          <button
            className={`py-2 px-10 bg-mainColor text-white hover:bg-subColor hover:text-black ${
              el.path === pathname && "bg-subColor"
            }`}
            key={index}
            onClick={
              el.name === "로그아웃"
                ? handleLogoutClick
                : () => handlePathClick(el.path)
            }
          >
            {el.name}
          </button>
        ))}
      </div>
      <Outlet />
    </>
  );
};
export default SideBar;
