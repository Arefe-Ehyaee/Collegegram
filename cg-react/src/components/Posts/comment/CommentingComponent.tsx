import send from "../../../assets/icons/send.svg"
import { useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { PostAComment } from "./PostAComments";


export interface CommentingComponentProps {
  avatar:string;
  styling?: string;
  id: string;
  commnetUsername?: string | null;
  parentId?: string | null;
  // onCommentSent?: () => void;
}
const CommentingComponent = (props: CommentingComponentProps) => {
  const { avatar, id, styling, commnetUsername, parentId } = props;

  const comment = useRef<HTMLInputElement | null>(null);
  const token: string = localStorage.getItem("token") ?? "";
  const queryClient = useQueryClient();

  const handleSendClick = async () => {
    const commentValue = comment.current?.value ?? '';
    console.log(commentValue);
    if (token && comment.current) {
      try {
        await PostAComment(token, id, commentValue, parentId ?? null);
        comment.current.value = '';
        queryClient.invalidateQueries({ queryKey: ["comments", token, id] });
      } catch (error) {
        console.error('Error sending comment:', error);
      }
    }
  };

  const placeholderText = commnetUsername
    ? `در پاسخ به ${commnetUsername} نظر خود را بنویسید...`
    : "نظر خود را بنویسید...";

  return (
    <div className="w-[100%] flex gap-2 pt-8 px-4 max-md:gap-1 items-center" dir="rtl">
      <img src={avatar} alt="avatar" className="h-[40px] w-[40px] rounded-full border border-grey-400"/>
      <input
        ref={comment}
        type="text"
        id='comment'
        name='comment'
        className={`flex flex-col items-center w-[100%] h-[100%] border pr-2 border-grey-400 py-2 rounded-3xl text-xs font-normal placeholder-grey-400 font-isf ${styling}`}
        dir="rtl"
        placeholder={placeholderText}
      />
      <button onClick={handleSendClick}>
        <img src={send} alt="send" className="max-md:h-[40px] max-md:w-[40px]" />
      </button>
    </div>
  );
};

export default CommentingComponent;
