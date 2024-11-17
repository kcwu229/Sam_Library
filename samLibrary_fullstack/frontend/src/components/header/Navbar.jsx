import LogoImage from "../../assets/images/logo-inverted.png";
import NavBarTag from "./NavBarTag";
import UserSection from "../UserSection";

function Navbar() {
  return (
    <nav className="w-full fixed top-0 z-20 bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <a href="/" className="flex items-center">
            <img src={LogoImage} alt="logo" className="w-28" />
          </a>
        </div>

        <div className="hidden md:flex flex-grow items-center justify-center">
          <ul
            className="flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse font-medium  
          md:p-0 md:mt-0 rounded-lg"
          >
            <NavBarTag href="/" text="HomePage" ariaCurrent="page" />
            <NavBarTag href="/books" text="Find Book" />
            <NavBarTag href="#contact" text="Contact" />
          </ul>
        </div>

        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <UserSection userLoggedIn={false} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
