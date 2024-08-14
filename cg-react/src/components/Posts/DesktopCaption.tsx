import Hashtag from "./HashtagsComponent";

interface DesktopCaptionProps {
    date: string;
    caption: string;
}

const DesktopCaption: React.FC<DesktopCaptionProps> = ({ date, caption }) => {
    return (
        <div className="mt-14" dir="rtl">
            <div className="font-isf font-normal text-[11px] max-md:px-6" dir="rtl">
                {date}
            </div>
            <div className="font-isf text-sm font-normal text-wrap mt-4 max-md:px-6" dir="rtl">
                {caption}
            </div>
            <div className="mt-4 max-md:px-6">
                <Hashtag text={"سفر"}></Hashtag>
                <Hashtag text={"بومگردی"}></Hashtag>
                <Hashtag text={"دریا"}></Hashtag>
            </div>
            
        </div>
    );
}

export default DesktopCaption;