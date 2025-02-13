import { useState, useEffect } from "react";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      const { name, username } = parsedUserInfo;
      setName(name);
      setEmail(username);
    } else {
      console.log("사용자 정보가 없습니다.");
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <p className="font-bold text-3xl bg-subColor px-10 mt-10">유저이메일</p>
        <p className="animate-bounce text-2xl mt-5">{email}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="font-bold text-3xl bg-subColor px-10 mt-10">유저이름</p>
        <p className="animate-bounce text-2xl mt-5">{name}</p>
      </div>
    </div>
  );
};

export default Home;
