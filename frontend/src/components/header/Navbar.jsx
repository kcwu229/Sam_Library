import { useState, useEffect } from "react";
import DefaultImage from "../../assets/images/user.jpg";
import { useLocation, Link, useNavigate } from "react-router-dom";
import LogoImage from "../../assets/images/logo-inverted.png";
import { useAuth } from "../Context/AuthContext";
import { useToast } from "../Context/ToastMessageContext";
import UserSection from "./UserSection";
import NavBarTag from "./NavBarTag";
import { SlMenu } from "react-icons/sl";
import DropdownTag from "../dropdown/DropdownTag";
import { FaHome } from "react-icons/fa";
import { getUser } from "../../services/UserSevices";
import Cookies from "js-cookie";
import { FaBookOpen } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
function Navbar() {
  const location = useLocation();
  const { showToast } = useToast();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [userIcon, setUserIcon] = useState(null);
  const [activeTab, setActiveTab] = useState(location.pathname);
  const { logout } = useAuth();
  const removeItems = ["userId", "userRole"];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  // flag
  const isLoggedIn = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (userId != null) {
      getUser(userId)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  const handleTabClick = (href) => {
    setActiveTab(href);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  function handleLogout() {
    logout();
    Cookies.remove("token");
    removeItems.forEach((items) => {
      localStorage.removeItem(items);
    });
    showToast("Successfully logout !", "success");
    navigate("/");
  }

  const navigateEditProfile = () => {
    navigate("/user-profile/" + userId);
  };

  const closeDropdown = () => {
    setTimeout(() => {
      setDropdownOpen(false);
    }, 200); // Adjust the delay as needed
  };

  const navigateBookList = () => {
    navigate("/books");
  };

  const navigateHomePage = () => {
    navigate("/");
  };

  const navigateSignIn = () => {
    navigate("/login");
  };

  const navigateSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <nav className="w-full top-0 z-20 bg-gray-900 shadow-lg items-center h-30">
      <div className="flex items-center justify-between mx-auto px-4 h-full">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Link to="/" className="flex items-center">
            <img src={LogoImage} alt="logo" className="w-20 h-auto" />
          </Link>
        </div>

        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex items-center flex-col md:flex-row md:space-x-8 rtl:space-x-reverse font-medium md:p-0 md:mt-0 rounded-lg">
            <NavBarTag
              href="/"
              iconImage={<FaHome className="w-6 h-6" />}
              text="Home"
              isActive={activeTab === "/"}
              onClick={() => handleTabClick("/")}
            />

            <NavBarTag
              href="/books"
              text="Books"
              iconImage={<FaBookOpen className="w-6 h-6" />}
              isActive={activeTab === "/books"}
              onClick={() => handleTabClick("/books")}
            />
          </ul>
        </div>

        <div className="flex items-center space-x-3 rtl:space-x-reverse md:hidden">
          <div className="flex items-center gap-6">
            <div className="flex felx-row items-center gap-3">
              <button onClick={toggleDropdown}>
                <SlMenu className="w-6 h-8 text-white mr-4" />
              </button>
            </div>

            <div
              id="dropdownDelay"
              className={`rounded-xl mt-80 z-10 absolute right-0 w-4/12 ${
                dropdownOpen ? "block" : "hidden"
              } bg-gray-50 border-black divide-y divide-gray-100 shadow w-28`}
              onMouseLeave={closeDropdown}
            >
              <ul
                className="text-sm text-gray-700"
                aria-labelledby="dropdownBtn"
              >
                {isLoggedIn && (
                  <div
                    className="flex flex-row items-center justify-center 
                  gap-5 read-only p-2 bg-gray-500 cursor"
                  >
                    <p className="text-white font-bold">{userData.username}</p>

                    <img
                      src={userData.image ? userData.image : DefaultImage}
                      className="w-10 h-10 rounded-full relative border-2 border-white"
                    />
                  </div>
                )}
                <div className="flex items-center mt-3">
                  <span className="px-3 text-orange-500 font-medium">
                    Basic Function
                  </span>
                  <hr className="flex-grow border-t border-orange-500" />
                </div>
                <li onClick={navigateHomePage} className="cursor-pointer">
                  <DropdownTag
                    text="Home"
                    value="title"
                    isActive={activeTab === "/"}
                    iconImage={<FaHome className="w-4 h-4" />}
                  />
                </li>
                <li onClick={navigateBookList} className="cursor-pointer">
                  <DropdownTag
                    text="Books"
                    value="title"
                    isActive={activeTab === "/books"}
                    iconImage={<FaBookOpen className="w-4 h-4" />}
                  />
                </li>
                <hr className="mt-1 mb-1" />
                {!isLoggedIn && (
                  <>
                    <div className="flex items-center mt-4">
                      <span className="px-3 text-blue-500 font-medium">
                        Login Section
                      </span>
                      <hr className="flex-grow border-t border-blue-500" />
                    </div>

                    <Link to="/login">
                      <li className="cursor-pointer">
                        <DropdownTag
                          text="Sign In"
                          value="title"
                          isActive={activeTab === "/login"}
                        />
                      </li>
                    </Link>
                    <Link to="/sign-up">
                      <li onClick={navigateSignUp} className="cursor-pointer">
                        <DropdownTag
                          text="Sign Up"
                          value="sign-up"
                          isActive={activeTab === "/sign-up"}
                        />
                      </li>
                    </Link>
                  </>
                )}
                {isLoggedIn && (
                  <>
                    <div className="flex items-center mt-4">
                      <span className="px-3 text-blue-500 font-medium">
                        User Section
                      </span>
                      <hr className="flex-grow border-t border-blue-500" />
                    </div>
                    <Link to={`/user-profile/${userId}`}>
                      <li className="cursor-pointer">
                        <DropdownTag
                          text="Edit Profile"
                          value="title"
                          isActive={activeTab === `/user-profile/${userId}`}
                          iconImage={<MdEdit className="w-4 h-4" />}
                        />
                      </li>
                    </Link>

                    <li onClick={handleLogout} className="cursor-pointer">
                      <DropdownTag
                        text="Logout"
                        iconImage={<TbLogout className="w-4 h-4" />}
                      />
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        <UserSection userLoggedIn={isLoggedIn} userData={userData} />
      </div>
    </nav>
  );
}

export default Navbar;
