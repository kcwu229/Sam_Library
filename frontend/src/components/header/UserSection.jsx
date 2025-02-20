import DefaultImage from "../../assets/images/user.jpg";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Context/ToastMessageContext";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import DropdownTag from "../dropdown/DropdownTag";

function UserSection({ userLoggedIn, userData }) {
  const { showToast } = useToast();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [userIcon, setUserIcon] = useState(null);
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const removeItems = ["userId", "userRole"];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setTimeout(() => {
      setDropdownOpen(false);
    }, 200); // Adjust the delay as needed
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

  function userProfile() {
    navigate("/user-profile/" + userId);
  }

  useEffect(() => {
    if (userId != null) {
      //const response = getUser(userId);
      setUserIcon(userData.image);
    }
  });

  return userLoggedIn ? (
    <div className="md:flex items-center gap-4 hidden">
      <div className="flex felx-row items-center gap-3">
        <p className="text-white">{userData.username}</p>

        <button onClick={toggleDropdown}>
          <img
            src={userIcon ? userIcon : DefaultImage}
            className="w-10 h-10 rounded-full relative"
          />
        </button>
      </div>

      <div
        id="dropdownDelay"
        className={` mt-40 z-10 absolute right-0 ${
          dropdownOpen ? "block" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-28`}
        onMouseLeave={closeDropdown}
      >
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownBtn"
        >
          <li onClick={userProfile} className="cursor-pointer">
            <DropdownTag text="Edit profile" value="title" />
          </li>
          <li onClick={handleLogout} className="cursor-pointer">
            <DropdownTag text="Logout" />
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <div className="md:flex hidden mr-4">
      <a href="/login" className="px-4 py-2 text-sam-gray">
        Sign In
      </a>
      <a href="/sign-up">
        <button
          className="text-sam-gray px-4 py-2 rounded-2xl ml-4 
        bg-sam-orange"
        >
          Sign Up
        </button>
      </a>
    </div>
  );
}

export default UserSection;
