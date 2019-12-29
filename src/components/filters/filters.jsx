import React from "react";
import Filter from "../filter/filter";
const filters = ({
  filters,
  onSelectFilter,
  onClearAll,
  selectedFiltersLength
}) => {
  return (
    //Make filters collapsiable
    <div>
      <p className="font-weight-bold">Priority</p>
      <hr />
      <div className="list-group text-center">
        {filters.map(filter => (
          <Filter
            key={filter.id}
            filter={filter}
            onSelectFilter={onSelectFilter}
          />
        ))}
        <button
          className={
            "list-group-item list-group-item-action m-1 rounded border bg-success text-light " +
            (selectedFiltersLength ? "" : "d-none")
          }
          onClick={e => onClearAll(e)}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default filters;
