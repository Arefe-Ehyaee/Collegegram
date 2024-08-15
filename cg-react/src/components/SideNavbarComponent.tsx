import { useState } from "react";
import defaultAvatar from "../assets/icons/defaultavatar.svg";
import CustomButtonH52 from "./ButtonComponentH52";
import angledpin from "../assets/icons/angled-pin.svg";
import bookmark from "../assets/icons/bookmark.svg";
import chat from "../assets/icons/chat.svg";
import bell from "../assets/icons/bell.svg";
import tags from "../assets/icons/tag.svg";
import explore from "../assets/icons/explore.svg";
import search from "../assets/icons/search.svg";
import addPostIcon from "../assets/icons/addposticon.svg";
import {  userProfileAtom } from "../user-actions/atoms";
import { useRecoilValue } from "recoil";
import ModalTemplate from "./ModalTemplate";
import ProgressStepper from "./ProgressStepper";


export default function SideNavbarComponent() {
  const userProfile = useRecoilValue(userProfileAtom)  
  const avatar = userProfile.avatar
  const username = userProfile.username
  const [uploadModal,setUploadModal] = useState(false)

  const handleCreatePostClick = () => {
    setUploadModal(true)
  }
    return (
      <div dir="rtl" className="min-h-screen flex flex-col items-center mt-16">
        <CustomButtonH52
          text="ایجاد پست جدید"
          iconsrc={addPostIcon}
          styling="bg-okhra-200 mb-8"
          handleOnClick={handleCreatePostClick}
        ></CustomButtonH52>
        
        <nav className="bg-white border border-khakeshtari-400 rounded-t-3xl p-9 w-[70%] flex-grow ">
          <div className="flex items-center mb-8">
            <img
              src={avatar}
              alt="avatar"
              className="h-[56px] w-[56px] rounded-full border border-khakeshtari-400"
            />
            <p className="mr-4">{username}</p>
          </div>
          
          <ul >
            <li className="flex items-center hover:bg-khakeshtari-500 p-4 rounded-3xl">
              <img src={angledpin} alt="my page icon" className="ml-2" />
              <a href="#">صفحه من</a>
            </li>
            <li className="flex items-center hover:bg-khakeshtari-500 p-4 rounded-3xl">
              <img src={bookmark} alt="bookmarks icon" className="ml-2" />
              <a href="#">ذخیره‌ها</a>
            </li>
            <li className="flex items-center hover:bg-khakeshtari-500 p-4 rounded-3xl">
              <img src={chat} alt="chats icon" className="ml-2" />
              <a href="#">پیام‌ها</a>
            </li>
            <li className="flex items-center hover:bg-khakeshtari-500 p-4 rounded-3xl">
              <img src={bell} alt="notifications icon" className="ml-2" />
              <a href="#">اعلانات</a>
            </li>
            <li className="flex items-center hover:bg-khakeshtari-500 p-4 rounded-3xl">
              <img src={tags} alt="tags icon" className="ml-2" />
              <a href="#">تگ‌شده‌ها</a>
            </li>
          </ul>
  
          <ul className=" mt-8 pt-8 border-t border-khakeshtari-400">
            <li className="flex items-center p-4 hover:bg-khakeshtari-500 rounded-3xl">
              <img src={explore} alt="explore icon" className="ml-2" />
              <a href="">اکسپلور</a>
            </li>
            <li className="flex items-center hover:bg-khakeshtari-500 p-4 rounded-3xl">
              <img src={search} alt="search icon" className="ml-2" />
              <a href="">جست‌و‌جو</a>
            </li>
          </ul>
        </nav>
        {uploadModal && <ModalTemplate showModal={uploadModal} onClose={() => setUploadModal(false)}> <ProgressStepper currentStep={2}></ProgressStepper>
          </ModalTemplate>}
      </div>
    );
  }
  