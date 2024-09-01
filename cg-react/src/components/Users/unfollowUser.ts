import axios from "axios";

export const unfollowUser = async (token: string, userId: string) => {
  const response = await axios.delete(
    `http://5.34.194.155:4000/users/unfollow/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
