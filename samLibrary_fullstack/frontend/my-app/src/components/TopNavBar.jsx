import LogoImage from "../assets/images/logo.png";
import NavBarTag from "./atoms/NavBarTag";
import UserSection from "./UserSection";

function TopNavBar() {
  return (
    <nav className="bg-white w-full fixed top-0 z-50">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <a href="/" className="flex items-center">
            <img src={LogoImage} alt="logo" className="w-20 h-18 p-2" />
          </a>
        </div>

        <div className="hidden md:flex flex-grow items-center justify-center">
          <ul
            className="flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse font-medium p-4 
          md:p-0 md:mt-0 rounded-lg"
          >
            <NavBarTag href="/" text="HomePage" ariaCurrent="page" />
            <NavBarTag href="#" text="About" />
            <NavBarTag href="#" text="Book and More" />
            <NavBarTag href="#" text="Event" />
            <NavBarTag href="#" text="Contact" />
          </ul>
        </div>

        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <UserSection userLoggedIn={false} />
        </div>
      </div>
    </nav>
  );
}

export default TopNavBar;
