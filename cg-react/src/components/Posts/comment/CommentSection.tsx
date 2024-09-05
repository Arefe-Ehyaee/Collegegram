import { useState } from 'react';
import ShowComment, { ShowCommentProps } from '../ShowComment';
import CommentingComponent, { CommentingComponentProps } from './CommentingComponent';

export interface CommentSectionProps {
    showProps: ShowCommentProps[];
    commentingProps: CommentingComponentProps;
    id:string;
}

const CommentSection = (props:CommentSectionProps) => {

    const [commentUsername, setCommentUsername] = useState<string | null>(null);

    const handleReplyClick = (username: string | null) => {
        setCommentUsername(prevusername => (prevusername === username ? null : username));
    };

    const {commentingProps, id, showProps} = props; 
    return (
        <div className='flex flex-col justify-end px-4' dir='rtl'>
            <CommentingComponent id={id} avatar={commentingProps.avatar} commnetParentId={commentUsername} />
            {showProps.map((props, index) => (
                <ShowComment key={index} {...props} onReplyClick={handleReplyClick} />
            ))}
        </div>
    );
};

export default CommentSection;
