import whitePen from "../../assets/icons/whitePen.svg";
import redPen from "../../assets/icons/redPen.svg";
import AvatarName from "../AvatarName";
import CustomButtonH36 from "../ButtonComponentH36";
import DesktopCaption from "./DesktopCaption";
import BottomNavbarMobile from "../BottonNavbarMobile";
import { userProfileAtom } from "../../user-actions/atoms";
import CommentSection from "./CommentSection";
import mockData from "./mockCommentData.json";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useLocation } from "react-router-dom";

interface PostsPageProps {
  imageSrc?: string;
  date?: string;
  caption?: string;
  children?: React.ReactNode;
}

interface Media {
  id: string;
  mime: string;
  name: string;
  path: string;
  size: number;
  children?: React.ReactNode;
}

const PostComponent: React.FC<PostsPageProps> = ({ children }) => {
  const userProfile = useRecoilValue(userProfileAtom);
  const mockCommentData = mockData.data;

  const commentingProps = {
    avatar: userProfile.avatar,
  };

  const avatar = userProfile.avatar;
  const username = userProfile.username;

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || " ");
  }, []);

  const location = useLocation();
  const data = location.state?.post;

  const pageBaseURL = "http://5.34.194.155:4000/";

  console.log(data.data.media);

  return (
    <div
      className="max-md:h-full mx-auto mt-4  max-md:w-full"
      dir="rtl"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="z-10 md:w-full"
          >
            {data &&
              data.data.media.map((post: Media) => (
                <SwiperSlide key={post.id}>
                  <img
                    src={`${pageBaseURL}${post.path}`}
                    className="h-[400px] w-[520px] rounded-3xl object-cover"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="px-4 h-[600px] overflow-auto">
          <div className="flex items-center justify-between max-md:mt-0">
            <AvatarName
              name={username}
              avatar={avatar}
              styling="py-4 pr-1"
            ></AvatarName>
            <CustomButtonH36
              text={"ویرایش پست"}
              iconsrc={whitePen}
              styling="bg-okhra-200 ml-1 max-md:hidden"
            ></CustomButtonH36>
            <img src={redPen} alt="edit" className="pl-6 md:hidden" />
          </div>
          <DesktopCaption
            date={data.data.createdAt}
            caption={data.data.caption}
            mentions={data.data.mentions}
          />
            

          {children}
          <CommentSection
            showProps={mockCommentData}
            commentingProps={commentingProps}
          ></CommentSection>
          <BottomNavbarMobile></BottomNavbarMobile>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
