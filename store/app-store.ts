import { create } from "zustand";

type AppState = {
  followIndex: number | null;
  setFollowIndex: (idx: number | null) => void;
};

export const useAppStore = create<AppState>((set) => ({
  followIndex: null,
  setFollowIndex: (idx) => set({ followIndex: idx }),
}));

export default useAppStore;
