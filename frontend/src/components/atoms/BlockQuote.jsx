import { FaQuoteLeft } from "react-icons/fa";

function BlockQuote({ text }) {
  return (
    <figure
      class="max-w-screen-md mx-auto text-center 
    border-lime-600 border p-5 rounded-2xl py-10 md:rounded-none md:border-0"
    >
      <div className="flex left-0">
        <FaQuoteLeft className="text-lime-600 w-12 h-10" />
      </div>
      <blockquote>
        <p class="mt-4 text-2xl italic font-medium text-lime-600 tracking-wide">
          <i> {text}</i>
        </p>
      </blockquote>
    </figure>
  );
}

export default BlockQuote;
