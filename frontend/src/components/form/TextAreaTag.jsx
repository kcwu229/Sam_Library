const TextAreaTag = ({ id, name, value, onChange, text }) => {
  return (
    <textarea
      className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      id={id}
      name={name}
      value={value}
      placeholder={text}
      onChange={onChange}
    />
  );
};

export default TextAreaTag;
