import MainLayout from "../MainLayout"
import SideNavbarComponent from "../SideNavbarComponent"
import ExploreComponent from "./ExploreComponent"

const ExplorePage = () => {
  return (
    <MainLayout mainComponents={<ExploreComponent/>} navBar={<SideNavbarComponent/>} />
  )
}

export default ExplorePage