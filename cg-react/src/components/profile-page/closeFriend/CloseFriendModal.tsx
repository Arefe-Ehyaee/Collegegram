import PosterInfo from "../../explore/PosterInfo";

interface CloseFriendModalProps {
    name?: string;
    avatar?: string;
    followersCount?: number
}


const CloseFriendModal:React.FC<CloseFriendModalProps> = ({name, avatar, followersCount}) => {
    return (
        <div className="w-[360px]" dir="rtl">
            <PosterInfo name={name} followersCount={followersCount} avatar={avatar}></PosterInfo>
            <div className="font-bold pb-1">{`مطمئنی میخوای ${name} رو به دوستای نزدیکت اضافه کنی؟`}</div>
            <div className="text-sm leading-7">
            در این صورت اون می‌تونه محتواهایی که برای دوستان نزدیکت به اشتراک گذاشتی رو ببینه.
            </div>
        </div>
    );
};
  
export default CloseFriendModal;