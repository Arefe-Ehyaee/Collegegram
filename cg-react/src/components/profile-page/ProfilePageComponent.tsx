import { useEffect, useState } from "react";
import CustomButtonH52 from "../ButtonComponentH52";
import ShowPostsComponent from "../Posts/ShowPostsComponent";
import EditProfileModal from "./EditProfileModal";
import ModalTemplate from "../ModalTemplate";
import { useRecoilState } from "recoil";
import { userProfileAtom } from "../../user-actions/atoms";
import { useFetchWrapper } from "../../user-actions/fetch-wrapper";

export default function ProfilePageComponent() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);
  const fetchWrapper = useFetchWrapper();

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetchWrapper.get("http://5.34.194.155:4000/users/profile");
        const profileData = response.data
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          username:
            profileData.username !== null && profileData.username !== undefined
              ? profileData.username
              : prevProfile.username,
          avatar:
            profileData.avatar !== null && profileData.avatar !== undefined
              ? profileData.avatar
              : prevProfile.avatar,
          first_name:
            profileData.first_name !== null && profileData.first_name !== undefined
              ? profileData.first_name
              : prevProfile.first_name,
          last_name:
            profileData.last_name !== null && profileData.last_name !== undefined
              ? profileData.last_name
              : prevProfile.last_name,

          bio:
            profileData.bio !== null && profileData.bio !== undefined
              ? profileData.bio
              : prevProfile.bio,
              email:
              profileData.email !== null && profileData.email !== undefined
                ? profileData.email
                : prevProfile.email,
        }));
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }

    fetchUserProfile();
  }, [setUserProfile,showEditModal]);
  return (
    <div dir="rtl" className="px-16">
      <div className="border-b border-khakeshtari-400 py-9">
        <h2 className="mb-9 block font-isf text-xl font-bold max-sm:hidden">
          صفحه من
        </h2>
        <div className="flex items-center justify-between space-x-4 max-sm:flex-col">
          <div className="flex items-center gap-8">
            <img
              src={userProfile.avatar}
              alt="avatar"
              className="h-[136px] w-[136px] rounded-full border-2 border-khakeshtari-400 max-sm:h-[56px] max-sm:w-[56px] max-sm:self-baseline"
            />
            <div className="ml-4">
              <p className="text-right text-sm text-tala" dir="ltr">
                {`@${userProfile.username}`}
              </p>
              <h3 className="mt-4 text-xl font-bold text-sabz-100">
                {`${userProfile.first_name} ${userProfile.last_name}`}
              </h3>
              <div className="mt-4 flex gap-x-3 text-sm font-normal text-sabz-200">
                <span className="border-l pl-3">
                  {userProfile.followers} دنبال کننده
                </span>
                <span className="border-l pl-3">
                  {userProfile.followings} دنبال شونده
                </span>
                <span className="pl-3">{userProfile.postCount} پست</span>
              </div>
              <p className="mt-4 text-sm text-khakeshtari-400 max-sm:justify-self-center">
                {userProfile.bio}
              </p>
            </div>
          </div>
          <CustomButtonH52
            text="ویرایش پروفایل"
            styling="bg-okhra-200"
            handleOnClick={() => setShowEditModal(true)}
          />
        </div>
      </div>
      <ShowPostsComponent/>
      {showEditModal && (
        <ModalTemplate
          onClose={() => setShowEditModal(false)}
          mainComponent={
            <EditProfileModal
              onClose={() => setShowEditModal(false)}
              profileImage={userProfile.avatar}
            />
          }
          showModal={showEditModal}
        />
      )}
    </div>
  );
}
