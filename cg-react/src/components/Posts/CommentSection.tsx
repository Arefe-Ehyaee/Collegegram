import React from 'react';
import ShowComment, { ShowCommentProps } from './ShowComment';
import CommentingComponent, { CommentingComponentProps } from './CommentingComponent';

export interface CommentSectionProps {
    showProps: ShowCommentProps[];
    commentingProps: CommentingComponentProps;
}

const CommentSection: React.FC<CommentSectionProps> = (commentSectionProps) => {
    return (
        <div className='flex flex-col justify-end' dir='rtl'>
            <CommentingComponent avatar={commentSectionProps.commentingProps.avatar} />
            {commentSectionProps.showProps.map((props, index) => (
                <ShowComment key={index} {...props} />
            ))}
        </div>
    );
};

export default CommentSection;
