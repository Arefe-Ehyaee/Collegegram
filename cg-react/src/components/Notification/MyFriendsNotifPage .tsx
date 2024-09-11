import MainLayout from "../MainLayout";
import SideNavbarComponent from "../SideNavbarComponent";
import MyFriendsNotifPageComponent from "./MyFriendsNotifPageComponent";







export default function MyFriendsNotifPage () {
    return (
        <MainLayout mainComponents={MyFriendsNotifPageComponent()} navBar={SideNavbarComponent()}/>
    )

}