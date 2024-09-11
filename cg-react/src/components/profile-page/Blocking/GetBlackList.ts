import axios from "axios";



export const GetBlackList = async ({pageParam = 1}, token: string) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


    const response = await axios.get(`${API_BASE_URL}/users/blacklist`, {
        params: {
            page: pageParam,
            limit: 2,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}