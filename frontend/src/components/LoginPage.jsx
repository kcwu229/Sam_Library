import LoginImage from "../assets/images/login.png";
import LogoImage from "../assets/images/logo.png";
import { useState } from "react";
import { login } from "../services/AuthService";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaRegCircleQuestion } from "react-icons/fa6";
import ErrorTag from "./form/ErrorTag";
import InputTag from "./form/InputTag";
import LabelsTag from "./form/LabelsTag";
import CreateFormErrorTag from "./form/CreateFormErrorTag";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  function validateForm() {
    let valid = true;

    const errorCopy = { ...errors };

    if (username === "") {
      errorCopy.username = "Username is required !";
      valid = false;
    } else {
      errorCopy.username = "";
    }

    if (password === "") {
      errorCopy.password = "Password is required !";
      valid = false;
    } else {
      errorCopy.password = "";
    }

    setErrors(errorCopy);
    return valid;
  }

  async function submitLoginForm(e) {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await login({ username, password });
        if (response.data === "Login successful") {
          alert("Login successful");
        } else {
          alert("Login failed");
        }
      } catch (error) {
        console.error("There was an error logging in!", error);
      }
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-4/5 lg:w-3/5 xl:w-4/5 h-auto flex flex-col md:flex-row mt-28 mx-auto">
      <div className="w-full md:w-1/2 flex">
        <img
          className="w-full h-full object-cover"
          src={LoginImage}
          alt="Login"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center relative p-4">
        <div className="w-full max-w-sm">
          <div className="absolute top-0 right-20">
            <FaRegCircleQuestion className="w-6 h-6" />
          </div>
          <div className="group absolute top-0 right-10">
            <button>
              <AiOutlineGlobal className="w-6 h-6" />
            </button>
            <p className="absolute top-10 right-0 w-24 text-xs text-wrap invisible group-hover:visible text-center bg-slate-50">
              Click to change language
            </p>
          </div>
          <form className="w-full relative mt-10" onSubmit={submitLoginForm}>
            <img
              className="w-20 h-18 mb-10 mx-auto"
              src={LogoImage}
              alt="Logo"
            />
            <h1 className="font-bold mb-4 mt-1 text-blue-500 text-4xl text-center">
              Welcome Back
            </h1>
            <p className="text-center">Log in to your account</p>
            <br />
            <div className="mb-4 relative">
              <LabelsTag for="username" text="Username" />
              <InputTag
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                text="Username"
                error={errors.username}
              />
              {errors.username && (
                <CreateFormErrorTag error={errors.username} />
              )}
            </div>

            <div className="mb-10 relative">
              <LabelsTag for="password" text="Password" />
              <InputTag
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                text="Enter your password"
                error={errors.password}
              />
              {errors.password && (
                <CreateFormErrorTag error={errors.password} />
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <input type="checkbox" className="w-4 h-4" />
                <label className="inline-flex items-center ml-3">
                  Remember me
                </label>
              </div>
              <a href="/forget-password" className="text-sm">
                Forget Password?
              </a>
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-40 rounded focus:outline-none mt-4 mb-8 focus:shadow-outline w-full"
              type="submit"
            >
              Login
            </button>
            <div className="text-center mt-2 mb-20">
              Don't have an account?
              <a href="/sign-up" className="ml-2 text-blue-500 hover:underline">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
