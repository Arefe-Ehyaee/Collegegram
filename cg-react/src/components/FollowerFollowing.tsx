import ToggleMenu from "./ToggleMenu";
import blockingIcon from "../assets/icons/blockUser.svg";
import addToCloseFriendsIcon from "../assets/icons/addToCloseFriends.svg";
import Dots from "../assets/icons/Dots.svg";
import { useEffect, useState } from "react";
import ModalTemplatePost from "./Posts/ModalTemplatePost";
import CloseFriendModal from "./profile-page/closeFriend/CloseFriendModal";
import CustomButton from "./CustomButton";
import BlockingModal from "./profile-page/Blocking/BlockingModal";
import defaultAvatar from "../assets/icons/defaultavatar.svg";
import UnCloseFriendModal from "./profile-page/closeFriend/UnCloseFriendModal";
import UnBlockingModal from "./profile-page/Blocking/UnBlockingModal";
import verified from "../assets/icons/_Verified.svg";

interface FollowerFollowingProps {
  name: string;
  followersNumber?: number;
  avatar?: string;
  isCloseFriend: boolean;
}
export interface Follower {
  id?: string;
  avatar: { url: string };
  username: string;
  first_name?: string;
  last_name?: string;
  postsCount: number;
  bio?: string;
  followersCount: number;
  followingsCount?: number;
}

const FollowerFollowing = ({
  name,
  followersNumber,
  avatar,
  isCloseFriend,
}: FollowerFollowingProps) => {
  const [BlockModal, setBlockModal] = useState(false);
  const [UnBlockModal, setUnBlockModal] = useState(false);
  const [CloseFriendModalState, setCloseFriendModalState] = useState(false);
  const [UnCloseFriendModalState, setUnCloseFriendModalState] = useState(false);
  console.log("closeFriendStatus", isCloseFriend);
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

  /////////////////////////////////////////////////////////////////////

  // useEffect(() => {
  //   if (CloseFriendModalState) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "unset";
  //   }
  // }, [CloseFriendModalState]);

  const handleCloseFriendModal = () => {
    setCloseFriendModalState((prevState) => !prevState);
  };

  // const handleCloseFriendAUser = () => {
  //   if (userData.data.followedStatus === "NotFollowing") {
  //     toast.warning("اول باید این کاربر رو دنبال کنی!");
  //   } else {
  //     closeFriendRefetch();
  //     queryClient.invalidateQueries({ queryKey: ["closeFriendUser", userId] });
  //     queryClient.invalidateQueries({ queryKey: ["othersProfile", username] });
  //     setCloseFriendModalState((prevState) => !prevState);
  //   }
  // };
  return (
    <div
      className="flex items-center justify-between gap-[93px] border-b border-grey-700 py-4"
      dir="rtl"
    >
      <div className="flex items-center gap-[27px]">
        <div className="relative aspect-square h-14 rounded-full object-cover">
          <img
            src={avatar ? avatar : defaultAvatar}
            alt="avatar"
            className="aspect-square h-14 w-14 rounded-full object-cover"
          />
          {isCloseFriend && (
            <img
              src={verified}
              alt="verified"
              className="absolute h-[20px] w-[20px] bottom-0 left-0"
            />
          )}
        </div>
        <div>
          <div className="font-isf text-[13px] font-bold leading-[21.48px] text-green-400">
            {name}
          </div>
          <div
            className="pt-2 font-isf text-[11px] font-normal leading-[14.3px] text-green-400"
            dir="rtl"
          >{`${followersNumber} دنبال کننده `}</div>
        </div>
      </div>

      <ToggleMenu imgSrc={Dots}>
        <ul>
          <li className="flex cursor-pointer flex-row items-center rounded-md px-4 py-2 hover:bg-grey-600">
            <button onClick={handleCloseFriendModal}>
              <img
                src={addToCloseFriendsIcon}
                alt="add to close friends"
                className="h-5 w-5"
              />
              <p className="pr-4">افزودن به دوستان نزدیک</p>
            </button>
          </li>
          <li className="flex cursor-pointer flex-row items-center rounded-md px-4 py-2 hover:bg-grey-600">
            <button onClick={handleBlockModal}>
              <img src={blockingIcon} alt="block user" className="h-5 w-5" />
              <p className="pr-4">بلاک کردن</p>
            </button>
          </li>
        </ul>
      </ToggleMenu>

      {CloseFriendModalState && (
        <ModalTemplatePost
          onClose={() => setCloseFriendModalState(false)}
          showModal={CloseFriendModalState}
        >
          <CloseFriendModal
            name={name}
            avatar={avatar}
            followersCount={followersNumber}
          ></CloseFriendModal>
          <div className="mt-8 flex flex-row self-end">
            <CustomButton
              text="پشیمون شدم"
              className="ml-4 !text-black-100"
              handleOnClick={() => setCloseFriendModalState(false)}
            ></CustomButton>
            <CustomButton
              text="آره حتما"
              className="bg-red-200"
              // handleOnClick={handleCloseFriendAUser}
            >
              {/* {closeFriendFetching && (
                    <ClipLoader color="#9b9b9b" size={20} />
                  )} */}
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
            name={name}
            avatar={avatar}
            followersCount={followersNumber}
          ></UnCloseFriendModal>
          <div className="mt-8 flex flex-row self-end">
            <CustomButton
              text="پشیمون شدم"
              className="ml-4 !text-black-100"
              // handleOnClick={handleUnCloseFriendAUser}
            ></CustomButton>
            <CustomButton
              text="آره حتما"
              className="bg-red-200"
              // handleOnClick={handleUnCloseFriendAUser}
            >
              {/* {uncloseFriendFetching && (
                    <ClipLoader color="#9b9b9b" size={20} />
                  )} */}
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
            name={name}
            avatar={avatar}
            followersCount={followersNumber}
          ></BlockingModal>
          <div className="mt-8 flex flex-row self-end">
            <CustomButton
              text="پشیمون شدم"
              className="ml-4 !text-black-100"
              handleOnClick={() => setBlockModal(false)}
            ></CustomButton>
            <CustomButton
              text="آره حتما"
              className="bg-red-200"
              // handleOnClick={handleBlockAUser}
            >
              {/* {blockFetching && <ClipLoader color="#9b9b9b" size={20} />} */}
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
            name={name}
            avatar={avatar}
            followersCount={followersNumber}
          ></UnBlockingModal>
          <div className="mt-8 flex flex-row self-end">
            <CustomButton
              text="پشیمون شدم"
              className="ml-4 !text-black-100"
              handleOnClick={() => setUnBlockModal(false)}
            ></CustomButton>
            <CustomButton
              text="آره حتما"
              className="bg-red-200"
              // handleOnClick={handleUnBlockAUser}
            >
              {/* {unblockFetching && <ClipLoader color="#9b9b9b" size={20} />} */}
            </CustomButton>
          </div>
        </ModalTemplatePost>
      )}
    </div>
  );
};

export default FollowerFollowing;
