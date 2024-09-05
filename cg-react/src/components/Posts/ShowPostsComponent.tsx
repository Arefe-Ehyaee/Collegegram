import { useEffect, useState } from "react";
import ShowPostModal from "./ShowPostModal";
import ModalTemplatePost from "./ModalTemplatePost";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { FetchPosts } from "./FetchPosts";
import { useInView } from "react-intersection-observer";
import { BeatLoader } from "react-spinners";

interface ShowPostsProps {
  username: string;
}

interface Posts {
  authorId: string;
  caption: string;
  createdAt: string;
  id: string;
  media: Media[];
}

interface Media {
  id: string;
  mime: string;
  name: string;
  url: string;
  size: number;
  children?: React.ReactNode;
}

export default function ShowPostsComponent({ username }: ShowPostsProps) {
  // const [photos, setPhotos] = useState<Photo[]>(photoList);
  const [showPostModal, setPostShowModal] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  const { ref, inView } = useInView();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || " ");
  }, []);

  const handleOnClick = (id: string) => {
    setSelectedPhotoId(id);
    setPostShowModal(true);
  };


  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ['posts', token, username],
    queryFn: async ({ pageParam = 1 }) => FetchPosts({ pageParam }, token || '', username),
    getNextPageParam: (lastPage) => {
        return lastPage?.data?.nextPage ?? undefined; 
    },
    initialPageParam: 1,
    enabled: !!token && !!username,
  });

  useEffect (() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  } , [inView, hasNextPage, fetchNextPage])

  // console.log(data.data.posts);

  // if (isPending) {
  //   return <span>Loading...</span>;
  // }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  const pageBaseURL = "http://5.34.194.155:4000/";
  console.log("post",data?.pages)

  return (
    <div className="my-8 grid rounded-3xl border border-khakeshtari-400">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-4">
        {data && 
          data?.pages.flatMap((page) => 
          page.data?.posts.map((post: Posts) => (
            <img
              key={post.id}
              className="aspect-square object-cover max-h-[304px] w-full cursor-pointer rounded-3xl"
              src={`${post.media[0].url}`}
              // alt={photo.alt}
              onClick={() => handleOnClick(post.id)}
            />
          )))}
      </div>

      {showPostModal && (
        <ModalTemplatePost
          onClose={() => setPostShowModal(false)}
          showModal={showPostModal}
        >
          <ShowPostModal
            onClose={() => setPostShowModal(false)}
            id={selectedPhotoId}
          />
        </ModalTemplatePost>
      )}
      <div className="flex justify-center" ref={ref}>
        {isFetching && (<BeatLoader/>)}
      </div>
    </div>
  );
}
