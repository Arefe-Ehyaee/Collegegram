import defaultAvatar from "../../assets/icons/defaultavatar.svg";
import CustomButton from "../CustomButton";
import { getNotificationMessage } from "./getNotificationMessage";

export interface NotificationComponentprops {
  subject?: string;
  followersNumber?: number;
  avatar?: string;
  notifType:
    | "tag"
    | "comment"
    | "like"
    | "accept"
    | "request"
    | "reject"
    | "followedYou"
    | "followedOthers";
  user?: string;
  comment?: string;
  seen: boolean;
}

export const defaultProfile: NotificationComponentprops = {
  subject: "سیمین سحابی",
  avatar: defaultAvatar,
  followersNumber: 0,
  notifType: "reject",
  user: "علی حلقه گیلاس",
  comment: "چه عکس قشنگی!قشنگی قشنگیقشنگی قشنگیرقشنگی قشنگی قشنگیقشنگی قشنگی قشنگی قشنگی قشنگی قشنگی قشنگی قشنگیقشنگی قشنگ  قشنگیقشنگیقشنگیقشنگیقشنگیقشنگیقش قشنگی قشنگی قشنگی ",
  seen: true,
};

const MyNotificationComponent = ({
  subject,
  avatar,
  followersNumber,
  notifType,
  user,
  comment,
  seen
}: NotificationComponentprops) => {
  return (
    <div
      className={`${seen ? "bg-khakeshtari-100 border-none" : "bg-yasi border-khakeshtari-700"} my-4 flex h-[64px] items-center justify-between gap-[93px] rounded-full border-b`}
      dir="rtl"
    >
      <div className="flex items-center gap-[27px]">
        <img
          src={defaultAvatar}
          alt="avatar"
          className="h-[64px] w-[64px] rounded-full"
        />
        <div>
          <div className="font-isf text-[13px] font-bold leading-[21.48px] text-sabz-400">
            {getNotificationMessage(notifType, defaultProfile.subject, defaultProfile.user)}
          </div>
          {notifType === "comment" && (
            <>
              <div
                className="pt-1 font-isf text-[11px] font-normal leading-[14.3px] text-sabz-400 line-clamp-1"
                dir="rtl"
              >{defaultProfile.comment}</div>
            </>
          )}
          <div
            className="pt-2 font-isf text-[11px] font-normal leading-[14.3px] text-sabz-400"
            dir="rtl"
          >{`${0}دنبال کننده `}</div>
        </div>
        {(notifType === "followedYou" || notifType === "followedOthers") && (
          <CustomButton
            text="+ دنبال کردن"
            className="bg-okhra-200"
            // handleOnClick={}
          ></CustomButton>
        )}

        {notifType === "request" && (
          <>
            <CustomButton
              text="قبولههه"
              className="bg-okhra-200"
              // handleOnClick={}
            ></CustomButton>
            <CustomButton
              text="خوشم نمیاد ازش"
              className="bg-okhra-200"
              // handleOnClick={}
            ></CustomButton>
          </>
        )}
      </div>
    </div>
  );
};

export default MyNotificationComponent;