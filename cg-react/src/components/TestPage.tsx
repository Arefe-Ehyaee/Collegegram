import timeTranslate from "../utilities/timeTranslationFunction";
import BlankExploreComponent from "./explore/BlankExploreComponent";
import MainLayout from "./MainLayout";
import SideNavbarComponent from "./SideNavbarComponent";



const defaultProps = {
comments:50,
bookmarks:3,
  likes: 337,
};

const TestPage = () => {
  
  return (
    <MainLayout mainComponents={BlankExploreComponent()} navBar={SideNavbarComponent()}/>
  );
};

export default TestPage;
