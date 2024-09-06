import axios from "axios";


export const fetchExplore = async ({pageParam = 1}, token: string) => {


    const response = await axios.get('http://5.34.194.155:4000/users/explore', {
        params: {
            page: pageParam,
            limit: 9,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}