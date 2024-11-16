import LogoImage from "../../assets/images/logo-inverted.png";
import FooterBarTag from "./FooterBarTag";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaRedditSquare } from "react-icons/fa";

function Footer() {
  return (
    <footer class="bg-white shadow dark:bg-gray-900 w-full">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src={LogoImage} class="w-36 h-22" alt="Flowbite Logo" />
          </a>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <FooterBarTag href="#news" text="About" />
            <FooterBarTag href="#policy" text="Private Policy" />
            <FooterBarTag href="#license" text="Licensing" />
            <FooterBarTag href="/" text="Contact" />
          </ul>
        </div>
        <div class="mt-4 sm:mt-0 text-sm text-gray-500 text-right" id="contact">
          <p>Tel: (123) 456-7890</p>
          <p>Email: contact@samlibrary.com</p>
          <p>Fax: (098) 765-4321</p>
        </div>
        <br />
        <div class="my-4 sm:mt-0 text-sm text-gray-500 text-right">
          <FaFacebookSquare class="inline-block w-6 h-6 mr-2 text-blue-600" />
          <FaSquareXTwitter class="inline-block w-6 h-6 mr-2 text-white" />
          <FaLinkedin class="inline-block w-6 h-6 mr-2 text-blue-700" />
          <FaRedditSquare class="inline-block w-6 h-6 text-orange-500" />
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center">
          © 2024 Sam Library. All Rights Reserved.
          <a href="/" class="hover:underline">
            Sam Library™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;