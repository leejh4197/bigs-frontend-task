import axios from "axios";

export const baseInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

export const userInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

userInstance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("accessToken");
    const refreshToken = window.localStorage.getItem("refreshToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (refreshToken) {
      config.headers["Refresh"] = `Bearer ${refreshToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getNewToken = async () => {
  try {
    const refreshToken = window.localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("리프레시 토큰이 없습니다.");
    }

    const response = await baseInstance.post("/auth/refresh", {
      refreshToken: refreshToken,
    });

    window.localStorage.setItem("refreshToken", response.data.refreshToken);
    window.localStorage.setItem("accessToken", response.data.accessToken);

    return [
      window.localStorage.getItem("accessToken"),
      window.localStorage.getItem("refreshToken"),
    ];
  } catch (error) {
    console.error("토큰 갱신 중 오류 발생:", error);

    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("userInfo");

    window.dispatchEvent(new CustomEvent("refreshFailed"));

    throw new Error("Token refresh failed");
  }
};

userInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const { config } = error;

    if (
      !config._retry &&
      config.url !== "/auth/refresh" &&
      (error.response?.status === 401 || error.code === "ERR_NETWORK")
    ) {
      config._retry = true;

      try {
        const newToken = await getNewToken();
        if (newToken) {
          config.headers["Authorization"] = `Bearer ${newToken[0]}`;
          config.headers["Refresh"] = `Bearer ${newToken[1]}`;
        }
        return userInstance(config);
      } catch (newError) {
        console.error("토큰 갱신 실패:", newError);
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("refreshToken");
        window.localStorage.removeItem("userInfo");
        window.dispatchEvent(new CustomEvent("refreshFailed"));
        return Promise.reject(newError);
      }
    }

    return Promise.reject(error);
  }
);
