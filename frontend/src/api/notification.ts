import axiosInstance from "../util/axiosInstance";

const axios = axiosInstance;

export const notify = (adminId: string) => axios.get('/notify/toadmin', { params: { adminId } });
export const listOfNotification = () => axios.get('/notify/list');
export const readNotification = (id: number) => axios.patch(`/notify/read/${id}`);