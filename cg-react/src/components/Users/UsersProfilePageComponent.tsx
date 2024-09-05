import { useEffect, useState } from "react";
import add from "../../assets/icons/add.svg";
import ModalTemplatePost from "../Posts/ModalTemplatePost";
import CloseFriendModal from "./CloseFriendModal";
import ToggleMenu from "../ToggleMenu";
import Dots from "../../assets/icons/Dots.svg";
import ModalTemplate from "../ModalTemplate";
import BlockingModal from "./BlockingModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FetchOthersProfile } from "./FetchOthersProfile";
import { useSearchParams } from "react-router-dom";
import { followUser } from "./followUser";
import { ClipLoader } from "react-spinners";
import { unfollowUser } from "./unfollowUser";
import ShowPostsComponent from "../Posts/ShowPostsComponent";
import { defaultProfile } from "../../user-actions/atoms";
import CustomButton from "../CustomButton";
import blockingIcon from "../../assets/icons/blockUser.svg";
import addToCloseFriendsIcon from "../../assets/icons/addToCloseFriends.svg";
import removeFromCloseFriendsIcon from "../../assets/icons/removeFromCloseFriends.svg";

export default function UsersProfilePageComponent() {
  type FollowingStatus = "Followed" | "NotFollowed" | "PendingApproval";

  const [token, setToken] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  const [userId, setUserId] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [clickedFollow, setClickedFollow] = useState(false);
  const [iconVisible, setIconVisible] = useState(true);
  const [BlockModal, setBlockModal] = useState(false);
  const [CloseFriendModalSate, setCloseFriendModalSate] = useState(false);
  const [NotCloseFriendModalSate, setNotCloseFriendModalSate] = useState(false);
  const [followingStatus, setFollowingStatus] =
    useState<FollowingStatus>("NotFollowed");
  const queryClient = useQueryClient();
  // useEffect(() => {
  //   if (BlockModal) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "unset";
  //   }
  // }, [BlockModal]);

  // const handleBlockModal = () => {
  //   setBlockModal((prevState) => !prevState);
  // };

  useEffect(() => {
    if (CloseFriendModalSate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [CloseFriendModalSate]);
  const handleCloseFriendModal = () => {
    setCloseFriendModalSate((prevState) => !prevState);
  };

  // useEffect(() => {
  //   if (NotCloseFriendModalSate) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "unset";
  //   }
  // }, [NotCloseFriendModalSate]);

  // const handleNotCloseFriendModalSate = () => {
  //   setNotCloseFriendModalSate((prevState) => !prevState);
  // };
  const handleButtonClicked = async () => {
    if (
      followingStatus === "Followed" ||
      followingStatus === "PendingApproval"
    ) {
      await unfollowRefetch();
      queryClient.invalidateQueries({ queryKey: ["othersProfile", username] });
    } else {
      await followRefetch();
      queryClient.invalidateQueries({ queryKey: ["othersProfile", username] });
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || " ");
  }, []);

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
    }
  }, [userData]);
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
    if (followingStatus !== "NotFollowed") {
      setIconVisible(false);
    }
  }, [followingStatus]);
  if (userPending) {
    return <span>Loading...</span>;
  }

  if (userError) {
    return <span>Error: {userErrorMsg.message}</span>;
  }

  const getButtonProperties = (status: FollowingStatus) => {
    if (status === "Followed") {
      return {
        text: "دنبال نکردن",
        className:
          "bg-khakeshtari-100 ml-1 border border-okhra-200 !text-okhra-200",
      };
    } else if (status === "PendingApproval") {
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
      <div className=" border-b border-khakeshtari-400 py-9 max-sm:ml-8 max-sm:mr-8">
        <div className="flex items-center justify-between space-x-4 max-sm:flex-col">
          <div className="flex w-full items-center gap-8">
            <img
              src={
                userData.data.avatar && userData.data.avatar.url
                  ? userData.data.avatar.url
                  : defaultProfile.avatar
              }
              alt="avatar"
              className="aspect-square h-[136px] w-[136px] rounded-full border-2 border-khakeshtari-400 object-cover max-sm:h-[56px] max-sm:w-[56px] max-sm:self-baseline"
            />
            <div className="ml-4 w-full">
              <p className="text-right text-sm text-tala" dir="ltr">
                {`@${userData.data.username}`}
              </p>
              <div className="mt-4 flex items-center gap-x-3">
                <h3 className="text-xl font-bold text-sabz-100">
                  {`${userData.data.firstName || ""} ${userData.data.lastName || ""}`}
                </h3>

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
                  <span className="border-l pl-3">
                    {userData.data.followersCount} دنبال کننده
                  </span>
                  <span className="border-l pl-3">
                    {userData.data.followingsCount} دنبال شونده
                  </span>
                  <span className="pl-3">{userData.data.postsCount} پست</span>
                </div>
                <ToggleMenu imgSrc={Dots}>
                  <ul>
                    <li className="hover:bg-khakeshtari-600 rounded-md flex cursor-pointer flex-row items-center px-4 py-2">
                      <img
                        src={addToCloseFriendsIcon}
                        alt="add to close friends"
                        className="h-5 w-5"
                      />
                      <p className="pr-4">افزودن به دوستان نزدیک</p>
                    </li>
                    <li className="hover:bg-khakeshtari-600 rounded-md flex cursor-pointer flex-row items-center px-4 py-2">
                      <img
                        src={blockingIcon}
                        alt="block user"
                        className="h-5 w-5"
                      />
                      <p className="pr-4">بلاک کردن</p>
                    </li>
                  </ul>
                </ToggleMenu>
              </div>
              <p className="mt-4 text-sm text-khakeshtari-400 max-sm:justify-self-center">
                {userData.data.bio}
              </p>
            </div>
          </div>

          {CloseFriendModalSate && (
            <ModalTemplatePost
              onClose={() => setCloseFriendModalSate(false)}
              showModal={CloseFriendModalSate}
            >
              {/* <BlockingModal name={"Arefe"}></BlockingModal> */}
              <CloseFriendModal name={"Arefe"}></CloseFriendModal>
              <div className="mt-8 flex flex-row self-end">
                <CustomButton
                  text="پشیمون شدم"
                  className="ml-4 !text-siah"
                  handleOnClick={() => setCloseFriendModalSate(false)}
                ></CustomButton>
                <CustomButton
                  text="آره حتما"
                  className="bg-okhra-200"
                  handleOnClick={() => setCloseFriendModalSate(false)}
                ></CustomButton>
              </div>
            </ModalTemplatePost>
          )}
        </div>
      </div>
      {userData.data.isPrivate === true && followingStatus !== "Followed" && (
        <div className="my-8 flex h-64 flex-grow flex-col items-center justify-center">
          <h3 className="py-8 text-center text-2xl">
            {`برای دیدن صفحه ${userData.data.username} باید دنبالش کنی.`}
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
      {(userData.data.isPrivate === false ||
        followingStatus === "Followed") && (
        <ShowPostsComponent username={userData.data.username} />
      )}
    </div>
  );
}
