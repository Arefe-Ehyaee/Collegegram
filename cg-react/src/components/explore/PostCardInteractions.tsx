import { useState } from "react";
import likeIcon from "./icons/exploreLike.svg";
import likeIconFilled from "./icons/exploreLikeFilled.svg";
import commentIcon from "./icons/exploreComment.svg";
import bookmarkIcon from "./icons/exploreBookmark.svg";
import bookmarkIconFilled from "./icons/exploreBookmarkFilled.svg";

interface PostInteractionsProps {
  likes: number;
  comments: number;
  bookmarks:number;
}

const PostCardInteractions = (props:PostInteractionsProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const handleLikeClick = () => {
      setIsLiked((prevLiked) => !prevLiked); 
    };
    const handleBookmarkeClick = () => {
        setIsBookmarked((prevBookmarked) => !prevBookmarked); 
      };
  return (
    <div dir="rtl" className="h-[53px] w-full flex flex-row text-meshki text-sm pr-6 gap-x-4 items-center">
      <button className="flex flex-row justify-between items-center gap-x-2">
        <img src={commentIcon} alt="comment button"/>
       <p className="">{props.comments}</p>
      </button >
      <button onClick={handleLikeClick} className="flex flex-row justify-between items-center gap-x-2">
        <img src={isLiked ? likeIconFilled : likeIcon} alt="like button" />
        <p className="">{props.likes}</p>
      </button>
      <button onClick={handleBookmarkeClick} className="flex flex-row justify-between items-center gap-x-2">
        <img src={isBookmarked ? bookmarkIconFilled : bookmarkIcon} alt="" />
        <p className="">{props.bookmarks}</p>
      </button>
    </div>
  );
};

export default PostCardInteractions;
