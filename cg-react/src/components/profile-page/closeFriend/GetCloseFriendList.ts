import axios from "axios";



export const GetCloseFriendList = async ({pageParam = 1}, token: string) => {


    const response = await axios.get('http://5.34.194.155:4000/users/close-friends', {
        params: {
            page: pageParam,
            limit: 2,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

