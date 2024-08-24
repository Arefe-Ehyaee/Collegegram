import axios from "axios";


export const FetchFollowers = async (userId: string, token: string) => {

    if(!userId) {
        throw new Error("User ID is required.")
    }
    const response = await axios.get('http://5.34.194.155:4000/users/${userId}/followers', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.data;
}