import React from "react";
const filter = ({ filter, onSelectFilter }) => {
  return (
    <button
      className={"list-group-item list-group-item-action m-1 rounded border"}
      onClick={e => onSelectFilter(filter, e)}
    >
      {filter.name}
    </button>
  );
};

export default filter;
