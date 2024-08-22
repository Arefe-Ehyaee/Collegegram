import { useState } from "react";
import likeIcon from "../../assets/icons/postLike.svg";
import likeIconFilled from "../../assets/icons/postLikeFilled.svg";
import commentIcon from "../../assets/icons/postComment.svg";
import bookmarkIcon from "../../assets/icons/postBookmark.svg";
import bookmarkIconFilled from "../../assets/icons/postBookmarkFilled.svg";

interface PostInteractionsProps {
  likes: number;
  comments: number;
  bookmarks:number;
}

const PostInteractions = (props:PostInteractionsProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const handleLikeClick = () => {
      setIsLiked((prevLiked) => !prevLiked); 
    };
    const handleBookmarkeClick = () => {
        setIsBookmarked((prevBookmarked) => !prevBookmarked); 
      };
  return (
    <div dir="rtl" className="h-[61px] flex flex-row text-okhra-200 text-sm gap-x-4 items-center">
      <button className="flex flex-col justify-between items-center">
        <img src={commentIcon} alt="comment buton" />
       <p className="pt-1">{props.comments}</p>
      </button >
      <button onClick={handleLikeClick} className="flex flex-col justify-between items-center">
        <img src={isLiked ? likeIconFilled : likeIcon} alt="like button" />
        <p className="pt-2">{props.likes}</p>
      </button>
      <button onClick={handleBookmarkeClick} className="flex flex-col justify-between items-center">
        <img src={isBookmarked ? bookmarkIconFilled : bookmarkIcon} alt="" />
        <p className="pt-2">{props.bookmarks}</p>
      </button>
    </div>
  );
};

export default PostInteractions;
