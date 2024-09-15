import { BeatLoader } from "react-spinners";
import CustomButton from "./CustomButton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FetchFollowers } from "./profile-page/FetchFollowers";
import { useInView } from "react-intersection-observer";
import FollowerFollowing from "./FollowerFollowing";

interface FollowerListModalComponentProps {
    userId: string;
    token: string | null;
    onClick: () => void;
    FollowerListModal: Boolean;
}

export interface Follower {
  id?: string;
  avatar: { url: string };
  username: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  followersCount?: number;
}

const FollowerListModalComponent = ({userId, token, onClick, FollowerListModal} : FollowerListModalComponentProps) => {

  const { ref: followerRef, inView: followerInView } = useInView();

  const {
      data: followersData,
      fetchNextPage: fetchNextPageFollowers,
      hasNextPage: hasNextPageFollowers,
      isFetching: isFetchingFollowers,
      isError: isErrorFollowers,
      error: followersError,
      refetch: refetchFollowers,
    } = useInfiniteQuery({
      queryKey: ["followers", userId],
      queryFn: async ({ pageParam = 1 }) =>
        FetchFollowers({ pageParam }, userId || "", token || ""),
      getNextPageParam: (lastPage) => {
        return lastPage?.data?.nextPage ?? undefined;
      },
      initialPageParam: 1,
      enabled: !!FollowerListModal && !!token,
    });

      
  return (
    <div dir="rtl">
      <div className="pb-8 text-xl font-bold">دنبال کننده ها</div>
      {isFetchingFollowers && <BeatLoader />}
      <div className="max-h-[450px] overflow-y-scroll">
        {followersData &&
          !isFetchingFollowers &&
          followersData.pages.map((page) =>
            page.map((follower: Follower) => (
              <FollowerFollowing
                key={follower.id}
                name={follower.username}
                followersNumber={follower.followersCount}
                avatar={follower?.avatar?.url}
              />
            )),
          )}
      </div>
      <div className="flex justify-center" ref={followerRef}></div>
      <CustomButton
        text={"بستن"}
        className="mt-[34px] bg-red-200"
        handleOnClick={() => onClick()}
      ></CustomButton>
    </div>
  );
};

export default FollowerListModalComponent;
