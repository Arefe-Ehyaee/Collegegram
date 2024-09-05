import axios from "axios";
import { Follower } from "./ProfilePageComponent";


export const FetchFollowers = async ({pageParam = 1}, userId: string, token: string) => {

    if(!userId) {
        throw new Error("User ID is required.")
    }
    const response = await axios.get(`http://5.34.194.155:4000/users/${userId}/followers`, {
        params: {
            page: pageParam,
            limit: 9,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.followers;
}