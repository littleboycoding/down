import create from "zustand";

export interface MarkdownStore {
  markdown: string | null;
  markdowns: string[] | null;
  setMarkdown: (markdown: string) => void;
  clearMarkdown: () => void;
}

const useMarkdownStore = create<MarkdownStore>((set) => ({
  markdown: null,
  markdowns: null,
  setMarkdown: async (markdown) => {
    const markdowns = markdown.split(/^===+$/m).map((m) => m.trim());

    set({ markdown, markdowns });
  },
  clearMarkdown: () => {
    set({ markdown: null, markdowns: null });
  },
}));

export default useMarkdownStore;
