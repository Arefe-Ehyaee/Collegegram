import axios from "axios";


export const FetchPosts = async (token: string, username: string, page: number=1, limit: number = 9) => {


    const response = await axios.get('http://5.34.194.155:4000/posts', {
        params: {
            page: page,
            limit: limit,
            username: username,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}