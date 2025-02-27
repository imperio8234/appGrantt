import {create} from 'zustand';

interface UserResponse {
  name: string;
  token: string;
  idUser: string;
}

interface PropsUser {
  user: UserResponse | null;
  logged: (value: UserResponse | null) => void; 
}

export const useUser = create<PropsUser>((set) => ({
  user: null,
  logged: (value: UserResponse | null) => set(() => ({ user: value })), 
}));
