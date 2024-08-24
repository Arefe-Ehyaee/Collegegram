import axios from "axios";


export const FetchFollowings = async (userId: string, token: string) => {

    if(!userId) {
        throw new Error("User ID is required.")
    }
    const response = await axios.get('http://5.34.194.155:4000/users/${userId}/followings', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data;
}