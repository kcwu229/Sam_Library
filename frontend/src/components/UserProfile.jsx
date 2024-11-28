import { useState, useEffect } from "react";
import InputTag from "./form/InputTag";
import LabelsTag from "./form/LabelsTag";
import CreateFormErrorTag from "./form/CreateFormErrorTag";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../services/UserSevices";
import { useToast } from "./Context/ToastMessageContext";
import userIcon1 from "../assets/images/userIcon1.jpg";
import userIcon2 from "../assets/images/userIcon2.jpg";
import userIcon3 from "../assets/images/userIcon3.jpg";
import userIcon4 from "../assets/images/userIcon4.jpg";

const UserProfile = () => {
  const params = useParams();
  const userId = params.id;
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [icon, setIcon] = useState(0);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    username: "",
    image: "",
    email: "", // This will store the image name
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    file: "",
    email: "",
  });

  const [file, setFile] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (userId) {
      console.log(`Fetching user with id: ${userId}`);
      getUser(userId)
        .then((response) => {
          console.log("User details fetched successfully", response.data);
          setUser(response.data);
          setIcon(parseInt(response.data.image));
          setUser({ ...response.data, password: "" });
          setConfirmPassword("");
        })
        .catch((error) => {
          console.log("Error while fetching user details", error);
        });
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
    setUser({ ...user, [name]: value });
  };

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (user.username.trim()) {
      errorsCopy.username = "";
    } else {
      valid = false;
      errorsCopy.username = "username is required";
    }

    if (user.firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      valid = false;
      errorsCopy.firstName = "firstname is required";
    }

    if (user.lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      valid = false;
      errorsCopy.lastName = "lastname is required";
    }

    if (user.email.trim()) {
      errorsCopy.eamil = "";
    } else {
      valid = false;
      errorsCopy.email = "email is required";
    }

    if (user.password.trim() && !confirmPassword.trim()) {
      valid = false;
      errorsCopy.confirmPassword = "Confirm password is required";
    } else if (!user.password.trim() && confirmPassword.trim()) {
      valid = false;
      errorsCopy.password = "Password is required";
    } else if (user.password.trim() && confirmPassword.trim()) {
      if (user.password !== user.confirmPassword) {
        valid = false;
        errorsCopy.password = "Passwords do not match";
        errorsCopy.confirmPassword = "Passwords do not match";
      } else {
        errorsCopy.password = "";
        errorsCopy.confirmPassword = "";
      }
    }

    setErrors(errorsCopy);
    return valid;
  }

  const saveOrUpdateuser = async (e) => {
    e.preventDefault();

    console.log("user object:", user);

    if (validateForm()) {
      const formData = new FormData();
      console.log("user object:", user);

      // Debugging: Log the user object to verify the fields
      console.log("user object:", user);
      const response = await updateUser(userId, user);
      console.log("responseddd", response);
      if (response.status === 200 || response.status === 201) {
        console.log("User created successfully", response.data);
        showToast("Successfully update user profile !", "success");
        navigate("/");
      }
    }
  };

  return (
    <form className="w-6/12" onSubmit={saveOrUpdateuser}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 relative">
          <LabelsTag for="userIcon" text="userIcon" />
          <div className="flex items-center gap-6 flex-col md:flex-row">
            {[userIcon1, userIcon2, userIcon3, userIcon4].map(
              (iconSrc, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="image"
                    onClick={() => {
                      setIcon(index);
                      setUser({ ...user, image: iconSrc });
                    }}
                    value={index}
                    className="hidden"
                  />
                  <img
                    src={iconSrc}
                    className={`rounded-full cursor-pointer ${
                      iconSrc === user.image
                        ? "border-4 border-red-400 md:w-48 w-32"
                        : "w-24 md:w-40"
                    }`}
                    alt="star"
                  />
                </label>
              )
            )}
          </div>
          <br />
          <p className="font-light text-sm">
            Choose one of the icon as your user icon
          </p>
          {errors.userIcon && <CreateFormErrorTag error={errors.userIcon} />}
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        {user && (
          <div className="w-full px-3 relative">
            <LabelsTag for="username" text="Username" required="*" />
            <InputTag
              id="username"
              name="username"
              text="username"
              onChange={handleInputChange}
              value={user.username}
              error={errors.username}
            />
            {errors.username && <CreateFormErrorTag error={errors.username} />}
          </div>
        )}
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        {user && (
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 relative">
            <LabelsTag for="firstName" text="First Name" required="*" />
            <InputTag
              id="firstName"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
              text="firstName"
              error={errors.firstName}
            />
            {errors.firstName && (
              <CreateFormErrorTag error={errors.firstName} />
            )}
          </div>
        )}
        {user && (
          <div className="w-full md:w-1/2 px-3 md:mb-0 relative">
            <LabelsTag for="lastName" text="Last name" required="*" />
            <InputTag
              id="lastName"
              name="lastName"
              text="Last name"
              onChange={handleInputChange}
              value={user.lastName}
              error={errors.lastName}
            />
            {errors.lastName && <CreateFormErrorTag error={errors.lastName} />}
          </div>
        )}
      </div>

      {user && (
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 relative">
            <LabelsTag for="email" text="email" />
            <InputTag
              id="email"
              name="email"
              text="email"
              onChange={handleInputChange}
              value={user.email}
              error={errors.email}
            />
            {errors.email && <CreateFormErrorTag error={errors.email} />}
          </div>
        </div>
      )}

      {user && (
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 relative">
            <LabelsTag for="password" text="Change password" />
            <InputTag
              id="password"
              name="password"
              text="Enter the new password"
              onChange={handleInputChange}
              error={errors.password}
              type="password"
            />
            {errors.password && <CreateFormErrorTag error={errors.password} />}
          </div>
        </div>
      )}

      {user && (
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 relative">
            <LabelsTag for="confirmPassword" text="Confirm password" />
            <InputTag
              id="confirmPassword"
              name="confirmPassword"
              text="Re-enter the new password"
              type="password"
              onChange={handleInputChange}
              value={confirmPassword}
              error={errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <CreateFormErrorTag error={errors.confirmPassword} />
            )}
          </div>
        </div>
      )}

      <button
        className="mb-20 bg-rose-500 rounded-xl px-8 py-2 text-center text-white 
              hover:border-rose-600 hover:border items-center mr-4 relative"
        type="submit"
      >
        {userId ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default UserProfile;
