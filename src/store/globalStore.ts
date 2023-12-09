import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { StoreKeys } from './config';

export interface IGlobal {
  modalInformation: {
    show: boolean;
    type: 'info' | 'edit' | 'add';
  };
}

export interface IGlobalStore extends IGlobal {
  setModalInformation: (modalInformation: IGlobal['modalInformation']) => void;
}

export const useGlobalStore = create(
  persist<IGlobalStore>(
    (set, get) => ({
      modalInformation: {
        show: false,
        type: 'info',
      },
      setModalInformation: (modalInformation: IGlobal['modalInformation']) => set(() => ({ modalInformation })),
    }),
    {
      name: StoreKeys.GLOBAL,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
