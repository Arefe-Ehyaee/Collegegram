import axios from "axios";


export const FetchPosts = async ({pageParam = 1}, token: string, username: string) => {


    const response = await axios.get('http://5.34.194.155:4000/posts', {
        params: {
            page: pageParam,
            limit: 9,
            username: username,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}