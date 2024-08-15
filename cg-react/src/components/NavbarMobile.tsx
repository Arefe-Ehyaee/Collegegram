import hamMenu from "../assets/icons/hamMenu.svg";
import user from "../assets/icons/Frame 108.svg";
import angledpin from "../assets/icons/angled-pin.svg"
import bookmark from "../assets/icons/bookmark.svg"
import chat from "../assets/icons/chat.svg"
import bell from "../assets/icons/bell.svg"
import tags from "../assets/icons/tag.svg"
import { useState } from "react";
import MobileHamMenu from "./MobileHamMenu";


const NavbarMobile: React.FC = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <div className="fixed top-0 w-full bg-okhra-200 md:hidden">
      <div className="flex justify-between px-6 py-3">
        <button onClick={toggleMenu}>
          <img src={hamMenu} alt="menu" />
        </button>
        <img src={user} alt="user" />
      
      </div>
      <div className="fixed bottom-0 w-full">
      {isMenuOpen && <MobileHamMenu />}
      </div>
    </div>
  );
};

export default NavbarMobile;
