import CustomButtonH36 from "./ButtonComponentH36"

interface ShowPostsProps {
    styling?:string
}


export default function ShowPostsComponent ({styling}:ShowPostsProps) {
return (
    <div className="flex mt-8 ml-16 border border-khakeshtari-500 rounded-t-3xl min-h-[580px] align-middle justify-center max-sm:ml-8 max-sm:mr-8" >
        <CustomButtonH36 text="ایجاد پست جدید" styling="bg-okhra-200 self-center"></CustomButtonH36>
    </div>
)
}