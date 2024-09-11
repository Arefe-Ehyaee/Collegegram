import React, { useState } from "react";
import replyButton from "../../assets/icons/reply.svg";
import likeButton from "../../assets/icons/commentHeart.svg";
import likeButtonActive from "../../assets/icons/commentHeartActive.svg";
import timeTranslate from "../../utilities/timeTranslationFunction";

export interface ShowCommentProps {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  createdAt: string;
  description: string;
  parentId: string | null;
  postId: string;
  likeCount: number;
  replies?: ShowCommentProps[];
  user: User;
  onReplyClick: (username: string | null, commentId: string) => void;
}

export interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
}

// function handleSendClick(id: string) {
//   const commentValue = (comment.current?.value ?? '');
//   // SetEnteredComment(commentValue);
//   console.log(comment.current?.value);

//   if(comment.current){
//     PostAComment(token || "", id, commentValue, '');
//     comment.current.value = '';
//   }
// }

const ShowComment= (props: ShowCommentProps) => {

  const [isLiked, setIsLiked] = useState(false);

  const [isReplyClicked, setIsReplyClicked] = useState(false);


  const handleLikeClick = () => {
    setIsLiked((prevLiked) => !prevLiked); 
  };

  const handleReplyClick = () => {

    setIsReplyClicked((prevReply) => !prevReply);
   

    props.onReplyClick(props.user.username, props.id);
    console.log("comment id", props.id);
  }

  const commentStyle = props.parentId 
    ? "mr-8 w-[90%]  " 
    : "w-full"; 



  return (
    <div dir="rtl" className={`flex flex-col my-6 self-baseline ${commentStyle}`}>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <p className="font-bold">{props.user.username}</p>
          <p className="pr-5 text-xs">
            {timeTranslate(props.createdAt)}
          </p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <button onClick={handleLikeClick} className="flex flex-row items-center">
            <p className="mx-2 text-red-200 leading-4">{props.likeCount}</p>
            <img
              src={isLiked ? likeButtonActive : likeButton}
              alt="like Button"
              className="h-[16px]"
            />
          </button>
          <button onClick={handleReplyClick} className={`${isReplyClicked ? "bg-grey-400 p-2 rounded-md " : ""}`}>
            <img src={replyButton} alt="reply button" className="h-[19px]"/>
          </button>
        </div>
      </div>
      <p className="pt-4 leading-8 text-black-100">{props.description}</p>

      {props.replies && props.replies.length > 0 && (
        <div >
          {props.replies.map((reply) => (
            <ShowComment key={reply.id} {...reply} onReplyClick={props.onReplyClick} />
          ))}
        </div>
      )}

    </div>
  );
};

export default ShowComment;
