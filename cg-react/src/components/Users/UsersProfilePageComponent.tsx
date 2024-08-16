import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userProfileAtom } from "../../user-actions/atoms";
import { useFetchWrapper } from "../../user-actions/fetch-wrapper";
import CustomButtonH32 from "../ButtonComponentH32";
import add from "../../assets/icons/add.svg";
import CustomButtonH36 from "../ButtonComponentH36";

export default function ProfilePageComponent() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);
  const fetchWrapper = useFetchWrapper();

  const [clickedFollow, setClickedFollow] = useState(false);
  const [iconVisible, setIconVisible] = useState(true);

  const handleButtonClicked = () => {
    setClickedFollow((prevState) => !prevState);
    setIconVisible((prevState) => !prevState);
  };

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetchWrapper.get(
          "http://5.34.194.155:4000/users/profile",
        );
        const profileData = response.data;
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          username:
            profileData.username !== null && profileData.username !== undefined
              ? profileData.username
              : prevProfile.username,
          avatar:
            profileData.avatar_url !== null &&
            profileData.avatar_url !== undefined
              ? profileData.avatar_url
              : prevProfile.avatar,
          first_name:
            profileData.first_name !== null &&
            profileData.first_name !== undefined
              ? profileData.first_name
              : prevProfile.first_name,
          last_name:
            profileData.last_name !== null &&
            profileData.last_name !== undefined
              ? profileData.last_name
              : prevProfile.last_name,

          bio:
            profileData.bio !== null && profileData.bio !== undefined
              ? profileData.bio
              : prevProfile.bio,
        }));
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }

    fetchUserProfile();
  }, [setUserProfile, showEditModal]);
  return (
    <div dir="rtl">
      <div className="ml-16 border-b border-khakeshtari-400 py-9 max-sm:ml-8 max-sm:mr-8">
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
              <div className="flex gap-x-3 items-center mt-4 ">
                <h3 className="text-xl font-bold text-sabz-100">
                  {`${userProfile.first_name} ${userProfile.last_name}`}
                </h3>
                <CustomButtonH32
                  text={clickedFollow ? "دنبال نکردن" : "دنبال کردن"}
                  iconsrc={iconVisible ? add : null}
                  styling={clickedFollow ? "bg-khakeshtari-100 ml-1 border border-okhra-200 text-okhra-200" : " bg-okhra-200 ml-1 text-white"}
                  handleOnClick={handleButtonClicked} 
                ></CustomButtonH32>
              </div>
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
        </div>
      </div>
    </div>
  );
}
