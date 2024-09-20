import axios from "axios";

export const FetchTagsSerachSuggestion = async (token: string, query:string) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const response = await axios.get(`${API_BASE_URL}/posts/search/suggestion`, {
    params: {
      query: query,
      count: 3
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
