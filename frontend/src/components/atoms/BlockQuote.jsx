import { FaQuoteLeft } from "react-icons/fa";
import { useEffect, useState } from "react";

function BlockQuote({ text }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <figure
      className={`max-w-screen-md mx-auto text-center p-5 rounded-2xl py-10 ${
        visible ? "animate-fade" : ""
      }`}
    >
      <div className="flex justify-start">
        <FaQuoteLeft className="text-lime-700 w-12 h-10" />
      </div>
      <blockquote>
        <p className="mt-6 text-2xl italic font-medium text-lime-600 tracking-wide">
          <i>{text}</i>
        </p>
      </blockquote>
      <div className="flex justify-end mt-4">
        <FaQuoteLeft className="text-lime-700 w-12 h-10 rotate-180" />
      </div>
    </figure>
  );
}

export default BlockQuote;
