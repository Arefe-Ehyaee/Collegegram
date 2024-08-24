import axios from "axios";
import { UserProfile } from "../../user-actions/atoms";
import { Following } from "./ProfilePageComponent";


export const FetchFollowings = async (userId: string, token: string): Promise<Following[]> => {

    if(!userId) {
        throw new Error("User ID is required.")
    }
    const response = await axios.get('http://5.34.194.155:4000/users/${userId}/followings', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.following;
}