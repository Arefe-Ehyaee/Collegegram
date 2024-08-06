import rcLogo from "./assets/icons/rclogo.svg";

interface MainLayoutProps {
  mainComponents?: JSX.Element
  navBar?:JSX.Element
}

export default function MainLayout({mainComponents,navBar}:MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-khakeshtari-100">
      <div className=" w-3/4">
        <header className="justify-start">
          <img
            src={rcLogo}
            alt="collegeGram Logo"
            className="ml-20 mt-16 block max-sm:hidden"
          />
        </header>
        <main>{mainComponents}</main>
      </div>
      <div className=" w-1/4 block max-sm:hidden">
        {navBar}
      </div>
    </div>
  );
}
