import { create } from 'zustand';

interface UserState {
  role: string | null;
  accessToken: string | null;
  setRole: (role: string) => void;
  setAccessToken: (token: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  role: sessionStorage.getItem('role'),
  accessToken: sessionStorage.getItem('access_token'),
  setRole: (role) => set(() => {
    sessionStorage.setItem('role', role);
    return { role };
  }),
  setAccessToken: (token) => set(() => {
    sessionStorage.setItem('access_token', token);
    return { accessToken: token };
  }),
}));
