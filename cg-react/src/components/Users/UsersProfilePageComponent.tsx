import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userProfileAtom } from "../../user-actions/atoms";
import { useFetchWrapper } from "../../user-actions/fetch-wrapper";
import CustomButtonH32 from "../ButtonComponentH32";
import add from "../../assets/icons/add.svg";
import CustomButtonH36 from "../ButtonComponentH36";
import ModalTemplatePost from "../Posts/ModalTemplatePost";
import CloseFriendModal from "./CloseFriendModal";
import ToggleMenu from "../ToggleMenu";
import Dots from "../../assets/icons/Dots.svg";
import ModalTemplate from "../ModalTemplate";
import BlockingModal from "./BlockingModal";
import { useQuery } from "@tanstack/react-query";
import { FetchOthersProfile } from "./FetchOthersProfile";
import { useSearchParams } from "react-router-dom";

export default function UsersProfilePageComponent() {

  const [token, setToken] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const username = searchParams.get('username');


  const [showEditModal, setShowEditModal] = useState(false);

  const [clickedFollow, setClickedFollow] = useState(false);
  const [iconVisible, setIconVisible] = useState(true);

  const [BlockModal, setBlockModal] = useState(false);
  const [CloseFriendModalSate, setCloseFriendModalSate] = useState(false);
  const [NotCloseFriendModalSate, setNotCloseFriendModalSate] = useState(false);

  // useEffect(() => {
  //   if (BlockModal) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "unset";
  //   }
  // }, [BlockModal]);

  // const handleBlockModal = () => {
  //   setBlockModal((prevState) => !prevState);
  // };
  

  useEffect(() => {
    if (CloseFriendModalSate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [CloseFriendModalSate]);
  const handleCloseFriendModal = () => {
    setCloseFriendModalSate((prevState) => !prevState);
  };

  // useEffect(() => {
  //   if (NotCloseFriendModalSate) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "unset";
  //   }
  // }, [NotCloseFriendModalSate]);

  // const handleNotCloseFriendModalSate = () => {
  //   setNotCloseFriendModalSate((prevState) => !prevState);
  // };
  const handleButtonClicked = () => {
    setClickedFollow((prevState) => !prevState);
    setIconVisible((prevState) => !prevState);
  };


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || " ");
  }, []);

  const { data, isError, isPending, error } = useQuery({
    queryKey: ["othersProfile", username],
    queryFn: () => FetchOthersProfile(token || "", username as string),
    enabled: !!username,
  });

  console.log("data:", data);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const pageBaseURL = "http://5.34.194.155:4000/";

  return (
    <div dir="rtl" className="md:px-16">
      <div className="ml-16 border-b border-khakeshtari-400 py-9 max-sm:ml-8 max-sm:mr-8">
        <div className="flex items-center justify-between space-x-4 max-sm:flex-col">
          <div className="flex w-full items-center gap-8">
            <img
              src={`${pageBaseURL}${data.data.avatar.path}`}
              alt="avatar"
              className="h-[136px] w-[136px] rounded-full border-2 border-khakeshtari-400 max-sm:h-[56px] max-sm:w-[56px] max-sm:self-baseline"
            />
            <div className="ml-4 w-full">
              <p className="text-right text-sm text-tala" dir="ltr">
                {`@${data.data.username}`}
              </p>
              <div className="mt-4 flex items-center gap-x-3">
                <h3 className="text-xl font-bold text-sabz-100">
                  {`${data.data.first_name} ${data.data.last_name}`}
                </h3>
                <CustomButtonH32
                  text={clickedFollow ? "دنبال نکردن" : "دنبال کردن"}
                  iconsrc={iconVisible ? add : null}
                  styling={
                    clickedFollow
                      ? "bg-khakeshtari-100 ml-1 border border-okhra-200 text-okhra-200"
                      : " bg-okhra-200 ml-1 text-white"
                  }
                  handleOnClick={handleButtonClicked}
                ></CustomButtonH32>
              </div>
              <div className="flex items-center justify-between">
                <div className="mt-4 flex gap-x-3 text-sm font-normal text-sabz-200">
                  <span className="border-l pl-3">
                    {data.data.followersCount} دنبال کننده
                  </span>
                  <span className="border-l pl-3">
                    {data.data.followingCount} دنبال شونده
                  </span>
                  <span className="pl-3">{data.data.postCount} پست</span>
                </div>
                <ToggleMenu imgSrc={Dots}>
                  <ul>
                    <li className="hover:bg-gray-100 cursor-pointer px-4 py-2">
                      گزینه اول
                    </li>
                    <li className="hover:bg-gray-100 cursor-pointer px-4 py-2">
                      گزینه دوم
                    </li>
                    <li className="hover:bg-gray-100 cursor-pointer px-4 py-2">
                      گزینه سوم
                    </li>
                  </ul>
                </ToggleMenu>
              </div>
              <p className="mt-4 text-sm text-khakeshtari-400 max-sm:justify-self-center">
                {data.data.bio}
              </p>
            </div>
          </div>

          {CloseFriendModalSate && (
            <ModalTemplatePost
              onClose={() => setCloseFriendModalSate(false)}
              showModal={CloseFriendModalSate}
            >
              {/* <BlockingModal name={"Arefe"}></BlockingModal> */}
              <CloseFriendModal name={"Arefe"}></CloseFriendModal>
              <div className="mt-8 flex flex-row self-end">
                <CustomButtonH36
                  text="پشیمون شدم"
                  styling="!text-siah ml-4"
                  handleOnClick={() => setCloseFriendModalSate(false)}
                />
                <CustomButtonH36
                  text="آره حتما"
                  styling="bg-okhra-200"
                  handleOnClick={() => setCloseFriendModalSate(false)}
                />
              </div>
            </ModalTemplatePost>
          )}
        </div>
      </div>
    </div>
  );
}
