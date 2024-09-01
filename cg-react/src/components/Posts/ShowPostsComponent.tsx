import { useEffect, useState } from "react";
import ShowPostModal from "./ShowPostModal";
import ModalTemplatePost from "./ModalTemplatePost";
import { useQuery } from "@tanstack/react-query";
import { FetchPosts } from "./FetchPosts";
import { useRecoilState } from "recoil";
import { userProfileAtom } from "../../user-actions/atoms";


interface ShowPostsProps {
  styling?: string;
}

interface Posts {
  authorId: string
caption: string
createdAt: string
id: string
media: Media[];
}

interface Media {
  id: string;
  mime: string;
  name: string;
  path: string;
  size: number;
  children?: React.ReactNode;
}


export default function ShowPostsComponent({ styling }: ShowPostsProps) {
  // const [photos, setPhotos] = useState<Photo[]>(photoList);
  const [showPostModal, setPostShowModal] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || " ");
  }, []);
  
  const handleOnClick = (id: string) => {
    setSelectedPhotoId(id);
    setPostShowModal(true);
  }

  const {data, error, isPending, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: () => FetchPosts(token || "", userProfile.username),
    enabled: !!token,
  })

  // console.log(data.data.posts);

  if(isPending){
    return <span>Loading...</span>
  }

  if(isError){
    return <span>Error: {error.message}</span>
  }
  const pageBaseURL = 'http://5.34.194.155:4000/'

  return (
    <div className="my-8 grid rounded-3xl border border-khakeshtari-400">
      {/* <CustomButtonH36
        text="ایجاد پست جدید"
        styling="bg-okhra-200 self-center"
      ></CustomButtonH36> */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-4">
      {data && data.data.posts.map((post: Posts ) => (
          <img
          key={post.id}
          className="aspect-square w-full cursor-pointer object-cover rounded-3xl"
          src={`${post.media[0].path}`}
          // alt={photo.alt}
          onClick={() => handleOnClick(post.id)}
          />     
        ))}
      </div>

      {showPostModal && (
          <ModalTemplatePost
          onClose={() => setPostShowModal(false)}
          showModal={showPostModal}
        >
          <ShowPostModal
            onClose={() => setPostShowModal(false)}
            id={selectedPhotoId} />
        </ModalTemplatePost>
        )
      }
    </div>
  );
}

