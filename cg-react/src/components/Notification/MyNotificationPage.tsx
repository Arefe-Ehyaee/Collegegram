import MainLayout from "../MainLayout";
import SideNavbarComponent from "../SideNavbarComponent";
import MyNotificationPageComponent from "./MyNotificationPageComponent";






export default function NotificationPage () {
    return (
        <MainLayout mainComponents={MyNotificationPageComponent()} navBar={SideNavbarComponent()}/>
    )

}