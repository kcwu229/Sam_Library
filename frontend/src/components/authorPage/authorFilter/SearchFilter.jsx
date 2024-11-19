function SearchFilter({
  id,
  filterObjName,
  filterObjs,
  onClickFunction,
  condition,
}) {
  return (
    <div id={id}>
      <h2 className="font-semibold mb-3">{filterObjName}</h2>
      {filterObjs.map((filterObj, index) => {
        if (!condition && index >= 3) return null;
        return (
          <div key={filterObj.id}>
            <input id={filterObj.id} type="checkbox" className="mb-2 mx-2" />
            <label for={filterObj.id}>{filterObj.label}</label>
          </div>
        );
      })}
      <a href="#" className="mb-2 mx-2 font-medium" onClick={onClickFunction}>
        {condition ? "Close" : "See More"}
      </a>
    </div>
  );
}

export default SearchFilter;
