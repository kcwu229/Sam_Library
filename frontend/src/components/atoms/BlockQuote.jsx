import { FaQuoteLeft } from "react-icons/fa";

function BlockQuote({ text }) {
  return (
    <figure
      class="max-w-screen-md mx-auto text-center 
    p-5 rounded-2xl py-10 "
    >
      <div className="flex left-0">
        <FaQuoteLeft className="text-lime-600 w-12 h-10" />
      </div>
      <blockquote>
        <p class="mt-6 text-2xl italic font-medium text-lime-600 tracking-wide">
          <i> {text}</i>
        </p>
      </blockquote>
    </figure>
  );
}

export default BlockQuote;
