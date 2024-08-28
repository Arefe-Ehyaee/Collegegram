interface PosterInfoProps {
    name: string;
    styling?: string;
    avatar?: string;
    followerCount: number;
}



const PosterInfo: React.FC<PosterInfoProps> = ({ name, styling, avatar, followerCount }) => {
    return (
        <div className={`flex gap-4 items-center p-4 ${styling}`} dir="rtl">
            <img src={avatar} alt="avatar" className="h-[48px] w-[48px]  rounded-full border border-khakeshtari-400"/>
            <div>
                <div className="text-xs font-bold">{name}</div>
                <div className="text-[8px] font-normal" dir='rtl'>{` ${followerCount} دنبال کننده`}</div>
            </div>
        </div>
    );
}

export default PosterInfo;