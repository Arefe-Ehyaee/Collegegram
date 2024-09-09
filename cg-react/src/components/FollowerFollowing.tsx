import ToggleMenu from "./ToggleMenu";
import blockingIcon from "../assets/icons/blockUser.svg";
import addToCloseFriendsIcon from "../assets/icons/addToCloseFriends.svg";
import Dots from "../assets/icons/Dots.svg";
import { useEffect, useState } from "react";
import ModalTemplatePost from "./Posts/ModalTemplatePost";
import CloseFriendModal from "./Users/CloseFriendModal";
import CustomButton from "./CustomButton";
import BlockingModal from "./profile-page/Blocking/BlockingModal";
import defaultAvatar from '../assets/icons/defaultavatar.svg'

interface FollowerFollowingProps {
    name?: string;
    followersNumber?: number;
    avatar?: string;
}
export interface Follower {
    id?: string;
    avatar: string;
    username: string;
    first_name?: string;
    last_name?: string;
    postsCount: number,
    bio?: string;
    followersCount: number;
    followingsCount?: number;
  }
  

export const defaultProfile: Follower = {
    id: 'defaultID',
    username: 'defaultID',
    avatar: defaultAvatar, 
    first_name: 'نام',
    last_name:'نشان',
    postsCount: 0,
    followersCount: 0,
    followingsCount: 0,
};


const FollowerFollowing: React.FC<FollowerFollowingProps> = ({name, followersNumber, avatar}) => {

    const [BlockModal, setBlockModal] = useState(false);
    const [CloseFriendModalSate, setCloseFriendModalSate] = useState(false);
    
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

      
    return(
        <div className="flex gap-[93px] items-center justify-between py-4 border-b border-khakeshtari-700" dir="rtl">
            <div className="flex gap-[27px] items-center">
                <img src={avatar} alt="avatar" className="w-[56px] h-[56px] rounded-full" />
                <div>
                    <div className="font-isf text-[13px] text-sabz-400 leading-[21.48px] font-bold">{name}</div>
                    <div className="font-isf text-[11px] text-sabz-400 leading-[14.3px] font-normal pt-2" dir="rtl">{`${followersNumber }دنبال کننده ` }</div>
                </div>
            </div>

            <ToggleMenu imgSrc={Dots}>
                  <ul>
                    <li className="flex cursor-pointer flex-row items-center rounded-md px-4 py-2 hover:bg-khakeshtari-600">
                      <button onClick={handleCloseFriendModal}>
                        <img
                          src={addToCloseFriendsIcon}
                          alt="add to close friends"
                          className="h-5 w-5"
                        />
                        <p className="pr-4">افزودن به دوستان نزدیک</p>
                      </button>
                    </li>
                    <li className="flex cursor-pointer flex-row items-center rounded-md px-4 py-2 hover:bg-khakeshtari-600">
                      <button onClick={handleBlockModal}>
                        <img
                          src={blockingIcon}
                          alt="block user"
                          className="h-5 w-5"
                        />
                        <p className="pr-4">بلاک کردن</p>
                      </button>
                    </li>
                  </ul>
                </ToggleMenu>

                {CloseFriendModalSate && (
            <ModalTemplatePost
              onClose={() => setCloseFriendModalSate(false)}
              showModal={CloseFriendModalSate}
            >
              <CloseFriendModal
                name={defaultProfile.username}
                avatar={defaultProfile.avatar}
                followersCount={defaultProfile.followersCount}
              ></CloseFriendModal>
              <div className="mt-8 flex flex-row self-end">
                <CustomButton
                  text="پشیمون شدم"
                  className="ml-4 !text-siah"
                  handleOnClick={() => setCloseFriendModalSate(false)}
                ></CustomButton>
                <CustomButton
                  text="آره حتما"
                  className="bg-okhra-200"
                  // handleOnClick={() => setCloseFriendModalSate(false)}
                ></CustomButton>
              </div>
            </ModalTemplatePost>
          )}

          {BlockModal && (
            <ModalTemplatePost
              onClose={() => setBlockModal(false)}
              showModal={BlockModal}
            >
              <BlockingModal name={defaultProfile.username}
                avatar={defaultProfile.avatar}
                followersCount={defaultProfile.followersCount}></BlockingModal>
              <div className="mt-8 flex flex-row self-end">
                <CustomButton
                  text="پشیمون شدم"
                  className="ml-4 !text-siah"
                  handleOnClick={() => setBlockModal(false)}
                ></CustomButton>
                <CustomButton
                  text="آره حتما"
                  className="bg-okhra-200"
                  // handleOnClick={() => setCloseFriendModalSate(false)}
                ></CustomButton>
              </div>
            </ModalTemplatePost>
          )}
        </div>
    )
}


export default FollowerFollowing;
