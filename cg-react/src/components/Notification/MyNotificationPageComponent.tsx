import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import NotificationComponent from "./NotificationComponent";
import { BeatLoader } from "react-spinners";
import NotifBadge from "./NotifBadge";

export interface Notif {
  notifCounts: number;
}

export default function MyNotificationPageComponent() {
  const [token, setToken] = useState<string | null>(null);
  const { ref, inView } = useInView();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || " ");
  }, []);

  const NotifTest = {
    notifCounts: 10,
  };

  return (
    <div dir="rtl" className="px-[72px] max-sm:pr-2">
      <div className="mt-10 flex justify-start max-sm:justify-center">
        <NavLink to="/myNotifications">
          <div className="flex">
            <h2 className="block px-7 font-isf text-xl text-grey-400 max-sm:px-2">
              اعلانات من
            </h2>
            {NotifTest.notifCounts > 0 && (
              <NotifBadge notifCounts={NotifTest.notifCounts}></NotifBadge>
            )}
          </div>
        </NavLink>

        <span className="px-4">|</span>

        <NavLink to="/myFriendsNotifications">
          <h2 className="block px-7 font-isf text-xl max-sm:px-2">
            اعلانات دوستان من
          </h2>
        </NavLink>
      </div>

      <div className="pt-16">
        <NotificationComponent
          notifType={"comment"}
          seen={false}
        ></NotificationComponent>

        <div className="flex justify-center" ref={ref}>
          {/* {isFetching && <BeatLoader />} */}
        </div>
      </div>
    </div>
  );
}
