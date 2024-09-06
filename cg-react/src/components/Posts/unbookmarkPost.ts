import axios from "axios";

export const unbookmarkPost = async (token: string, postId: string) => {
  const response = await axios.delete(
    `http://5.34.194.155:4000/posts/${postId}/unbookmark`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
