import { LiaExclamationCircleSolid } from "react-icons/lia";

function ConfirmDialog({ onConfirm, onCancel }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
      onClick={handleOverlayClick}
    >
      <div class="border rounded-lg shadow relative max-w-sm bg-white">
        <div class="flex justify-end p-2">
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          ></button>
        </div>

        <div class="p-6 pt-0 text-center flex flex-col justify-center items-center">
          <LiaExclamationCircleSolid class="w-16 h-16 text-red-500" />

          <h3 class="text-lg font-normal text-gray-500 mt-5 mb-6">
            Are you sure you want to delete this book?
          </h3>

          <div className="flex flex-row gap-6">
            <button
              href="#"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
              onClick={onConfirm}
            >
              Yes, I'm sure
            </button>
            <button
              href="#"
              class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
              onClick={onCancel}
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
