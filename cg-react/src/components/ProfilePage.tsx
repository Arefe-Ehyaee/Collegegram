
import MainLayout from "./MainLayout"
import ProfilePageComponent from "./ProfilePageComponent"
import SideNavbarComponent from "./SideNavbarComponent"




export default function ProfilePage () {
   
    return (
        <MainLayout mainComponents={ProfilePageComponent()} navBar={SideNavbarComponent()}/>
    )
}