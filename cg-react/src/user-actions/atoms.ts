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
    username: string;
    avatar: string;
    first_name: string;
    last_name:string;
    postCount: number;
    followers: number;
    followings: number;
    bio: string;
}

const defaultProfile: UserProfile = {
    username: 'defaultID',
    avatar: defaultAvatar, 
    first_name: 'نام',
    last_name:'نشان',
    postCount: 0,
    followers: 0,
    followings: 0,
    bio: 'برای شخصی سازی این متن با ویرایش پروفایل بایو خود را تغییر دهید',
};

export const userProfileAtom = atom<UserProfile>({
    key: 'userProfileAtom',
    default: defaultProfile,
});