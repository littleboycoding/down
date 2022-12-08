import create from "zustand";

interface PageStore {
  page: number;
  next: () => void;
  previous: () => void;
  go: (slide: number) => void;
}

const usePageStore = create<PageStore>((set) => ({
  page: 1,
  next: () => {
    set(({ page: slide }) => ({
      page: slide + 1,
    }));
  },
  previous: () => {
    set(({ page: slide }) => ({
      page: slide - 1,
    }));
  },
  go: (slide) => {
    set({ page: slide });
  },
}));

export default usePageStore;
