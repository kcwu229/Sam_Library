function LabelsTag({ forId, text, required }) {
  return (
    <label
      className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      htmlFor="title"
    >
      {text} <p className="text-red-500 pl-1">{required}</p>
    </label>
  );
}

export default LabelsTag;
