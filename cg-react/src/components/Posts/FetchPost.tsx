import axios from "axios";


export const FetchPost = async (token: string, id: string) => {


    const response = await axios.get(`http://5.34.194.155:4000/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}