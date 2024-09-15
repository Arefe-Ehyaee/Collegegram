export interface PosterInfoProps {
    name: string;
    className?: string;
    avatar?: string;
    followersCount?: number;
}



const PosterInfo = (props:PosterInfoProps) => {
    const { name, className, avatar, followersCount } = props
    return (
        <div className={`flex gap-4 items-center p-4 ${className}`} dir="rtl">
            <img src={avatar} alt="avatar" className="h-[48px] w-[48px] rounded-full border border-grey-400"/>
            <div>
                <div className="text-xs leading-5 font-bold">{name}</div>
                <div className="text-[0.5rem] leading-4 font-normal" dir='rtl'>{` ${followersCount} دنبال کننده`}</div>
            </div>
        </div>
    );
}

export default PosterInfo;