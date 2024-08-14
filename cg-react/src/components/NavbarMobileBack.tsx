import back from "../assets/icons/back.svg";


const NavbarMobileBack: React.FC = () => {
  return (
    <div className="fixed top-0 w-full bg-khakeshtari-100 md:hidden">
      <div className="flex justify-between px-6 py-5">
        <img src={back} alt="menu" />
      </div>
    </div>
  );
};

export default NavbarMobileBack;
