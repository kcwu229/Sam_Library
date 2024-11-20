import React, { useState, useRef } from "react";

const noop = () => {};

const FileInput = ({ value, onChange = noop, ...rest }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState(value);
  const inputRef = useRef(null);

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
      transition-colors duration-300 ${
        isDragging ? "border-blue-400 bg-blue-50" : "border-gray-300"
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {Boolean(files.length) && (
        <div className="mb-4 text-gray-700">
          Selected files: {files.map((f) => f.name).join(", ")}
        </div>
      )}
      <label className="cursor-pointer">
        <p className="underline">Click to select some files</p>
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
