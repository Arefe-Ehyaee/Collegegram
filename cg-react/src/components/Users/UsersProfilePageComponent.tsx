import { useEffect, useState } from "react";
import add from "../../assets/icons/add.svg";
import ModalTemplatePost from "../Posts/ModalTemplatePost";
import CloseFriendModal from "../profile-page/closeFriend/CloseFriendModal";
import ToggleMenu from "../ToggleMenu";
import Dots from "../../assets/icons/Dots.svg";
import ModalTemplate from "../ModalTemplate";
import BlockingModal from "../profile-page/Blocking/BlockingModal";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FetchOthersProfile } from "./FetchOthersProfile";
import { useNavigate, useSearchParams } from "react-router-dom";
import { followUser } from "./followUser";
import { BeatLoader, ClipLoader } from "react-spinners";
import { unfollowUser } from "./unfollowUser";
import ShowPostsComponent from "../Posts/ShowPostsComponent";
import { defaultProfile, userProfileAtom } from "../../user-actions/atoms";
import CustomButton from "../CustomButton";
import blockingIcon from "../../assets/icons/blockUser.svg";
import addToCloseFriendsIcon from "../../assets/icons/addToCloseFriends.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import FollowerFollowing from "../FollowerFollowing";
import { FetchFollowers } from "../profile-page/FetchFollowers";
import { FetchFollowings } from "../profile-page/FetchFollowings";
import { useInView } from "react-intersection-observer";
import { BlockAUser } from "../profile-page/Blocking/BlockAUser";
import MenuLiOptionComponent from "../MenuLiOptionComponent";
import { UnBlockAUser } from "../profile-page/Blocking/UnBlockAUser";
import UnBlockingModal from "../profile-page/Blocking/UnBlockingModal";
import { CloseFriendAUser } from "../profile-page/closeFriend/CloseFriendAUser";
import { UnCloseFriendAUser } from "../profile-page/closeFriend/UnCloseFriendAUser";
import UnCloseFriendModal from "../profile-page/closeFriend/UnCloseFriendModal";
import verified from "../../assets/icons/_Verified.svg";

export interface Follower {
  id?: string;
  avatar: { url: string };
  username?: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  followersCount?: number;
}

export interface Following {
  id?: string;
  avatar: { url: string };
  username?: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  followersCount?: number;
}

