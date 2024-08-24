import CustomButtonH36 from "../ButtonComponentH36";
import rect1 from "../../assets/Images/Rectangle 67.png"
import rect2 from "../../assets/Images/Rectangle 68.png"
import rect3 from "../../assets/Images/Rectangle 69.png"
import rect4 from "../../assets/Images/Rectangle 70.png"
import rect5 from "../../assets/Images/Rectangle 71.png"
import rect6 from "../../assets/Images/Rectangle 72.png"
import { useState } from "react";
import ShowPostModal from "./ShowPostModal";
import ModalTemplatePost from "./ModalTemplatePost";
import { useQuery } from "@tanstack/react-query";
import { FetchPosts } from "./FetchPosts";


interface ShowPostsProps {
  styling?: string;
}
interface Photo {
  id: string;
  src: string;
  alt: string;
}

// const photoList: Photo[] = [
//   { id: '1', src: rect1, alt: 'Rectangle 67' },
//   { id: '2', src: rect2, alt: 'Rectangle 68' },
//   { id: '3', src: rect3, alt: 'Rectangle 69' },
//   { id: '4', src: rect4, alt: 'Rectangle 70' },
//   { id: '5', src: rect5, alt: 'Rectangle 71' },
//   { id: '6', src: rect6, alt: 'Rectangle 72' }
// ];


export default function ShowPostsComponent({ styling }: ShowPostsProps) {
  const [photos, setPhotos] = useState<Photo[]>(photoList);
  const [showPostModal, setPostShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  const handleOnClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setPostShowModal(true);
  }

  const {data, error, isPending, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: () => FetchPosts(token || ""),
  })

  if(isPending){
    return <span>Loading...</span>
  }

  if(isError){
    return <span>Error: {error.message}</span>
  }


  return (
    <div className="my-8 grid rounded-3xl border border-khakeshtari-400">
      {/* <CustomButtonH36
        text="ایجاد پست جدید"
        styling="bg-okhra-200 self-center"
      ></CustomButtonH36> */}
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-8">
      {data.map((photo: Photo) => (
          <img
          key={photo.id}
          className="aspect-square w-full cursor-pointer max-h-[304px]"
          src={photo.src}
          alt={photo.alt}
          onClick={() => handleOnClick(photo)}
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
            photo={selectedPhoto!} 
          />
        </ModalTemplatePost>
        )
      }
    </div>
  );
}

