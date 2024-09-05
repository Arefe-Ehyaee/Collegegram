import { useEffect, useState } from "react";
import ShowPostsComponent from "../Posts/ShowPostsComponent";
import EditProfileModal from "./EditProfileModal";
import ModalTemplate from "../ModalTemplate";
import { useRecoilState } from "recoil";
import { userProfileAtom } from "../../user-actions/atoms";
import FollowerFollowing from "../FollowerFollowing";
import { useQuery } from "@tanstack/react-query";
import { FetchFollowers } from "./FetchFollowers";
import { FetchFollowings } from "./FetchFollowings";
import CustomButton from "../CustomButton";

export interface Follower {
  id?: string,
  avatar?: string,
  username?: string,
  firstName?: string,
  lastName?: string,
  bio?: string,
  followersCount?: number
}

export interface Following {
  id?: string,
  avatar?: string,
  username?: string,
  firstName?: string,
  lastName?: string,
  bio?: string,
  followersCount?: number
}

export default function ProfilePageComponent() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);

  const [token, setToken] = useState<string | null>(null);

  const [FollowerListModal, setFollowerListModal] = useState(false);
  const [FollowingListModal, setFollowingListModal] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || " ");
  }, []);

  useEffect(() => {
    if(FollowerListModal || FollowingListModal){
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [FollowerListModal, FollowingListModal])

  

  const {
    data: followersData,
    error: followersError,
    isFetching: isFetchingFollowers,
    refetch: refetchFollowers
  } = useQuery({
    queryKey: ['followers', userProfile.id],
    queryFn: () => FetchFollowers(userProfile.id || "", token || ""),
    enabled: false 
  });

  const {
    data: followingsData,
    error: followingsError,
    isFetching: isFetchingFollowings,
    refetch: refetchFollowings,
  } = useQuery({
    queryKey: ['followings', userProfile.id],
    queryFn: () => FetchFollowings(userProfile.id || "", token || ""),
    enabled: false 
  });

  console.log(followersData)
  console.log(followingsData)

  const handleShowFollowers = () => {
    setFollowerListModal(prevState => !prevState);
    if (!FollowerListModal){
      refetchFollowers();
    }
  }

  if (isFetchingFollowers) {
    return <span>Loading...</span>
  }

  if (followersError) {
    return <span>Error: {followersError.message}</span>
  }

  const handleShowFollowings = () => {
    setFollowingListModal(prevState => !prevState);
    if (!FollowingListModal){
      refetchFollowings();
    }
  }

  if (isFetchingFollowings) {
    return <span>Loading...</span>
  }

  if (followingsError) {
    return <span>Error: {followingsError.message}</span>
  }
  
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
              className="h-[136px] w-[136px] aspect-square object-cover rounded-full border-2 border-khakeshtari-400 max-sm:h-[56px] max-sm:w-[56px] max-sm:self-baseline"
            />
            <div className="ml-4">
              <p className="text-right text-sm text-tala" dir="ltr">
                {`@${userProfile.username}`}
              </p>
              <h3 className="mt-4 text-xl font-bold text-sabz-100">
                {`${userProfile.firstName} ${userProfile.lastName}`}
              </h3>
              <div className="mt-4 flex gap-x-3 text-sm font-normal text-sabz-200">
                <button className="border-l pl-3" onClick={handleShowFollowers}>
                  {userProfile.followersCount} دنبال کننده
                </button>
                <button className="border-l pl-3" onClick={handleShowFollowings}>
                  {userProfile.followingsCount} دنبال شونده
                </button>
                <span className="pl-3">{userProfile.postsCount} پست</span>
              </div>
              <p className="mt-4 text-sm text-khakeshtari-400 max-sm:justify-self-center">
                {userProfile.bio}
              </p>
            </div>
          </div>

          <CustomButton size="large" text="ویرایش پروفایل"
            className="bg-okhra-200"
            handleOnClick={() => setShowEditModal(true)}/>
        </div>
      </div>
      <ShowPostsComponent username={userProfile.username}/>
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
      {FollowerListModal && (
        <ModalTemplate onClose={() => setFollowerListModal(false)} showModal={FollowerListModal} >
          <div className="font-bold text-xl pb-8">دنبال کننده ها</div>
          <div className="max-h-[450px] overflow-y-scroll">
            {followingsData && !isFetchingFollowings && followingsData.map((follower: Follower) => {
              return <FollowerFollowing key={follower.id} name={follower.username} followersNumber={follower.followersCount} avatar={follower.avatar} />
            })}
          </div>
            <CustomButton text={"بستن"} className="bg-okhra-200 mt-[34px]" handleOnClick={() => setFollowerListModal(false)}></CustomButton>
        </ModalTemplate>  
      )}

      {FollowingListModal && (
      <ModalTemplate onClose={() => setFollowingListModal(false)} showModal={FollowingListModal} >
        <div className="font-bold text-xl pb-8">دنبال شونده ها</div>
        <div className="max-h-[450px] overflow-y-scroll">
          {followersData && !isFetchingFollowers && followersData.map((following: Following) => {
              return <FollowerFollowing key={following.id} name={following.username} followersNumber={following.followersCount} avatar={following.avatar}></FollowerFollowing>
          })}
        </div>
        <CustomButton text={"بستن"} className="bg-okhra-200 mt-[34px]" handleOnClick={() => setFollowingListModal(false)}></CustomButton>
      </ModalTemplate>  
      )}
    </div>
  );
}

