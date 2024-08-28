import { useRecoilState } from "recoil";
import avatar107 from "../../assets/Images/Frame 107.png"
import send from "../../assets/icons/send.svg"
import { userProfileAtom } from "../../user-actions/atoms";


export interface CommentingComponentProps {
  avatar:string;
  styling?: string;
}

const CommentingComponent: React.FC<CommentingComponentProps> = ({  styling,avatar}) => {

  return (
    <div className="w-[100%] flex gap-2 pt-8 px-4 max-md:gap-1 items-center" dir="rtl">
    <img src={avatar} alt="avatar" className="h-[40px] w-[40px] rounded-full border border-khakeshtari-400"/>
      <input
        type='string'
        id='comment'
        name='comment'
        className={`flex flex-col items-center w-[423px] h-[36px] border border-khakeshtari-400 px-4 py-2 rounded-3xl text-xs font-normal placeholder-gray font-isf ${styling} placeholder-start"}`}
        dir="rtl"
        placeholder="نظر خود را بنویسید..."
      />
    <button>
        <img src={send} alt="send" className="max-md:h-[40px] max-md:w-[40px]" />
    </button>
    </div>
  );
};

export default CommentingComponent;
