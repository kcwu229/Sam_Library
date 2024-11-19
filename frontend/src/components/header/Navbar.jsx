import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import LogoImage from "../../assets/images/logo-inverted.png";
import UserSection from "../UserSection";
import NavBarTag from "./NavBarTag";

function Navbar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  const handleTabClick = (href) => {
    setActiveTab(href);
  };

  return (
    <nav className="w-full fixed top-0 z-20 bg-gray-900 shadow-lg items-center">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Link to="/" className="flex items-center">
            <img src={LogoImage} alt="logo" className="w-28" />
          </Link>
        </div>

        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex items-center flex-col md:flex-row md:space-x-8 rtl:space-x-reverse font-medium md:p-0 md:mt-0 rounded-lg">
            <NavBarTag
              href="/"
              text="HomePage"
              isActive={activeTab === "/"}
              onClick={() => handleTabClick("/")}
            />
            <NavBarTag
              href="/books"
              text="Books"
              isActive={activeTab === "/books"}
              onClick={() => handleTabClick("/books")}
            />
            <NavBarTag
              href="/authors"
              text="Authors"
              isActive={activeTab === "/authors"}
              onClick={() => handleTabClick("/authors")}
            />
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
