import whitePen from "../../assets/icons/whitePen.svg";
import post from "../../assets/Images/post.png";
import redPen from "../../assets/icons/redPen.svg";
import AvatarName from "../AvatarName";
import CustomButtonH36 from "../ButtonComponentH36";
import DesktopCaption from "./DesktopCaption";
import BottomNavbarMobile from "../BottonNavbarMobile";
import { userProfileAtom } from "../../user-actions/atoms";
import { useRecoilState } from "recoil";
import CommentSection from "./CommentSection";
import mockData from './mockCommentData.json'
import { useRecoilValue } from "recoil";

interface PostsPageProps {
  imageSrc?: string;
  date?: string;
  caption?: string;
  children?: React.ReactNode;
}


const PostComponent: React.FC<PostsPageProps> = ({ children,
 imageSrc=post,
 caption=
  "ترس یکی از مهمترین عوامل #قدرت است؛ کسی که بتواند در #جامعه سمت و سوی ترس را معین کند #قدرت زیادی بر آن جامعه پیدا می‌کند. شاید بتوان هم صدا با جورجو آگامبنِ فیلسوف گفت که ما امروزه همیشه در یک حالت اضطراری زندگی می‌کنیم ",
 date= "2 ماه پیش"
 }) => {
  const userProfile = useRecoilValue(userProfileAtom);
const mockCommentData = mockData.data
 
   const commentingProps = {
      avatar : userProfile.avatar,
    }

  
 

  const avatar = userProfile.avatar;
  const username = userProfile.username;
 


  
 
  return (
    <div className="mx-auto  w-[520px] max-md:h-full max-md:w-full mt-4">
      <div
        className="flex items-center justify-between max-md:mt-0"
        dir="rtl"
      >
        <AvatarName name={username} avatar={avatar} styling="py-4 pr-1"></AvatarName>
        <CustomButtonH36
          text={"ویرایش پست"}
          iconsrc={whitePen}
          styling="bg-okhra-200 ml-1 max-md:hidden"
        ></CustomButtonH36>
        <img src={redPen} alt="edit" className="pl-6 md:hidden" />
      </div>
      <img src={imageSrc} alt="post" className="py-3" />
      <DesktopCaption
        date={date}
        caption={caption}
      ></DesktopCaption>
      {children}
      <CommentSection showProps={mockCommentData} commentingProps={commentingProps}  ></CommentSection>
      <BottomNavbarMobile></BottomNavbarMobile>
    </div>
  );
};

export default PostComponent;
