function LabelsTag({ forId, text }) {
  return (
    <label
      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      htmlFor="title"
    >
      {text}
    </label>
  );
}

export default LabelsTag;
