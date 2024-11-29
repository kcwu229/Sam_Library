const InputTag = ({
  id,
  name,
  value,
  onChange,
  text,
  error,
  type,
  readOnly,
}) => {
  return (
    <input
      className={`relative shadow appearance-none border 
              rounded w-full py-2 px-3   text-gray-700 
              leading-tight focus:outline-none focus:shadow-outline ${
                error ? "border-red-500" : ""
              } ${readOnly ? "cursor-default bg-gray-200" : "bg-gray-100"}`}
      id={id}
      name={name}
      type={type ? type : "text"}
      value={value}
      onChange={onChange}
      placeholder={text}
      maxLength={50}
      readOnly={readOnly}
    />
  );
};

export default InputTag;
