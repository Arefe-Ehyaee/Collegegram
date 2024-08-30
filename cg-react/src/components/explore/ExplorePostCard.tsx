import React from "react";
import PosterInfo, { PosterInfoProps } from "./PosterInfo";
import PostCardInteractions, {
  PostInteractionsProps,
} from "./PostCardInteractions";

interface ExplorePostCardProps {
  posterInfoProps: PosterInfoProps;
  postCardInteractionProps: PostInteractionsProps;
  postImageSrc: string;
}

const ExplorePostCard = (props: ExplorePostCardProps) => {
  const { posterInfoProps, postCardInteractionProps, postImageSrc } = props;
  return (
    <div dir="rtl" className="flex flex-col rounded-3xl w-[19rem] h-[27.5rem] border border-khakeshtari-400 ">
      <img src={postImageSrc} alt="PostCard Main Image" className="w-[19rem] h-[19rem] object-cover rounded-t-3xl"/>
      <PostCardInteractions {...postCardInteractionProps} />
      <PosterInfo {...posterInfoProps} />
    </div>
  );
};

export default ExplorePostCard;
