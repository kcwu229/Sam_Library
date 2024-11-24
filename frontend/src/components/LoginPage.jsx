import LoginImage from "../assets/images/login.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputTag from "./form/InputTag";
import LabelsTag from "./form/LabelsTag";
import CreateFormErrorTag from "./form/CreateFormErrorTag";
import { ToastContainer, toast } from "react-toastify";
import { authenticateUser } from "../services/AuthenticationService";
import { useAuth } from "./Context/AuthContext";
import { useUser } from "./Context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "./Context/ToastMessageContext";
import Cookies from "js-cookie";

function LoginPage() {
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setUserId, setRole } = useUser();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function validateForm() {
    let valid = true;

    const errorCopy = { ...errors };

    if (formData.username === "") {
      errorCopy.username = "Username is required !";
      valid = false;
    } else {
      errorCopy.username = "";
    }

    if (formData.password === "") {
      errorCopy.password = "Password is required !";
      valid = false;
    } else {
      errorCopy.password = "";
    }

    setErrors(errorCopy);
    return valid;
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const submitLoginForm = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await authenticateUser(formData);
        console.log("login obj is : ", response);
        const userId = response.data;
        // Set the user ID in the context
        if (response.status === 200 || response.status === 201) {
          login();
          setUserId(userId);
          setRole(userId);
          const jwtToken = response.data.access_token;
          Cookies.set("token", jwtToken, { expires: 7 });
          //setCookie("jwtToken", jwtToken, { path: "/" });
          showToast("Successfully login !", "success");
          navigate("/books");
        }
      } catch (error) {
        console.error(error);
        showToast("Login failed. Please try again.", "error");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div
      id="background"
      className="flex justify-center items-center w-screen h-screen bg-slate-200"
    >
      <div
        id="container"
        className="w-9/12 flex flex-row bg-white rounded-3xl shadow-lg h-min"
      >
        {/* image */}
        <div className="hidden lg:flex md:w-full md:relative md:m-6">
          <img
            loading="lazy"
            className="hidden md:block rounded-2xl md:w-11/12 lg:w-full h-full "
            src={LoginImage}
            alt="Login"
          />
          <div
            id="color-filter"
            className="rounded-2xl bg-black opacity-15 absolute inset-0 md:w-11/12 lg:w-full h-full"
          ></div>
          <p
            className="absolute font-bold text-white 
          lg:text-3xl md:text-lg bottom-10 m-16 tracking-wider leading-loose"
          >
            "Access a World of Knowledge Anytime, Anywhere. Your Library
            Awaits—Login to Discover Endless Reading Adventures!"
          </p>
        </div>

        {/* Login Form */}
        <div className="w-full lg:w-5/12 flex items-center justify-center relative p-8">
          <div className="w-full max-w-sm">
            <form className="w-full relative" onSubmit={submitLoginForm}>
              <h1 className="mb:text-lg font-bold mb-4 mt-1 text-4xl text-center text-slate-700">
                Welcome Back
              </h1>
              <p className="text-center">Log in to your account</p>
              <br />

              {/* username */}
              <div className="mb-4 relative mt-10">
                <LabelsTag for="username" text="Username" />
                <InputTag
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  text="Enter your username"
                  error={errors.username}
                />
                {errors.username && (
                  <CreateFormErrorTag error={errors.username} />
                )}
              </div>

              {/* password */}
              <div className="mb-10 relative mt-10">
                <LabelsTag for="password" text="Password" />
                <InputTag
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  text="Enter your password"
                  type="password"
                  error={errors.password}
                />
                {errors.password && (
                  <CreateFormErrorTag error={errors.password} />
                )}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4" />
                  <label className=" inline-flex items-center ml-3 md:">
                    Remember me
                  </label>
                </div>
                <a href="/forget-password" className="text-sm">
                  Forget Password?
                </a>
              </div>

              <button
                className="bg-slate-700 hover:bg-slate-900 
                text-white font-bold py-3 
                px-10 lg:px-10 xl:px-20 md:px-5 rounded focus:outline-none mt-10 mb-8 
                focus:shadow-outline w-full"
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </button>
              <div className="text-center mt-2">
                Don't have an account?
                <a
                  href="/sign-up"
                  className="ml-2 text-slate-700 hover:underline"
                >
                  Sign up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
