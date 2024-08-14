import AvatarName from "../AvatarName";
import CustomButtonH36 from "../ButtonComponentH36";
import whitePen from "../../assets/icons/whitePen.svg";
import post from "../../assets/Images/post.png";
import DesktopCaption from "./DesktopCaption";

interface ShowPostModalProps {
  onClose: Function;
  children?: React.ReactNode;
  photo: {
    src: string;
    alt: string;
  };
}

const ShowPostModal = ({ photo, onClose, children }: ShowPostModalProps) => {
  return (
    <div className="max-w-[1200px]" dir="rtl">
      <div className="grid grid-cols-2 gap-3">
        <img src={photo.src} alt="post" className="rounded-lg w-[520px] h-[376px]" />
        <div>
          <div className="flex items-center justify-between gap-12">
            <div>
              <AvatarName name={"mahmz"}></AvatarName>
            </div>
            <div>
            <CustomButtonH36
              text={"ویرایش پست"}
              iconsrc={whitePen}
              styling="bg-okhra-200 ml-1 max-md:hidden"
            ></CustomButtonH36>
            </div>
          </div>
          <DesktopCaption
              date={"2 ماه پیش"}
              caption={"ترس یکی از مهمترین عوامل #قدرت است؛ کسی که بتواند در #جامعه سمت و سوی ترس را معین کند #قدرت زیادی بر آن جامعه پیدا می‌کند. شاید بتوان هم صدا با جورجو آگامبنِ فیلسوف گفت که ما امروزه همیشه در یک حالت اضطراری زندگی می‌کنیم"}
          ></DesktopCaption>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ShowPostModal;
