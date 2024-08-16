import rcLogo from "../assets/icons/rclogo.svg";
import NavbarMobile from "./NavbarMobile";
import BottomNavbarMobile from "./BottonNavbarMobile";
import { useState } from "react";

interface MainLayoutProps {
  mainComponents?: JSX.Element;
  navBar?: JSX.Element;
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps>  = ({ mainComponents, navBar, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };
  
  return (
    <div className="flex min-h-screen bg-khakeshtari-100">
      <div className="w-3/4 max-md:mt-[67px] max-md:w-full">
        <header className="justify-start">
          <img
            src={rcLogo}
            alt="collegeGram Logo"
            className="ml-20 mt-16 block max-md:hidden"
          />
        </header>
        <main className="h-full flex-col">{mainComponents}</main>
      </div>
      <div className="block w-1/4 max-md:hidden">{navBar}</div>
      {children}
      <NavbarMobile isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      {!isMenuOpen && <BottomNavbarMobile />}

    </div>
  );
};

export default MainLayout;
