import axios from "axios";

export const UnCloseFriendAUser = async (token: string, userId: string) => {
  const response = await axios.patch(
    `http://5.34.194.155:4000/users/close-friends/${userId}/remove`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

