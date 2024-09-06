import axios from "axios";

export const bookmarkPost = async (token: string, postId: string) => {
  const response = await axios.post(
    `http://5.34.194.155:4000/posts/${postId}/bookmark`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
