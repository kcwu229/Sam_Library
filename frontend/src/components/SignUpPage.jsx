import SignUpImage from "../assets/images/signUp.png";
import LogoImage from "../assets/images/logo.png";
import { useState } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaRegCircleQuestion } from "react-icons/fa6";
import InputTag from "./form/InputTag";
import LabelsTag from "./form/LabelsTag";
import CreateFormErrorTag from "./form/CreateFormErrorTag";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
  });

  function validateForm() {
    let valid = true;

    const errorCopy = { ...errors };

    if (email === "") {
      errorCopy.email = "Email is required!";
      valid = false;
    } else {
      errorCopy.email = "";
    }

    setErrors(errorCopy);
    return valid;
  }

  function submitSignUpForm(e) {
    e.preventDefault();

    if (validateForm()) {
      console.log("Pass the validation");
    } else {
      console.log("Failed the validation");
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-5/5 lg:w-4/5 xl:w-3/5 h-auto flex flex-col md:flex-row mt-28 mx-auto">
      <div className="w-full md:w-1/2 flex">
        <img
          className="w-full h-full object-cover"
          src={SignUpImage}
          alt="Sign Up"
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
          <form className="w-full relative mt-10" onSubmit={submitSignUpForm}>
            <img
              className="w-20 h-18 mb-10 mx-auto"
              src={LogoImage}
              alt="Logo"
            />
            <h1 className="font-bold mb-4 mt-1 text-red-500 text-3xl text-center">
              Welcome to Sam's Library
            </h1>
            <p className="text-center">
              Capture and share your happiness instantly
            </p>
            <br />

            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-40 rounded focus:outline-none mt-4 mb-2 focus:shadow-outline w-full"
              type="button"
            >
              Sign Up with Facebook
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-40 rounded focus:outline-none mt-4 mb-2 focus:shadow-outline w-full"
              type="button"
            >
              Sign Up with Google
            </button>
            <h2 className="text-center mt-4">OR</h2>
            <br />
            <hr />
            <br />
            <div className="mb-10 relative">
              <LabelsTag for="email" text="Email" />
              <InputTag
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                text="Enter your email to continue"
                error={errors.email}
              />
              {errors.email && <CreateFormErrorTag error={errors.email} />}
            </div>

            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-40 rounded focus:outline-none mt-4 mb-8 focus:shadow-outline w-full"
              type="submit"
            >
              Continue
            </button>
            <div className="text-center mt-2 mb-20">
              Already have an account?
              <a href="/login" className="ml-2 text-red-500 hover:underline">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
