import MainLayoutBack from "../MainLayoutBack"
import SideNavbarComponent from "../SideNavbarComponent"
import PostComponent from "./PostComponent"

interface PostsPageProps {
    onClose?: () => void;
}


export default function PostsPage ({onClose}:PostsPageProps) {
   
    return (
        <MainLayoutBack mainComponents={<PostComponent/>} navBar={SideNavbarComponent()}/>
    )
}