import CustomButtonH36 from "./ButtonComponentH36";
import CustomButtonH52 from "./ButtonComponentH52";
import ShowPostsComponent from "./ShowPostsComponent";
import defaultAvatar from "../assets/icons/defaultavatar.svg";
import { useState } from "react";
import React from "react";

export default function ProfilePageComponent() {
  const [userId, setUserId] = useState("@defaultID");
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [userName, setUserName] = useState("نام و نشان");
  const [postCount, setPostCount] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [followings, setFollowings] = useState(0);
  const [bio, setBio] = useState(
    "برای شخصی سازی این متن با ویرایش پروفایل بایو خود را تغییر دهید",
  );

  return (
    <div dir="rtl">
      <div className="border-b border-khakeshtari-400 py-9 ml-16 max-sm:ml-8 max-sm:mr-8">
        <h2 className="mb-9 block font-bold text-xl font-isf max-sm:hidden ">صفحه من</h2>
        <div className="flex items-center justify-between space-x-4 max-sm:flex-col">
          <div className="flex items-center gap-8">
            <img
              src={avatar}
              alt="avatar"
              className="h-[8.5rem] w-[8.5rem] rounded-full border-2 border-khakeshtari-400 max-sm:h-[56px] max-sm:w-[56px]  max-sm:self-baseline"
            />
            <div className="ml-4 ">
              <p className="text-right  text-sm text-tala" dir="ltr">
                {userId}
              </p>
              <h3 className="text-xl mt-4 font-bold text-sabz-100">{userName}</h3>
              <div className="flex mt-4 gap-x-3 text-sm font-normal text-sabz-200">
                <span className="border-l pl-3">{followers} دنبال کننده</span>
                <span className="border-l pl-3">{followings} دنبال شونده</span>
                <span className=" pl-3">{postCount} پست</span>
              </div>
              <p className="mt-4 text-sm text-khakeshtari-500 max-sm:justify-self-center" >{bio}</p>
            </div>
          </div>
          <CustomButtonH52 text="ویرایش پروفایل" styling="bg-okhra-200" />
        </div>
      </div>
      <ShowPostsComponent />
    </div>
  );
}
