import FollowerFollowing from "../../FollowerFollowing";
import defaultAvatar from "../../../assets/icons/defaultavatar.svg";
import { NavLink } from "react-router-dom";

export interface Follower {
  id?: string;
  avatar: string;
  username: string;
  first_name?: string;
  last_name?: string;
  postsCount: number;
  bio?: string;
  followersCount?: number;
  followingsCount?: number;
}

export const defaultProfile: Follower = {
  id: "defaultID",
  username: "defaultID",
  avatar: defaultAvatar,
  first_name: "نام",
  last_name: "نشان",
  postsCount: 0,
  followersCount: 0,
  followingsCount: 0,
};

export default function BlackListPageComponent() {
  return (
    <div dir="rtl" className="px-[72px] max-sm:pr-2">
      <div className="mt-10 flex justify-start max-sm:justify-center">
        <NavLink to="/closeFriendsList">
          <h2 className="block px-7 font-isf text-xl text-khakeshtari-400 max-sm:px-2">دوستان نزدیک</h2>
        </NavLink>

        <span>|</span>

        <NavLink to="/balckList">
          <h2 className="block px-7 font-isf text-xl max-sm:px-2">لیست سیاه</h2>
        </NavLink>
      </div>

      <div className="w-[344px] pt-16">
        <FollowerFollowing
          key={defaultProfile.id}
          name={defaultProfile.username}
          followersNumber={defaultProfile.followersCount}
          avatar={defaultProfile?.avatar}
        />
        <FollowerFollowing
          key={defaultProfile.id}
          name={defaultProfile.username}
          followersNumber={defaultProfile.followersCount}
          avatar={defaultProfile?.avatar}
        />
      </div>
    </div>
  );
}
