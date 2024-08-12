import CustomButtonH36 from "./ButtonComponentH36";
import rect1 from "../assets/Images/Rectangle 67.png"
import rect2 from "../assets/Images/Rectangle 68.png"
import rect3 from "../assets/Images/Rectangle 69.png"
import rect4 from "../assets/Images/Rectangle 70.png"
import rect5 from "../assets/Images/Rectangle 71.png"
import rect6 from "../assets/Images/Rectangle 72.png"


interface ShowPostsProps {
  styling?: string;
}

export default function ShowPostsComponent({ styling }: ShowPostsProps) {
  return (
    <div className="ml-16 mt-8 flex min-h-[580px] justify-center rounded-t-3xl border border-khakeshtari-400 align-middle max-sm:ml-8 max-sm:mr-8">
      {/* <CustomButtonH36
        text="ایجاد پست جدید"
        styling="bg-okhra-200 self-center"
      ></CustomButtonH36> */}
      <div className="columns-3 max-md:columns-2 gap-8">
        <img className="aspect-square w-full" src={rect1} />
        <img className="aspect-square w-full" src={rect2} />
        <img className="aspect-square w-full" src={rect3} />
        <img className="aspect-square w-full" src={rect4} />
        <img className="aspect-square w-full" src={rect5} />
        <img className="aspect-square w-full" src={rect6} />
      </div>
    </div>
  );
}
