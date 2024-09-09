import { useState } from "react";
import defaultAvatar from "../assets/icons/defaultavatar.svg";
import angledpin from "../assets/icons/angled-pin.svg";
import bookmark from "../assets/icons/bookmark.svg";
import chat from "../assets/icons/chat.svg";
import bell from "../assets/icons/bell.svg";
import tags from "../assets/icons/tag.svg";
import explore from "../assets/icons/explore.svg";
import search from "../assets/icons/search.svg";
import addPostIcon from "../assets/icons/addposticon.svg";
import { userProfileAtom } from "../user-actions/atoms";
import { useRecoilValue } from "recoil";
import ModalTemplate from "./ModalTemplate";
import UploadPostsModal from "./upload-edit-posts/UploadPostsModal";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import moreSideNav from "../assets/icons/terms.svg";
import ToggleMenu from "./ToggleMenu";
import blockingIcon from "../assets/icons/blockUser.svg";
import addToCloseFriendsIcon from "../assets/icons/addToCloseFriends.svg";

export default function SideNavbarComponent() {
  const userProfile = useRecoilValue(userProfileAtom);
  const avatar = userProfile.avatar;
  const username = userProfile.username;
  const [uploadModal, setUploadModal] = useState(false);

  const navigate = useNavigate();

  const handleCreatePostClick = () => {
    setUploadModal(true);
  };
  return (
    <div
      dir="rtl"
      className="  flex flex-col items-center justify-center"
    >
      <div className="fixed flex flex-col items-center top-16 right-0 mr-24">
      <CustomButton
        text="ایجاد پست جدید"
        size="large"
        iconsrc={addPostIcon}
        className=" mb-8 bg-okhra-200"
        handleOnClick={handleCreatePostClick}
      ></CustomButton>
      <nav className=" fixed bottom-0 top-36 w-72 rounded-t-3xl border border-khakeshtari-400 bg-white p-9">
        <div className="mb-8 flex items-center">
          <img
            src={avatar}
            alt="avatar"
            className="aspect-square h-[56px] w-[56px] rounded-full border border-khakeshtari-400 object-cover"
          />
          <p className="mr-4">{username}</p>
        </div>

        <ul>
          <li className="flex items-center rounded-3xl p-4 hover:bg-khakeshtari-500">
            <img src={angledpin} alt="my page icon" className="ml-2" />
            <button onClick={() => navigate("/userprofile")}>صفحه من</button>
          </li>
          <li className="flex items-center rounded-3xl p-4 hover:bg-khakeshtari-500">
            <img src={bookmark} alt="bookmarks icon" className="ml-2" />
            <a href="#">ذخیره‌ها</a>
          </li>
          <li className="flex items-center rounded-3xl p-4 hover:bg-khakeshtari-500">
            <img src={chat} alt="chats icon" className="ml-2" />
            <a href="#">پیام‌ها</a>
          </li>
          <li className="flex items-center rounded-3xl p-4 hover:bg-khakeshtari-500">
            <img src={bell} alt="notifications icon" className="ml-2" />
            <a href="#">اعلانات</a>
          </li>
          <li className="flex items-center rounded-3xl p-4 hover:bg-khakeshtari-500">
            <img src={tags} alt="tags icon" className="ml-2" />
            <a href="#">تگ‌شده‌ها</a>
          </li>
        </ul>

        <ul className="mt-8 border-t border-khakeshtari-400 pt-8">
          <li className="flex items-center rounded-3xl p-4 hover:bg-khakeshtari-500">
            <img src={explore} alt="explore icon" className="ml-2" />
            <button onClick={() => navigate("/explore")}>اکسپلور</button>
          </li>
          <li className="flex items-center rounded-3xl p-4 hover:bg-khakeshtari-500">
            <img src={search} alt="search icon" className="ml-2" />
            <a href="">جست‌و‌جو</a>
          </li>
        </ul>
        <div className="flex pr-4 pt-16">
          <ToggleMenu imgSrc={moreSideNav}>
            <ul className="mt-8 border-t border-khakeshtari-400 pt-8">
              <li className="flex items-center rounded-3xl p-4 hover:bg-khakeshtari-500">
                <button onClick={() => navigate("/closeFriendsList")}>
                  <div className="flex">
                    <img
                      src={addToCloseFriendsIcon}
                      alt="add to close friends"
                      className="h-5 w-5"
                    />
                    <p className="pr-4">دوستان نزدیک</p>
                  </div>
                </button>
              </li>
              <li className="flex items-center rounded-3xl p-4 hover:bg-khakeshtari-500">
                <button onClick={() => navigate("/balckList")}>
                  <div className="flex">
                    <img
                      src={blockingIcon}
                      alt="block user"
                      className="h-5 w-5"
                    />
                    <p className="pr-4">بلاک کردن</p>
                  </div>
                </button>
              </li>
            </ul>
          </ToggleMenu>
          <p className="mr-2">بیشتر</p>
        </div>
      </nav>
      </div>
      {uploadModal && (
        <ModalTemplate
          showModal={uploadModal}
          onClose={() => setUploadModal(false)}
        >
          {" "}
          <UploadPostsModal onClose={() => setUploadModal(false)} />
        </ModalTemplate>
      )}
    </div>
  );
}
