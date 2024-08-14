import whitePen from "../../assets/icons/whitePen.svg";
import post from "../../assets/Images/post.png";
import redPen from "../../assets/icons/redPen.svg";
import AvatarName from "../AvatarName";
import CustomButtonH36 from "../ButtonComponentH36";
import DesktopCaption from "./DesktopCaption";
import BottomNavbarMobile from "../BottonNavbarMobile";

interface MobilePostProps {
  children?: React.ReactNode;
}

const MobilePost: React.FC<MobilePostProps> = ({ children }) => {
  return (
    <div>
      <div className="mx-auto h-[720px] w-[520px]">
        <div
          className="flex items-center justify-between max-md:mt-[52px]"
          dir="rtl"
        >
          <AvatarName name={"mahmz"} styling="py-4 pr-1"></AvatarName>
          <CustomButtonH36
            text={"ویرایش پست"}
            iconsrc={whitePen}
            styling="bg-okhra-200 ml-1 max-md:hidden"
          ></CustomButtonH36>
          <img src={redPen} alt="edit" className="pl-6 md:hidden" />
        </div>
        <img src={post} alt="post" className="py-2" />
        <DesktopCaption
          date={"2 ماه پیش"}
          caption={
            "ترس یکی از مهمترین عوامل #قدرت است؛ کسی که بتواند در #جامعه سمت و سوی ترس را معین کند #قدرت زیادی بر آن جامعه پیدا می‌کند. شاید بتوان هم صدا با جورجو آگامبنِ فیلسوف گفت که ما امروزه همیشه در یک حالت اضطراری زندگی می‌کنیم "
          }
        ></DesktopCaption>
        {children}
        <BottomNavbarMobile></BottomNavbarMobile>
      </div>
    </div>
  );
};

export default MobilePost;
