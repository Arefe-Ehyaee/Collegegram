
interface CloseFriendModalProps {
    name: string;
}


const CloseFriendModal:React.FC<CloseFriendModalProps> = ({name}) => {
    return (
        <div className="w-[360px]" dir="rtl">
            <div className="font-bold pb-1">{`مطمئنی میخوای ${name} رو به دوستای نزدیکت اضافه کنی؟`}</div>
            <div className="text-sm leading-7">
            در این صورت اون می‌تونه محتواهایی که برای دوستان نزدیکت به اشتراک گذاشتی رو ببینه.
            </div>
        </div>
    );
};
  
export default CloseFriendModal;