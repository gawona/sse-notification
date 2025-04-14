import axiosInstance from "../util/axiosInstance";

const axios = axiosInstance;

export interface UserInfoRequest {
  username: string;
  password: string;
}

export const signup = (data: UserInfoRequest) => axios.post('/signup', data);
export const login = (data: UserInfoRequest) => axios.post('/login', data);

