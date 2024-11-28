import React, { useState, useRef, useEffect } from "react";
import { TiCloudStorage } from "react-icons/ti";

const noop = () => {};

const FileInput = ({ value, onChange = noop, error, ...rest }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setFiles(value);
  }, [value]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
    onChange(droppedFiles);
  };

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    onChange(selectedFiles);
  };

  return (
    <div
      className={`border-2 border-dashed 
      rounded-lg p-6 text-center 
      ${error ? "border-red-600 bg-red-40" : ""}
      transition-colors duration-300 ${
        isDragging ? "border-blue-400 bg-blue-50" : "border-orange-400"
      } `}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {Boolean(files.length) && (
        <div className="mb-4 flex flex-col items-center">
          <TiCloudStorage className="text-orange-400 w-16 h-16" />
          <p className="font-semibold">Selected files:</p>
          <p className="text-gray-500">{files.map((f) => f.name).join(", ")}</p>
        </div>
      )}
      <label className="cursor-pointer flex flex-col gap-4">
        <p className="underline text-blue-600">Click to select images</p>
        <span>Or</span>
        <p>Drag and drop here...</p>
        <input
          {...rest}
          ref={inputRef}
          className="hidden"
          type="file"
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default FileInput;
