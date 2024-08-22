import React, { useState } from "react";
import replyButton from "../../assets/icons/reply.svg";
import likeButton from "../../assets/icons/commentHeart.svg";
import likeButtonActive from "../../assets/icons/commentHeartActive.svg";

interface ShowCommentProps {
  accountName: string;
  commentTime: EpochTimeStamp | string;
  commentMessage: string;
  parentID: string;
  postID: string;
  likes: number;
}

const ShowComment: React.FC<ShowCommentProps> = (props) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked((prevLiked) => !prevLiked); // Toggle the like state
  };

  return (
    <div dir="rtl" className="flex min-w-[340px] max-w-[700px] flex-col my-8">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <p className="font-bold">{props.accountName}</p>
          <p className="pr-5 text-xs text-khakeshtari-500">
            {props.commentTime}
          </p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <button onClick={handleLikeClick} className="flex flex-row items-center">
            <p className="mx-2 text-okhra-200 leading-4">{props.likes}</p>
            <img
              src={isLiked ? likeButtonActive : likeButton}
              alt="like Button"
              className="h-[16px]"
            />
          </button>
          <button>
            <img src={replyButton} alt="reply button" className="h-[19px]" />
          </button>
        </div>
      </div>
      <p className="pt-4 leading-8 text-siah">{props.commentMessage}</p>
    </div>
  );
};

export default ShowComment;