export default function UsersProfilePageComponent() {
  type FollowStatus =
    | "Following"
    | "NotFollowing "
    | "Pending"
    | "isBlocked"
    | "Blocked";

  const [token, setToken] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  const [userId, setUserId] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [clickedFollow, setClickedFollow] = useState(false);
  const [iconVisible, setIconVisible] = useState(true);
  const [BlockModal, setBlockModal] = useState(false);
  const [UnBlockModal, setUnBlockModal] = useState(false);
  const [CloseFriendModalState, setCloseFriendModalState] = useState(false);
  const [UnCloseFriendModalState, setUnCloseFriendModalState] = useState(false);
  const [followingStatus, setFollowingStatus] =
    useState<FollowStatus>("NotFollowing ");
  const [followedStatus, setFollowedStatus] =
    useState<FollowStatus>("NotFollowing ");

  const queryClient = useQueryClient();
  const loggedUserData = useRecoilValue(userProfileAtom);
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);

  const [FollowerListModal, setFollowerListModal] = useState(false);
  const [FollowingListModal, setFollowingListModal] = useState(false);

  const [closeFriendStatus, setCloseFriendStatus] = useState(false);

  const { ref: followerRef, inView: followerInView } = useInView();
  const { ref: followingRef, inView: followingInView } = useInView();

  const navigate = useNavigate();

  const handleError = (error: any) => {
    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode === 401) {
        navigate("/login");
        toast.error("نیاز به ورود مجدد دارید!");
      } else if (statusCode === 400) {
        toast.error("خطایی رخ داد!");
        navigate("/error");
      } else if (statusCode === 500) {
        toast.error("خطایی رخ داد!");
        navigate("/error");
      } else if (error.response.data.message) {
        navigate("/error");
      } else if ( statusCode === 404) {
        toast.error("نام کاربری مورد نظر پیدا نشد");
        navigate("/error");
      }
       else if (error.response.data.message) {
        toast.error(`Error: ${error.response.data.message}`);
      } else if (error.response.statusText) {
        toast.error(`Error: ${error.response.statusText}`);
      } else {
        toast.error("Unexpected server error");
      }
    } else if (error.request) {
      toast.error("Network error");
    } else {
      toast.error(`Error: ${error.message}`);
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////////
  const {
    data: userData,
    isError: userError,
    isPending: userPending,
    error: userErrorMsg,
  } = useQuery({
    queryKey: ["othersProfile", username],
    queryFn: () => FetchOthersProfile(token || "", username as string),
    enabled: !!username,
  });
  useEffect(() => {
    if (userData && userData.data) {
      setUserId(userData.data.id);
      setFollowingStatus(userData.data.followingStatus);
      setFollowedStatus(userData.data.followedStatus);
      setCloseFriendStatus(userData.data.isCloseFriend);
      if (userData.data.username === loggedUserData.username) {
        navigate("/userprofile");
      }
    }
  }, [userData]);
  ////////////////////////////////////////////////////////////////////////
  const {
    data: followersData,
    fetchNextPage: fetchNextPageFollowers,
    hasNextPage: hasNextPageFollowers,
    isFetching: isFetchingFollowers,
    isError: isErrorFollowers,
    error: followersError,
    refetch: refetchFollowers,
  } = useInfiniteQuery({
    queryKey: ["followers", userData?.data.id],
    queryFn: async ({ pageParam = 1 }) =>
      FetchFollowers({ pageParam }, userData?.data.id || "", token || ""),
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.nextPage ?? undefined;
    },
    initialPageParam: 1,
    enabled: !!FollowerListModal && !!token,
  });

  useEffect(() => {
    if (followerInView && hasNextPageFollowers) {
      refetchFollowers();
    }
  }, [followerInView, hasNextPageFollowers, fetchNextPageFollowers]);
  /////////////////////////////////////////////////////////////////////////
  const {
    data: followingsData,
    fetchNextPage: fetchNextPageFollowing,
    hasNextPage: hasNextPageFollowing,
    isFetching: isFetchingFollowing,
    isError: isErrorFollowing,
    error: followingsError,
    refetch: refetchFollowing,
  } = useInfiniteQuery({
    queryKey: ["followings", userData?.data.id],
    queryFn: async ({ pageParam = 1 }) =>
      FetchFollowings({ pageParam }, userData?.data.id || "", token || ""),
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.nextPage ?? undefined;
    },
    initialPageParam: 1,
    enabled: !!FollowingListModal && !!token,
  });

  useEffect(() => {
    if (followingInView && hasNextPageFollowing) {
      refetchFollowing();
    }
  }, [followingInView, hasNextPageFollowers, fetchNextPageFollowing]);

  ////////////////////////////////////////////////////////////////////
  const handleShowFollowers = () => {
    setFollowerListModal((prevState) => !prevState);
    if (!FollowerListModal) {
      queryClient.invalidateQueries({
        queryKey: ["followers", userProfile.id],
      });
      refetchFollowers();
    }
    console.log("followersData", followersData?.pages[0]);
  };

  const handleShowFollowings = () => {
    setFollowingListModal((prevState) => !prevState);
    if (!FollowingListModal) {
      queryClient.invalidateQueries({
        queryKey: ["followings", userProfile.id],
      });
      refetchFollowing();
    }
    console.log("followingData", followingsData);
    console.log("user data", userData.data);
  };
  ////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (BlockModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [BlockModal]);

  const handleBlockModal = () => {
    setBlockModal((prevState) => !prevState);
  };

  const handleBlockAUser = () => {
    blockRefetch();
    queryClient.invalidateQueries({ queryKey: ['posts', token, username] });
    // queryClient.invalidateQueries({ queryKey: ['blockUser', userId] });
    queryClient.invalidateQueries({ queryKey: ["othersProfile", username] });
    setBlockModal(false);
  };
  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (UnBlockModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [UnBlockModal]);

  const handleUnBlockModal = () => {
    setUnBlockModal((prevState) => !prevState);
  };

  const handleUnBlockAUser = () => {
    unblockRefetch();
    queryClient.invalidateQueries({ queryKey: ['posts', token, username] });
    // queryClient.invalidateQueries({ queryKey: ['unblockUser', userId] });
    queryClient.invalidateQueries({ queryKey: ["othersProfile", username] });
    setUnBlockModal(false);
  };
  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (CloseFriendModalState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [CloseFriendModalState]);

  const handleCloseFriendModal = () => {
    setCloseFriendModalState((prevState) => !prevState);
  };

  const handleCloseFriendAUser = () => {
    if (userData.data.followedStatus === "NotFollowing") {
      toast.warning("اول باید این کاربر رو دنبال کنی!");
    } else {
      closeFriendRefetch();
      queryClient.invalidateQueries({ queryKey: ["othersProfile", username] });
      setCloseFriendModalState((prevState) => !prevState);
    }
  };
  ///////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (UnCloseFriendModalState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [UnCloseFriendModalState]);

  const handleUnCloseFriendModalState = () => {
    setUnCloseFriendModalState((prevState) => !prevState);
  };

  const handleUnCloseFriendAUser = () => {
    uncloseFriendRefetch();
    queryClient.invalidateQueries({ queryKey: ["othersProfile", username] });
    setUnCloseFriendModalState((prevState) => !prevState);
  };

  ///////////////////////////////////////////////////////////////////////////////
  const handleButtonClicked = async () => {
    console.log("followingStatus", userData.data.followingStatus);
    if (followingStatus === "Blocked") {
      toast.error("این کاربر بلاکت کرده، پس نمیتونی دنبالش کنی!");
      return;
    } else if (followedStatus === "Blocked") {
      toast.error("این کاربر رو بلاک کردی، پس نمیتونی دنبالش کنی!");
      return;
    } else if (
      followingStatus === "Following" ||
      followingStatus === "Pending"
    ) {
      await unfollowRefetch();
      queryClient.invalidateQueries({ queryKey: ["othersProfile", username] });
    } else {
      await followRefetch();
      queryClient.invalidateQueries({ queryKey: ["othersProfile", username] });
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || " ");
  }, []);

  /////////////////////////////////////////////////////////////////////////////////////
  const {
    data: blockData,
    isError: blockError,
    isFetching: blockFetching,
    refetch: blockRefetch,
    isSuccess: blockisSuccess,
  } = useQuery({
    queryKey: ["blockUser", userId],
    queryFn: () => BlockAUser(token || "", userId as string),
    enabled: false,
  });
  /////////////////////////////////////////////////////////////////////////////////////
  const {
    data: unblockData,
    isError: unblockError,
    isFetching: unblockFetching,
    refetch: unblockRefetch,
  } = useQuery({
    queryKey: ["unblockUser", userId],
    queryFn: () => UnBlockAUser(token || "", userId as string),
    enabled: false,
  });
  /////////////////////////////////////////////////////////////////////////////////////
  const {
    data: closeFriendData,
    isError: closeFriendError,
    isFetching: closeFriendFetching,
    refetch: closeFriendRefetch,
  } = useQuery({
    queryKey: ["closeFriendUser", userId],
    queryFn: () => CloseFriendAUser(token || "", userId as string),
    enabled: false,
  });
  /////////////////////////////////////////////////////////////////////////////////////
  const {
    data: uncloseFriendData,
    isError: uncloseFriendError,
    isFetching: uncloseFriendFetching,
    refetch: uncloseFriendRefetch,
  } = useQuery({
    queryKey: ["unCloseFriendUser", userId],
    queryFn: () => UnCloseFriendAUser(token || "", userId as string),
    enabled: false,
  });
  /////////////////////////////////////////////////////////////////////////////////////
  const {
    data: followData,
    isError: followError,
    isFetching: followFetching,
    refetch: followRefetch,
  } = useQuery({
    queryKey: ["followUser", userId],
    queryFn: () => followUser(token || "", userId as string),
    enabled: false,
  });
  const {
    data: unfollowData,
    isError: unfollowError,
    error: unfollowErrorMsg,
    isFetching: unfollowFetching,
    refetch: unfollowRefetch,
  } = useQuery({
    queryKey: ["unfollowUser", userId],
    queryFn: () => unfollowUser(token || "", userId as string),
    enabled: false,
  });

  useEffect(() => {
    if (followFetching || unfollowFetching) {
      setIconVisible(false);
    }
  }, [followFetching, unfollowFetching]);
  useEffect(() => {
    if (followingStatus !== "NotFollowing ") {
      setIconVisible(false);
    }
  }, [followingStatus]);

  if (userPending) {
    return (
      <div className="mx-auto">
        <BeatLoader />
      </div>
    );
  }

  if (userError) {
    handleError(userErrorMsg);
  }
  /////////////////////////////////////////////////////////////////////////////////////
  const getButtonProperties = (status: FollowStatus) => {
    if (followedStatus === "Blocked" || followingStatus === "Blocked") {
      return {
        text: "+ دنبال کردن",
        className: "bg-khakeshtari-700",
      };
    }

    if (status === "Following") {
      return {
        text: "دنبال نکردن",
        className:
          "bg-khakeshtari-100 ml-1 border border-okhra-200 !text-okhra-200",
      };
    } else if (status === "Pending") {
      return {
        text: "لغو درخواست",
        className:
          "bg-khakeshtari-100 ml-1 border border-okhra-200 !text-okhra-200",
      };
    } else {
      return {
        text: "دنبال کردن",
        className: "bg-okhra-200 ml-1 text-white",
      };
    }
  };
  const { text, className } = getButtonProperties(followingStatus);
  return (
    <div dir="rtl" className="md:px-16">
      <div className="border-b border-khakeshtari-400 py-9 max-sm:ml-8 max-sm:mr-8">
        <div className="flex items-center justify-between space-x-4 max-sm:flex-col">
          <div className="flex w-full items-center gap-8">
            <div className="relative h-[136px]  aspect-square object-cover rounded-full">
              
                <img
                  src={
                    userData.data.avatar && userData.data.avatar.url
                      ? userData.data.avatar.url
                      : defaultProfile.avatar
                  }
                  alt="avatar"
                  className="aspect-square h-[136px] w-[136px] rounded-full border-2 border-khakeshtari-400 object-cover max-sm:h-[56px] max-sm:w-[56px] max-sm:self-baseline"
                />
              
              {closeFriendStatus && (
                <img
                  src={verified}
                  alt="verified"
                  className="absolute bottom-2 left-4 h-[20px] w-[20px]"
                />
              )}
            </div>

            <div className="ml-4 w-full">
              <p className="text-right text-sm text-tala" dir="ltr">
                {`@${userData?.data.username}`}
              </p>
              <div className="mt-4 flex items-center gap-x-3">
                {userData.data.firstName && userData.data.lastName && (
                  <h3 className="text-xl font-bold text-sabz-100">
                    {`${userData.data.firstName} ${userData.data.lastName}`}
                  </h3>
                )}

                <CustomButton
                  text={text}
                  iconsrc={iconVisible ? add : null}
                  className={className}
                  handleOnClick={handleButtonClicked}
                  size="small"
                >
                  {(followFetching || unfollowFetching) && (
                    <ClipLoader color="#9b9b9b" size={20} />
                  )}
                </CustomButton>
              </div>
              <div className="flex items-center justify-between">
                <div className="mt-4 flex gap-x-3 text-sm font-normal text-sabz-200">
                  <button
                    className="border-l pl-3"
                    onClick={handleShowFollowers}
                  >
                    {userData?.data.followersCount} دنبال کننده
                  </button>
                  <button
                    className="border-l pl-3"
                    onClick={handleShowFollowings}
                  >
                    {userData?.data.followingsCount} دنبال شونده
                  </button>
                  <span className="pl-3">{userData?.data.postsCount} پست</span>
                </div>
                <ToggleMenu imgSrc={Dots}>
                  <ul>
                    {closeFriendStatus ? (
                      <MenuLiOptionComponent
                        text="حذف از دوستان نزدیک"
                        iconsrc={addToCloseFriendsIcon}
                        handleOnClick={handleUnCloseFriendModalState}
                      ></MenuLiOptionComponent>
                    ) : (
                      <MenuLiOptionComponent
                        text="افزودن به دوستان نزدیک"
                        iconsrc={addToCloseFriendsIcon}
                        handleOnClick={handleCloseFriendModal}
                      ></MenuLiOptionComponent>
                    )}

                    {followedStatus === "Blocked" ? (
                      <MenuLiOptionComponent
                        text="حذف از بلاک ها"
                        iconsrc={blockingIcon}
                        handleOnClick={handleUnBlockModal}
                      ></MenuLiOptionComponent>
                    ) : (
                      <MenuLiOptionComponent
                        text="بلاک کردن"
                        iconsrc={blockingIcon}
                        handleOnClick={handleBlockModal}
                      ></MenuLiOptionComponent>
                    )}
                  </ul>
                </ToggleMenu>
              </div>
              <p className="mt-4 text-sm text-khakeshtari-400 max-sm:justify-self-center">
                {userData?.data.bio}
              </p>
            </div>
          </div>

          {CloseFriendModalState && (
            <ModalTemplatePost
              onClose={() => setCloseFriendModalState(false)}
              showModal={CloseFriendModalState}
            >
              <CloseFriendModal
                name={userData?.data.username}
                avatar={userData?.data.avatar.url}
                followersCount={userData?.data.followersCount}
              ></CloseFriendModal>
              <div className="mt-8 flex flex-row self-end">
                <CustomButton
                  text="پشیمون شدم"
                  className="ml-4 !text-siah"
                  handleOnClick={() => setCloseFriendModalState(false)}
                ></CustomButton>
                <CustomButton
                  text="آره حتما"
                  className="bg-okhra-200"
                  handleOnClick={handleCloseFriendAUser}
                >
                  {closeFriendFetching && (
                    <ClipLoader color="#9b9b9b" size={20} />
                  )}
                </CustomButton>
              </div>
            </ModalTemplatePost>
          )}

          {UnCloseFriendModalState && (
            <ModalTemplatePost
              onClose={() => setUnCloseFriendModalState(false)}
              showModal={UnCloseFriendModalState}
            >
              <UnCloseFriendModal
                name={userData?.data.username}
                avatar={userData?.data.avatar.url}
                followersCount={userData?.data.followersCount}
              ></UnCloseFriendModal>
              <div className="mt-8 flex flex-row self-end">
                <CustomButton
                  text="پشیمون شدم"
                  className="ml-4 !text-siah"
                  handleOnClick={handleUnCloseFriendAUser}
                ></CustomButton>
                <CustomButton
                  text="آره حتما"
                  className="bg-okhra-200"
                  handleOnClick={handleUnCloseFriendAUser}
                >
                  {uncloseFriendFetching && (
                    <ClipLoader color="#9b9b9b" size={20} />
                  )}
                </CustomButton>
              </div>
            </ModalTemplatePost>
          )}

          {BlockModal && (
            <ModalTemplatePost
              onClose={() => setBlockModal(false)}
              showModal={BlockModal}
            >
              <BlockingModal
                name={userData?.data.username}
                avatar={userData?.data.avatar.url}
                followersCount={userData?.data.followersCount}
              ></BlockingModal>
              <div className="mt-8 flex flex-row self-end">
                <CustomButton
                  text="پشیمون شدم"
                  className="ml-4 !text-siah"
                  handleOnClick={() => setBlockModal(false)}
                ></CustomButton>
                <CustomButton
                  text="آره حتما"
                  className="bg-okhra-200"
                  handleOnClick={handleBlockAUser}
                >
                  {blockFetching && <ClipLoader color="#9b9b9b" size={20} />}
                </CustomButton>
              </div>
            </ModalTemplatePost>
          )}

          {UnBlockModal && (
            <ModalTemplatePost
              onClose={() => setBlockModal(false)}
              showModal={UnBlockModal}
            >
              <UnBlockingModal
                name={userData?.data.username}
                avatar={userData?.data.avatar.url}
                followersCount={userData?.data.followersCount}
              ></UnBlockingModal>
              <div className="mt-8 flex flex-row self-end">
                <CustomButton
                  text="پشیمون شدم"
                  className="ml-4 !text-siah"
                  handleOnClick={() => setUnBlockModal(false)}
                ></CustomButton>
                <CustomButton
                  text="آره حتما"
                  className="bg-okhra-200"
                  handleOnClick={handleUnBlockAUser}
                >
                  {unblockFetching && <ClipLoader color="#9b9b9b" size={20} />}
                </CustomButton>
              </div>
            </ModalTemplatePost>
          )}
        </div>
      </div>
      {userData.data.isPrivate === true && followingStatus !== "Following" && (
        <div className="my-8 flex h-64 flex-grow flex-col items-center justify-center">
          <h3 className="py-8 text-center text-2xl">
            {`برای دیدن صفحه ${userData?.data.username} باید دنبالش کنی.`}
          </h3>
          <CustomButton
            text={text}
            iconsrc={iconVisible ? add : undefined}
            className={className}
            handleOnClick={handleButtonClicked}
            size="large"
          >
            {(followFetching || unfollowFetching) && (
              <ClipLoader color="#9b9b9b" size={20} />
            )}
          </CustomButton>
        </div>
      )}
      {userData.data.followingStatus === "Blocked" && (
        <div className="my-8 flex h-64 flex-grow flex-col items-center justify-center">
          <h3 className="py-8 text-center text-2xl">
            {` نمی تونی ${userData?.data.username}  رو دنبال کنی. چون اون نمیخواهد دوست تو باشه!`}
          </h3>
        </div>
      )}
      {((userData.data.isPrivate === false &&
        userData.data.followingStatus !== "Blocked") ||
        followingStatus === "Following") && (
        <ShowPostsComponent username={userData?.data.username} />
      )}

      {FollowerListModal && (
        <ModalTemplate
          onClose={() => setFollowerListModal(false)}
          showModal={FollowerListModal}
        >
          <div className="pb-8 text-xl font-bold">دنبال کننده ها</div>
          {isFetchingFollowers && <BeatLoader />}
          <div className="max-h-[450px] overflow-y-scroll">
            {followersData &&
              !isFetchingFollowers &&
              followersData.pages.map((page) =>
                page.map((follower: Follower) => (
                  <FollowerFollowing
                    key={follower.id}
                    name={follower.username}
                    followersNumber={follower.followersCount}
                    avatar={follower?.avatar?.url}
                  />
                )),
              )}
          </div>
          <div className="flex justify-center" ref={followerRef}></div>
          <CustomButton
            text={"بستن"}
            className="mt-[34px] bg-okhra-200"
            handleOnClick={() => setFollowerListModal(false)}
          ></CustomButton>
        </ModalTemplate>
      )}

      {FollowingListModal && (
        <ModalTemplate
          onClose={() => setFollowingListModal(false)}
          showModal={FollowingListModal}
        >
          <div className="pb-8 text-xl font-bold">دنبال شونده ها</div>
          {isFetchingFollowing && <BeatLoader />}
          <div className="max-h-[450px] overflow-y-scroll">
            {followingsData &&
              !isFetchingFollowing &&
              followingsData?.pages.map((page) =>
                page?.map((following: Following) => (
                  <FollowerFollowing
                    key={following.id}
                    name={following.username}
                    followersNumber={following.followersCount}
                    avatar={following?.avatar?.url}
                  />
                )),
              )}
          </div>
          <div className="flex justify-center" ref={followingRef}></div>
          <CustomButton
            text={"بستن"}
            className="mt-[34px] bg-okhra-200"
            handleOnClick={() => setFollowingListModal(false)}
          ></CustomButton>
        </ModalTemplate>
      )}
    </div>
  );
}
