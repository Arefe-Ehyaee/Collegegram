import { atom } from 'recoil';
import defaultAvatar from '../assets/icons/defaultavatar.svg'

//auth atom:
interface AuthState {
    token: string | null;
}

const authAtom = atom<AuthState | null>({
    key: 'authAtom',
    default: null, 
});

export { authAtom };


//user atom:

export interface UserProfile {
    id: string;
    username: string;
    avatar: string;
    first_name: string;
    last_name:string;
    email?:string
    postsCount: number;
    followersCount: number;
    followingCount: number;
    bio: string;
    is_private?:boolean
}

export const defaultProfile: UserProfile = {
    id: 'defaultID',
    username: 'defaultID',
    avatar: defaultAvatar, 
    first_name: 'نام',
    last_name:'نشان',
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
    bio: 'برای شخصی سازی این متن با ویرایش پروفایل بایو خود را تغییر دهید',
    is_private:false
};

export const userProfileAtom = atom<UserProfile>({
    key: 'userProfileAtom',
    default: defaultProfile,
});