import DefaultImage from "../../assets/images/user.png";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function UserSection({ userLoggedIn }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const notifyLogout = () =>
    toast.success("Success logout !", {
      position: "top-center",
    });

  function handleLogout() {
    //
    logout();
    Cookies.remove("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    notifyLogout();
    navigate("/");
  }

  function userProfile() {
    navigate("/user-profile");
  }

  return userLoggedIn ? (
    <div className="flex items-center">
      <button>
        <img src={DefaultImage} className="w-8 h-8" onClick={userProfile} />
      </button>

      <button
        className="text-sam-gray px-4 py-2 rounded-2xl ml-4
         bg-sam-orange"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="mr-4">
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
