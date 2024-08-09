import rcLogo from "../assets/icons/rclogo.svg";
interface MainLayoutProps {
  mainComponents?: JSX.Element
  navBar?:JSX.Element
}


 const MainLayout = ({mainComponents,navBar}:MainLayoutProps) => {

  return (
    <div className="flex min-h-screen bg-khakeshtari-100">
      <div className=" w-3/4 max-sm:w-full">
        <header className="justify-start">
          <img
            src={rcLogo}
            alt="collegeGram Logo"
            className="ml-20 mt-16 block max-sm:hidden"
          />
        </header>
        <main className="flex-col h-full">{mainComponents}</main>
      </div>
      <div className=" w-1/4 block max-sm:hidden">
        {navBar}
      </div>
    </div>
  );
}

export default MainLayout