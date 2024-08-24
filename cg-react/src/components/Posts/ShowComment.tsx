import React, { useState } from "react";
import replyButton from "../../assets/icons/reply.svg";
import likeButton from "../../assets/icons/commentHeart.svg";
import likeButtonActive from "../../assets/icons/commentHeartActive.svg";

export interface ShowCommentProps {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  createdAt: EpochTimeStamp | string;
  description: string;
  parentId: string | null;
  postId: string;
  likeCount: number;
}

const ShowComment: React.FC<ShowCommentProps> = (props) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked((prevLiked) => !prevLiked); 
  };

  const handleReplyClick = () => {
    
  }
  const commentStyle = props.parentId 
    ? "mr-8 w-[90%]  " 
    : "w-full"; 



  return (
    <div dir="rtl" className={`flex flex-col my-8 self-baseline ${commentStyle}`}>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <p className="font-bold">{props.username}</p>
          <p className="pr-5 text-xs text-khakeshtari-500">
            {props.createdAt}
          </p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <button onClick={handleLikeClick} className="flex flex-row items-center">
            <p className="mx-2 text-okhra-200 leading-4">{props.likeCount}</p>
            <img
              src={isLiked ? likeButtonActive : likeButton}
              alt="like Button"
              className="h-[16px]"
            />
          </button>
          <button>
            <img src={replyButton} alt="reply button" className="h-[19px]" onClick={handleReplyClick}/>
          </button>
        </div>
      </div>
      <p className="pt-4 leading-8 text-siah">{props.description}</p>
    </div>
  );
};

export default ShowComment;
