import axios from "axios";

export const unlikePost = async (token: string, postId: string) => {
  const response = await axios.delete(
    `http://5.34.194.155:4000/posts/${postId}/unlike`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
