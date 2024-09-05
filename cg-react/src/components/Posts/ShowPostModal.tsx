import AvatarName from "../AvatarName";
import whitePen from "../../assets/icons/whitePen.svg";
import DesktopCaption from "./DesktopCaption";
import { useRecoilValue } from "recoil";
import { userProfileAtom } from "../../user-actions/atoms";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FetchPost } from "./FetchPost";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Navigation} from 'swiper/modules';
import PostInteractions from "./PostInteractions";
import openPostPage from "../../assets/icons/Group 21.svg";
import { useNavigate } from "react-router-dom";
import timeTranslate from "../../utilities/timeTranslationFunction";
import CustomButton from "../CustomButton";
import ModalTemplate from "../ModalTemplate";
import EditPostsModal from "../upload-edit-posts/EditPostModal";

interface ShowPostModalProps {
  onClose: () => void;
  children?: React.ReactNode;
  id: string;
}

const InteractiondefaultProps = {
  comments: 50,
  bookmarks: 3,
  likes: 337,
};

const ShowPostModal: React.FC<ShowPostModalProps> = ({
  onClose,
  id,
  children,
}) => {
  const userProfile = useRecoilValue(userProfileAtom);
  const avatar = userProfile.avatar;
  const username = userProfile.username;
  console.log("profileData", userProfile);

  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || " ");
  }, []);

  const [editPostModal, setEditPostModal] = useState(false);

  const handleEditPostClick = () => {
    setEditPostModal(true);
  };

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["post"],
    queryFn: () => FetchPost(token || "", id),
    enabled: !!token,
  });

  console.log("postId", id);

  const handleOnClick = () => {
    if (data && id) {
      navigate("/posts", { state: { post: data, postId: id } });
    }
  };

  const pageBaseURL = "http://5.34.194.155:4000/";

  return (
    <div className="max-w-[1200px]" dir="rtl">
      <button onClick={handleOnClick}>
        <img src={openPostPage}></img>
      </button>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="h-auto w-full md:max-w-[520px]">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="md:w-full"
            modules={[Navigation]}
          >
            {data &&
              data.data.media.map((post: any) => (
                <SwiperSlide key={post.id}>
                  <img
                    src={`${post.url}`}
                    className="h-[400px] w-[520px] rounded-3xl object-cover"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        <div className="flex flex-col gap-3 h-[500px] overflow-auto">
          <div className="flex items-center justify-between gap-12">
            <div>
              <AvatarName name={username} avatar={avatar} />
            </div>
            <div className="hidden md:block">
              <CustomButton text={"ویرایش پست"}
                iconsrc={whitePen}
                className="bg-okhra-200 ml-1" 
                handleOnClick={handleEditPostClick}></CustomButton>
            </div>
          </div>
          {data && (
            <DesktopCaption
              date={timeTranslate(data.data.createdAt)}
              caption={data.data.caption}
              mentions={data.data.mentions}
            />
          )}
          <div className="grid justify-items-end">
            <PostInteractions {...InteractiondefaultProps} />
          </div>
        </div>
      </div>
      {children}

      {editPostModal && (
        <ModalTemplate
          showModal={editPostModal}
          onClose={() => setEditPostModal(false)}
        >
          {" "}
          <EditPostsModal onClose={() => setEditPostModal(false)} postData={data.data} postId={id}/>
        </ModalTemplate>
      )}
    </div>
  );
};

export default ShowPostModal;
