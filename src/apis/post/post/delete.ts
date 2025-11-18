import { req } from "@/apis/axiosInstance";
import type { globalResponse } from "@/models";

export const postDELETE = {
  postDelete: async (post_id: number): Promise<globalResponse<object>> => {
    const response = await req.delete(`/posts/${post_id}`);
    return response.data;
  },
<<<<<<< HEAD
};
=======
};
>>>>>>> 2892ef1 (feat: post api 함수 추가)
