import React from "react";
import Filter from "../filter/filter";
const filters = ({ filters, onSelectFilter }) => {
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
      </div>
    </div>
  );
};

export default filters;
