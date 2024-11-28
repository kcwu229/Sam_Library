import DefaultImage from "../../assets/images/userIcon1.jpg";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function UserSection({ userLoggedIn }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  const notifyLogout = () =>
    toast.success("Success logout !", {
      position: "top-center",
    });

  function handleLogout() {
    logout();
    Cookies.remove("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    notifyLogout();
    navigate("/");
  }

  function userProfile() {
    navigate("/user-profile/" + userId);
  }

  return userLoggedIn ? (
    <div className="flex items-center gap-4">
      <p className="text-white">{username}</p>
      <button onClick={userProfile}>
        <img
          src="/static/media/userIcon2.46533d1556a8bc0d24ec.jpg"
          className="w-10 h-10 rounded-full"
        />
      </button>

      <button
        className="text-sam-gray px-4 py-2 rounded-2xl
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
