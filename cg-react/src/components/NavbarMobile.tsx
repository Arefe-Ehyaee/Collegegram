import hamMenu from "../assets/icons/hamMenu.svg";
import user from "../assets/icons/Frame 108.svg";

const NavbarMobile: React.FC = () => {
  return (
    <div className="fixed top-0 w-full bg-okhra-200 md:hidden">
      <div className="flex justify-between px-6 py-3">
        <img src={hamMenu} alt="menu" />
        <img src={user} alt="user" />
      </div>
    </div>
  );
};

export default NavbarMobile;
