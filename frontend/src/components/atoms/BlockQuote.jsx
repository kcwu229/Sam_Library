import { FaQuoteRight } from "react-icons/fa";

function BlockQuote({ text, name }) {
  return (
    <figure
      class="max-w-screen-md mx-auto text-center 
    border-black border p-10 px-20 rounded-2xl md:rounded-none md:border-0"
    >
      <div className="flex justify-center">
        <FaQuoteRight className="text-gray-600 w-8 h-8" />
      </div>
      <blockquote>
        <p
          class="mt-10 text-2xl italic font-medium 
        text-pink-900 tracking-wide"
        >
          <i> {text}</i>
        </p>
      </blockquote>
      <figcaption
        class="flex items-center justify-center mt-6 
      space-x-3 rtl:space-x-reverse"
      >
        <div
          class="flex items-center divide-x-2 
        rtl:divide-x-reverse divide-gray-500"
        >
          <cite class="pe-3 font-medium text-gray-900">{name}</cite>
        </div>
      </figcaption>
    </figure>
  );
}

export default BlockQuote;
