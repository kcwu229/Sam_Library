import SignUpImage from "../assets/images/signUp.png";
import LogoImage from "../assets/images/logo.png";
import { useEffect, useState } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaRegCircleQuestion } from "react-icons/fa6";
import ErrorTag from "./form/ErrorTag";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
  });

  function validateForm() {
    let valid = true;

    const errorCopy = { ...errors };

    if (email === "") {
      errorCopy.email = "email is required !";
      valid = false;
    } else {
      errorCopy.email = "";
    }

    setErrors(errorCopy);
    return valid;
  }

  function submitLoginForm(e) {
    e.preventDefault();

    if (validateForm()) {
      console.log("Pass the validation");
    } else {
      console.log("Failed the validation");
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 h-4/5 flex mt-28">
      <div className="w-1/2 flex">
        <img className="w-full h-full" src={SignUpImage}></img>
      </div>
      <div className="w-1/2 flex items-center justify-center relative">
        <div>
          <FaRegCircleQuestion className="absolute top-0 right-20 w-6 h-6" />
          <div className="group">
            <button>
              <AiOutlineGlobal className="absolute top-0 right-10 w-6 h-6" />
            </button>
            <p className="absolute top-10 right-8 w-14 h-18 text-xs text-wrap invisible group-hover:visible text-center bg-slate-50">
              Click to change language
            </p>
          </div>
        </div>

        <form className="w-full max-w-sm relative mt-20">
          <img className="w-20 h-18 mb-10" src={LogoImage}></img>

          <h1 className="font-bold mb-4 mt-1 text-red-500 text-3xl">
            Welcome to Sam's library
          </h1>
          <p>Capture and share your happiness instantly</p>
          <br />

          <button
            className="bg-red-500 hover:bg-red-700 text-white 
              font-bold py-2 px-40 rounded focus:outline-none mt-4 mb-2
              focus:shadow-outline"
            type="button"
            onClick=""
          >
            Sign Up with Facebook
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white 
              font-bold py-2 px-40 rounded focus:outline-none mt-4 mb-2
              focus:shadow-outline"
            type="button"
            onClick=""
          >
            Sign Up with Google
          </button>
          <h2 className="text-center mt-4">OR</h2>
          <br />
          <hr />

          <br />
          <div className="mb-10 relative">
            <input
              className={`shadow appearance-none
              border rounded w-full py-2 px-3
               text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                 errors.email ? "border-red-500" : ""
               }`}
              id="email"
              type="email"
              placeholder="Enter your email to continue"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <ErrorTag error={errors.email} />}
          </div>

          <button
            className="bg-red-500 hover:bg-red-700 text-white 
              font-bold py-3 px-40 rounded focus:outline-none mt-4 mb-8
              focus:shadow-outline"
            type="submit"
            onClick={submitLoginForm}
          >
            Continue
          </button>
          <div className="text-center mt-2 mb-20">
            Don't have account ?
            <a href="/login" className="ml-6">
              <b>
                <i className="text-sm">Login</i>
              </b>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
