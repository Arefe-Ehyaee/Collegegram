import defaultAvatar from "../../assets/icons/defaultavatar.svg";
import CustomButton from "../CustomButton";
import { getNotificationMessage } from "./getNotificationMessage";

export interface NotificationComponentprops {
  actor?: string;
  followersNumber?: number;
  avatar?: string;
  notifType:
    | "mention"
    | "comment"
    | "like"
    | "accept"
    | "request"
    | "reject"
    | "followedYou"
    | "followedOthers";
  receiver?: string;
  comment?: string;
  seen: boolean;
}



const MyNotificationComponent = ({
  actor,
  avatar,
  followersNumber,
  notifType,
  receiver,
  comment,
  seen
}: NotificationComponentprops) => {
  return (
    <div
      className={`${seen ? "bg-grey-100 border-none" : "bg-lavender border-grey-700"} my-4 flex h-[64px] items-center justify-between gap-[93px] rounded-full border-b`}
      dir="rtl"
    >
      <div className="flex items-center gap-[27px]">
        <img
          src={avatar}
          alt="avatar"
          className="h-[64px] w-[64px] rounded-full"
        />
        <div>
          <div className="font-isf text-[13px] font-bold leading-[21.48px] text-green-400">
            {getNotificationMessage(notifType, actor, receiver)}
          </div>
          {notifType === "comment" && (
            <>
              <div
                className="pt-1 font-isf text-[11px] font-normal leading-[14.3px] text-green-400 line-clamp-1"
                dir="rtl"
              >{comment}</div>
            </>
          )}
          <div
            className="pt-2 font-isf text-[11px] font-normal leading-[14.3px] text-green-400"
            dir="rtl"
          >{/*CreatedDate*/}</div>
        </div>
        {(notifType === "followedYou" || notifType === "followedOthers") && (
          <CustomButton
            text="+ دنبال کردن"
            className="bg-red-200"
            // handleOnClick={}
          ></CustomButton>
        )}

        {notifType === "request" && (
          <>
            <CustomButton
              text="قبولههه"
              className="bg-red-200"
              // handleOnClick={}
            ></CustomButton>
            <CustomButton
              text="خوشم نمیاد ازش"
              className="bg-red-200"
              // handleOnClick={}
            ></CustomButton>
          </>
        )}
      </div>
    </div>
  );
};

export default MyNotificationComponent;
