import { create } from "zustand";
import { createBlogs } from "@/api/blogs";
import dayjs, { Dayjs } from "dayjs";

interface BlogFormState {
  title: string;
  slug: string;
  category: string;
  date: Dayjs | null;
  excerpt: string;
  content: string;
  author: string;
  file: File | null;
  isSubmitting: boolean;

  setTitle: (title: string) => void;
  setSlug: (slug: string) => void;
  setCategory: (category: string) => void;
  setDate: (date: Dayjs | null) => void;
  setExcerpt: (excerpt: string) => void;
  setContent: (content: string) => void;
  setAuthor: (author: string) => void;
  setFile: (file: File | null) => void;

  submit: () => Promise<void>;
  reset: () => void;
}

export const useBlogFormStore = create<BlogFormState>((set, get) => ({
  title: "",
  slug: "",
  category: "",
  date: dayjs(),
  excerpt: "",
  content: "",
  author: "",
  file: null,
  isSubmitting: false,

  setTitle: (title) => set({ title }),
  setSlug: (slug) => set({ slug }),
  setCategory: (category) => set({ category }),
  setDate: (date) => set({ date }),
  setExcerpt: (excerpt) => set({ excerpt }),
  setContent: (content) => set({ content }),
  setAuthor: (author) => set({ author }),
  setFile: (file) => set({ file }),

  submit: async () => {
    try {
      set({ isSubmitting: true });
      await createBlogs();
      alert("Blog submitted successfully!");
      get().reset();
    } catch (err) {
      console.error(err);
    } finally {
      set({ isSubmitting: false });
    }
  },

  reset: () =>
    set({
      title: "",
      slug: "",
      category: "",
      date: null,
      excerpt: "",
      content: "",
      author: "",
      file: null,
    }),
}));
