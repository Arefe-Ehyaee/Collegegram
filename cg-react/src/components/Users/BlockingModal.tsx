import CustomButtonH36 from "../ButtonComponentH36";

interface BlockingModalProps {
    name: string;
}


const BlockingModal:React.FC<BlockingModalProps> = ({name}) => {
    return (
        <div className="w-[360px]" dir="rtl">
            <div className="font-bold pb-1">{`مطمئنی میخوای ${name} رو بلاک کنی؟`}</div>
            <div className="text-sm leading-7">
            اگر بلاکش کنی دیگه نمی‌تونه بهت پیام بده و پست‌هات رو ببینه. قابلیت لایک کردن و کامنت گذاشتن زیر پست‌های تو هم براش مسدود میشه.
            </div>
        </div>
    );
};
  
export default BlockingModal;