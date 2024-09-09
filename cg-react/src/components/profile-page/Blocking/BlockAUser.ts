import axios from "axios";

export const BlockAUser = async (token: string, userId: string) => {
  const response = await axios.post(
    `http://5.34.194.155:4000/users/${userId}/block`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
