import MainLayout from "./MainLayout"
import PostsPageComponent from "./PostsPageComponent"
import SideNavbarComponent from "./SideNavbarComponent"




export default function PostsPage () {
   
    return (
        <MainLayout mainComponents={<PostsPageComponent/>} navBar={SideNavbarComponent()}/>
    )
}