import avatar107 from "../assets/Images/Frame 107.png"

interface AvatarNameProps {
    name: string;
}

const AvatarName: React.FC<AvatarNameProps> = ({ name }) => {
    return (
        <div className="flex gap-4 items-center py-4 pr-1 max-md:pr-6" dir="rtl">
            <img src={avatar107} alt="avatar" />
            <div>{name}</div>
        </div>
    );
}

export default AvatarName;