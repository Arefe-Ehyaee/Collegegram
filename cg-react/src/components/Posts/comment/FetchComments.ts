import axios from "axios";


export const FetchComments = async ({pageParam = 1}, token: string, postId:string) => {


    const response = await axios.get(`http://5.34.194.155:4000/posts/${postId}/comments`, {
        params: {
            page: pageParam,
            limit: 9,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}