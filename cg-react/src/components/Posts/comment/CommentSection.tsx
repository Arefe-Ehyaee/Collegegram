import { useState } from 'react';
import ShowComment, { ShowCommentProps } from '../ShowComment';
import CommentingComponent, { CommentingComponentProps } from './CommentingComponent';

export interface CommentSectionProps {
    showProps: ShowCommentProps[];
    commentingProps: CommentingComponentProps;
    id:string;
}

const CommentSection = (props:CommentSectionProps) => {

    const [commentParentId, setCommentParentId] = useState<string | null>(null);

    const handleReplyClick = (id: string | null) => {
        setCommentParentId(prevId => (prevId === id ? null : id));
    };

    const {commentingProps, id, showProps} = props; 
    return (
        <div className='flex flex-col justify-end px-4' dir='rtl'>
            <CommentingComponent id={id} avatar={commentingProps.avatar} commnetParentId={commentParentId} />
            {showProps.map((props, index) => (
                <ShowComment key={index} {...props} onReplyClick={handleReplyClick} />
            ))}
        </div>
    );
};

export default CommentSection;
