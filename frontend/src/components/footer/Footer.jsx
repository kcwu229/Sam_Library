import LogoImage from "../../assets/images/logo-inverted.png";
import FooterBarTag from "./FooterBarTag";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaRedditSquare } from "react-icons/fa";

function Footer() {
  return (
    <footer className="shadow bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between font-medium">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src={LogoImage} className="w-36 h-22" alt="Flowbite Logo" />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-sam-gray sm:mb-0">
            <FooterBarTag href="#news" text="About" />
            <FooterBarTag href="#policy" text="Private Policy" />
            <FooterBarTag href="#license" text="Licensing" />
            <FooterBarTag href="#contact" text="Contact" />
          </ul>
        </div>
        <div
          className="font-medium mt-4 sm:mt-0 text-sm text-sam-gray text-right flex flex-col sm:flex-row justify-between"
          id="contact"
        >
          <div className="text-left pl-6">
            <p>Tel: (123) 456-7890</p>
            <p>Email: contact@samlibrary.com</p>
            <p>Fax: (098) 765-4321</p>
          </div>
          <div className="my-4 sm:mt-0 text-sm text-sam-gray font-medium pr-6 flex justify-center sm:justify-end">
            <FaFacebookSquare className="inline-block w-6 h-6 mr-2 text-blue-600" />
            <FaSquareXTwitter className="inline-block w-6 h-6 mr-2 text-white" />
            <FaLinkedin className="inline-block w-6 h-6 mr-2 text-blue-700" />
            <FaRedditSquare className="inline-block w-6 h-6 text-orange-500" />
          </div>
        </div>
        <br />

        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-sam-gray sm:text-center">
          © 2024 Sam Library. All Rights Reserved.
          <a href="/" className="hover:underline">
            Sam Library™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
