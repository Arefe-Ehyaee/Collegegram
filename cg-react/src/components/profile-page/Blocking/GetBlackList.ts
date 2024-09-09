import axios from "axios";



export const GetBlackList = async ({pageParam = 1}, token: string) => {


    const response = await axios.get('http://5.34.194.155:4000/users/blacklist', {
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