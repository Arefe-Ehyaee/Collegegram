import MainLayout from "./MainLayout"
import NavBarComponent from "./NavBarComponent"
import ProfilePageComponent from "./ProfilePageComponent"




export default function ProfilePage () {
   
    return (
        <MainLayout mainComponents={ProfilePageComponent()} navBar={NavBarComponent()}/>
    )
}