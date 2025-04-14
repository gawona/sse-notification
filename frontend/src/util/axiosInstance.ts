import axios, { AxiosInstance } from "axios";

const createAxiosInstance = (config = {}): AxiosInstance => {
  const defaultConfig = {
    baseURL: "http://localhost:8080",
    timeout: 10000,
    withCredentials: true,
  };

  const instance = axios.create({ ...defaultConfig, ...config });

  instance.interceptors.request.use(request => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        sessionStorage.clear();
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;