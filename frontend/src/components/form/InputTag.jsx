const InputTag = ({ id, name, value, onChange, text, error, type }) => {
  return (
    <input
      className={`relative shadow appearance-none border 
              rounded w-full py-2 px-3  bg-gray-100 text-gray-700 
              leading-tight focus:outline-none focus:shadow-outline ${
                error ? "border-red-500" : ""
              }`}
      id={id}
      name={name}
      type={type ? type : "text"}
      value={value}
      onChange={onChange}
      placeholder={text}
      maxLength={20}
    />
  );
};

export default InputTag;
