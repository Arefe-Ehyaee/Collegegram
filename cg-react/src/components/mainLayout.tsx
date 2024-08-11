import rcLogo from "../assets/icons/rclogo.svg";
import hamMenu from "../assets/icons/Auto Layout Horizontal.svg"
import user from "../assets/icons/Frame 108.svg"

interface MainLayoutProps {
  mainComponents?: JSX.Element
  navBar?:JSX.Element
}


 const MainLayout = ({mainComponents,navBar}:MainLayoutProps) => {

  return (
    <div className="flex min-h-screen bg-khakeshtari-100">
      <div className=" w-3/4 max-md:w-full max-md:mt-[67px]">
        <header className="justify-start">
          <img
            src={rcLogo}
            alt="collegeGram Logo"
            className="ml-20 mt-16 block max-md:hidden"
          />
        </header>
        <main className="flex-col h-full">{mainComponents}</main>
      </div>
      <div className=" w-1/4 block max-md:hidden">
        {navBar}
      </div>
      <div className="md:hidden w-full fixed bg-okhra-200 top-0">
        <div className="flex justify-between px-6 py-3">
        <img src={hamMenu} alt="menu" />
        <img src={user} alt="user" />
        </div>
      </div>
    
        <div className="min-md:hidden max-md:w-full fixed h-[56px] bg-okhra-200 bottom-0 rounded-full"></div>
       
       </div> 
  );
}

export default MainLayout