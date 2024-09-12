import axios from "axios";

export const FetchPosts = async ({ pageParam = 1 }: { pageParam: number }, token: string, username: string) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Return early if the token is invalid or missing
  if (!token || token.trim() === "" || token === "undefined" || token === "null") {
    console.warn("FetchPosts called without a valid token. Aborting request.");
    return null; // Or you can return an empty object, [] or other value depending on your needs
  }

  const response = await axios.get(`${API_BASE_URL}/posts`, {
    params: {
      page: pageParam,
      limit: 9,
      username: username,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
