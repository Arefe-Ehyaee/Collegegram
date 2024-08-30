import timeTranslate from "../utilities/timeTranslationFunction";
import BlankExploreComponent from "./explore/BlankExploreComponent";
import ExplorePostCard from "./explore/ExplorePostCard";
import MainLayout from "./MainLayout";
import SideNavbarComponent from "./SideNavbarComponent";
import { userProfileAtom } from "../user-actions/atoms";
import { useRecoilValue } from "recoil";


const TestPage = () => {
  const mockProfileInfo = useRecoilValue(userProfileAtom)
  const defaultProps = {
    comments:50,
    bookmarks:3,
      likes: 1313,
    };
    
    const posterProps = {
      avatar: mockProfileInfo.avatar,
      name:mockProfileInfo.username,
      followerCount:600
    }
    const postCardProps = {
      postCardInteractionProps : defaultProps,
      posterInfoProps:posterProps,
      postImageSrc:mockProfileInfo.avatar,
    
    }

  return (
    <MainLayout mainComponents={ExplorePostCard(postCardProps)} navBar={SideNavbarComponent()}/>
  );
};

export default TestPage;
