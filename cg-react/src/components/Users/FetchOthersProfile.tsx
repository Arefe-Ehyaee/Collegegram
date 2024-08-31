import axios from "axios";

export const FetchOthersProfile = async (token: string, username: string) => {

    const response = await axios.get(`http://5.34.194.155:4000/users/profile?username=${username}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};