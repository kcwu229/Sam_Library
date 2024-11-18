import { AiOutlineExclamationCircle } from "react-icons/ai";

function ErrorTag({ error }) {
  return (
    <div>
      <div className="mb-8 absolute right-6 inset-y-1 pt-1">
        <AiOutlineExclamationCircle className="text-red-500 w-6 h-6" />
      </div>
      <i className="text-red-500 text-sm">{error}</i>
    </div>
  );
}

export default ErrorTag;
