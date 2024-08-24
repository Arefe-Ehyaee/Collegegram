import AvatarName from "./AvatarName";
import FollowerFollowing from "./FollowerFollowing";
import PostInteractions from "./Posts/PostInteractions";


const defaultProps = {
comments:50,
bookmarks:3,
  likes: 337,
};

const TestPage = () => {
  return (
    <PostInteractions {...defaultProps}/>
  );
};

export default TestPage;
