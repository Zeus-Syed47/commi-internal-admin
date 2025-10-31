// api/blogs.ts
import axiosInterceptorInstance from "@/utils/axios";
import { BLOGS } from "@/utils/routes/apiRoutes";
import { getHeaderWithAuth } from "./headerObj";
import { useBlogFormStore } from "@/store/blogStore";

export const createBlogs = async () => {
  try {
    const {
      title,
      slug,
      category,
      date,
      excerpt,
      content,
      author,
      file,
    } = useBlogFormStore.getState();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("category", category);
    if (date) formData.append("date", date?.toISOString() || "");
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("author", author);
    if (file) formData.append("file", file);

    const response = await axiosInterceptorInstance.post(BLOGS, formData, {
      headers: {
        Authorization: getHeaderWithAuth(),
        "Content-Type": "multipart/form-data",
      },
    });

    return response?.data ?? [];
  } catch (err) {
    console.error("createBlogs error:", err);
    throw err;
  }
};
