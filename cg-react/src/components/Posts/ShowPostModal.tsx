import AvatarName from "../AvatarName";
import CustomButtonH36 from "../ButtonComponentH36";
import whitePen from "../../assets/icons/whitePen.svg";
import DesktopCaption from "./DesktopCaption";
import ImageCarousel from './ImageCarousel';
import rect4 from "../../assets/Images/Rectangle 70.png"
import rect5 from "../../assets/Images/Rectangle 71.png"
import rect6 from "../../assets/Images/Rectangle 72.png"
import CommentingComponent from "../CommentingComponent";
interface Image {
  src: string;
  alt: string;
}

interface ShowPostModalProps {
  onClose: () => void; 
  children?: React.ReactNode;
  photo: Image; 
}

const ShowPostModal: React.FC<ShowPostModalProps> = ({ photo, onClose, children }) => {
  const images: Image[] = [
    { src: rect4, alt: "Description of Rectangle 70" },
    { src: rect5, alt: "Description of Rectangle 71" },
    { src: rect6, alt: "Description of Rectangle 72" }
  ];

  return (
    <div className="max-w-[1200px]" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        <div className="w-full h-auto md:max-w-[520px] md:max-h-[376px]">
          <ImageCarousel images={images} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-12">
            <div>
              <AvatarName name={"mahmz"} />
            </div>
            <div className="hidden md:block">
              <CustomButtonH36
                text={"ویرایش پست"}
                iconsrc={whitePen}
                styling="bg-okhra-200 ml-1"
              />
            </div>
          </div>
          <DesktopCaption
            date={"2 ماه پیش"}
            caption={"ترس یکی از مهمترین عوامل #قدرت است؛ کسی که بتواند در #جامعه سمت و سوی ترس را معین کند #قدرت زیادی بر آن جامعه پیدا می‌کند. شاید بتوان هم صدا با جورجو آگامبنِ فیلسوف گفت که ما امروزه همیشه در یک حالت اضطراری زندگی می‌کنیم"}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default ShowPostModal;