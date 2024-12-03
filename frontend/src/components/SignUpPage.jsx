import SignUpImage from "../assets/images/signUp.png";
import { useState } from "react";
import { registrateUser } from "../services/AuthenticationService";
import { useNavigate } from "react-router-dom";
import InputTag from "./form/InputTag";
import LabelsTag from "./form/LabelsTag";
import CreateFormErrorTag from "./form/CreateFormErrorTag";
import { ToastContainer, toast } from "react-toastify";
import { useToast } from "./Context/ToastMessageContext";
import "react-toastify/dist/ReactToastify.css";

function SignUpPage() {
  const { showToast } = useToast();
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyPress = (e, callback) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const navigate = useNavigate();

  function validateForm() {
    let valid = true;

    const errorCopy = { ...errors };

    if (formData.username === "") {
      errorCopy.username = "Username is requiorange !";
      valid = false;
    } else {
      errorCopy.username = "";
    }

    if (formData.email === "") {
      errorCopy.email = "Email is requiorange !";
      valid = false;
    } else {
      errorCopy.email = "";
    }

    if (formData.password === "") {
      errorCopy.password = "Password is requiorange !";
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
      try {
        const response = await registrateUser(formData);
        console.log("response", response);

        if (response.status === 200 || response.status === 201) {
          localStorage.setItem("username", formData.username);
          localStorage.setItem("password", formData.password);
          navigate("/login");
          showToast("Successfully registration !", "success");
          await sleep(2000);
          showToast("redirecting you to login page", "success");
          await sleep(2000);
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          showToast(
            "The username / email is already been registrated",
            "error"
          );
        } else {
          showToast("Registrate failed. Please try again.", "error");
          console.error();
        }
      }
    }
  };

  return (
    <div
      id="background"
      className="flex justify-center items-center w-screen h-screen bg-orange-50 "
    >
      <div
        id="container"
        className="w-9/12 flex flex-row bg-white rounded-3xl shadow-lg h-min p-2"
      >
        {/* image */}
        <div className="hidden lg:flex md:w-full md:relative md:m-6">
          <img
            loading="lazy"
            className="hidden md:block rounded-2xl md:w-11/12 lg:w-full h-full "
            src={SignUpImage}
            alt="Login"
          />
          <div
            id="color-filter"
            className="rounded-2xl bg-black opacity-15 absolute inset-0 md:w-11/12 lg:w-full h-full"
          ></div>
        </div>

        {/* Login Form */}
        <div className="w-full lg:w-5/12 flex items-center justify-center relative p-8">
          <div className="w-full max-w-sm">
            <form className="w-full relative" onSubmit={submitLoginForm}>
              <h1 className="mb:text-lg font-bold mb-4 mt-1 text-4xl text-center text-orange-600">
                Hello !
              </h1>
              <p className="text-center">Create your own account</p>
              <br />

              {/* email */}
              <div className="mb-4 relative">
                <LabelsTag for="email" text="Email" />
                <InputTag
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  text="Enter your email"
                  error={errors.email}
                />
                {errors.email && <CreateFormErrorTag error={errors.email} />}
              </div>

              {/* username */}
              <div className="mb-4 relative">
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
              <div className="mb-10 relative">
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

              <button
                className="bg-orange-400 hover:bg-orange-600
                text-white font-bold py-3 
                px-10 lg:px-10 xl:px-20 md:px-5 rounded focus:outline-none mt-4 mb-8 
                focus:shadow-outline w-full"
                type="submit"
                onKeyUp={handleKeyPress}
              >
                Login
              </button>
              <div className="text-center mt-2">
                Already have an account?
                <a
                  href="/login"
                  className="ml-2 text-orange-600 hover:underline"
                >
                  Sign in
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default SignUpPage;
