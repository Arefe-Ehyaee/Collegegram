import MainLayout from "../components/MainLayout"
import NavBarComponent from "../components/NavBarComponent"
import ProfilePageComponent from "../components/ProfilePageComponent"




export default function ProfilePage () {
   
    return (
        <MainLayout mainComponents={ProfilePageComponent()} navBar={NavBarComponent()}/>
    )
}