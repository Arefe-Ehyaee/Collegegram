import dots from "../assets/icons/ellipsis.svg"

interface FollowerFollowingProps {
    name: string;
    followersNumber: number;
    avatar?: string;
}


const FollowerFollowing: React.FC<FollowerFollowingProps> = ({name, followersNumber, avatar}) => {
    return(
        <div className="flex gap-[93px] items-center justify-between py-4 border-b border-khakeshtari-700" dir="rtl">
            <div className="flex gap-[27px] items-center">
                <img src={avatar} alt="avatar" className="w-[56ps] h-[56px]" />
                <div>
                    <div className="font-isf text-[13px] text-sabz-400 leading-[21.48px] font-bold">{name}</div>
                    <div className="font-isf text-[11px] text-sabz-400 leading-[14.3px] font-normal pt-2" dir="rtl">{`${followersNumber }دنبال کننده ` }</div>
                </div>
            </div>

            <div>
                <img src={dots} alt="more" />
            </div>
        </div>
    )
}


export default FollowerFollowing;
