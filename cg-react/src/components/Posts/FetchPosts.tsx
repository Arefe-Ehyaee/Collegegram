import axios from "axios";


export const FetchPosts = async (token: string) => {


    const response = await axios.get('http://5.34.194.155:4000/posts', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}