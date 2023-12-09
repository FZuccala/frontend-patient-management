import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { TUser } from '@/typings';
import { StoreKeys } from './config';

export interface IUsers {
  users: TUser[];
  selectedUser: TUser | null;
}

export interface IUserStore extends IUsers {
  hasError: boolean;
  setUsers: (users: TUser[]) => void;
  getUserById: (id: string) => TUser | undefined;
  setSelectedUser: (user: TUser | null) => void;
  setHasError: (hasError: boolean) => void;
}

export const useUserStore = create(
  persist<IUserStore>(
    (set, get) => ({
      hasError: false,
      users: [],
      selectedUser: null,
      setUsers: (users: TUser[]) => set(() => ({ users })),
      setSelectedUser: (selectedUser: TUser | null) => set(() => ({ selectedUser })),
      setHasError: (hasError: boolean) => set(() => ({ hasError })),
      getUserById: (id: string) => {
        const users = get().users;
        return users?.find((user) => user.id === id);
      },
    }),
    {
      name: StoreKeys.USERS,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
