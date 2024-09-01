import axios from "axios";

export const followUser = async (token: string, userId: string) => {
  const response = await axios.post(
    `http://5.34.194.155:4000/users/follow/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
