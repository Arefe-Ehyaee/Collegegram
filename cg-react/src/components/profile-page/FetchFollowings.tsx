import axios from "axios";
import { Following } from "./ProfilePageComponent";


export const FetchFollowings = async ({pageParam = 1}, userId: string, token: string) => {

    if(!userId) {
        throw new Error("User ID is required.")
    }
    const response = await axios.get(`http://5.34.194.155:4000/users/${userId}/followings`, {
        params: {
            page: pageParam,
            limit: 9,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.following;
}