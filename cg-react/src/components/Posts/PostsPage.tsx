import MainLayoutBack from "../MainLayoutBack"
import SideNavbarComponent from "../SideNavbarComponent"
import PostComponent from "./PostComponent"




export default function PostsPage () {
   
    return (
        <MainLayoutBack mainComponents={<PostComponent/>} navBar={SideNavbarComponent()}/>
    )
}