import axios from "axios";

export const PostAComment = async (token: string, postId: string | null, description: string, parentId?: string| null) => {
    const data: any = {
      description: description,
    };
  
    if (parentId) {
      data.parentId = parentId;
    }

    if (!parentId) {
        data.parentId = null
    }
  
    const response = await axios.post(
      `http://5.34.194.155:4000/posts/${postId}/comments`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return response.data;
  };