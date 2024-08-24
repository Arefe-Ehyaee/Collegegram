import axios from "axios";
import { UserProfile } from "../../user-actions/atoms";
import { Follower } from "./ProfilePageComponent";


export const FetchFollowers = async (userId: string, token: string): Promise<Follower[]> => {

    if(!userId) {
        throw new Error("User ID is required.")
    }
    const response = await axios.get('http://5.34.194.155:4000/users/${userId}/followers', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.followers;
}