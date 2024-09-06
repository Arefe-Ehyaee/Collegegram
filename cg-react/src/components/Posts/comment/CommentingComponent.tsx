import { useRecoilState } from "recoil";
import avatar107 from "../../assets/Images/Frame 107.png"
import send from "../../../assets/icons/send.svg"
import { userProfileAtom } from "../../../user-actions/atoms";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PostAComment } from "./PostAComments";


export interface CommentingComponentProps {
  avatar:string;
  styling?: string;
  id: string;
  commnetParentId?: string | null;
  // onCommentSent?: () => void;
}

const CommentingComponent = (props:CommentingComponentProps) => {
  
  const {avatar, id, styling, commnetParentId} = props;

  const comment = useRef<HTMLInputElement | null>(null);
  // const [enteredComment, SetEnteredComment] = useState<string | undefined>();

  const [token, setToken] = useState<string | null>(null);


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);


  const queryClient = useQueryClient();


  const handleSendClick = async (id: string) => {
    const commentValue = (comment.current?.value ?? '');
    // SetEnteredComment(commentValue);
    console.log(comment.current?.value);

    if(comment.current){
      if(token){
        try{
          await PostAComment(token || "", id, commentValue, commnetParentId);
          comment.current!.value = '';
          queryClient.invalidateQueries({ queryKey: ["comments", token] });
        } catch (error) {
          console.error('error sending comment ', error)
        }
      }
    } 
  }

  const placeholderText = commnetParentId 
    ? `در پاسخ به ${commnetParentId} نظر خود را بنویسید...` 
    : "نظر خود را بنویسید...";
    
  return (
    <div className="w-[100%] flex gap-2 pt-8 px-4 max-md:gap-1 items-center" dir="rtl">
    <img src={avatar} alt="avatar" className="h-[40px] w-[40px] rounded-full border border-khakeshtari-400"/>
      <input
        ref= {comment}
        type= "text"
        id='comment'
        name='comment'
        className={`flex flex-col items-center w-[100%] h-[100%] border border-khakeshtari-400 py-2 rounded-3xl text-xs font-normal placeholder-gray font-isf ${styling} placeholder-start"}`}
        dir="rtl"
        placeholder= {placeholderText}
      />
    <button onClick={() => handleSendClick(id)}>
        <img src={send} alt="send" className="max-md:h-[40px] max-md:w-[40px]" />
    </button>
    </div>
  );
};

export default CommentingComponent;
