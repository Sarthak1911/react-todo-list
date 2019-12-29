import React from "react";
import PropTypes from "prop-types";

const pagination = ({ itemsCount, pageSize, currentPage, onPageSelect }) => {
  let numberOfPages = Math.ceil(itemsCount / pageSize);

  function getPages() {
    let pages = [];
    for (let i = 0; i < numberOfPages; i++) pages.push(i + 1);
    return pages;
  }

  function displayPages() {
    if (getPages().length <= 1) return null;
    return getPages().map(page => (
      <li
        className={"page-item " + (currentPage === page ? "active" : null)}
        key={page}
      >
        <button className="page-link" onClick={() => onPageSelect(page)}>
          {page}
        </button>
      </li>
    ));
  }

  return (
    <ul className="pagination justify-content-center fixed-bottom">
      {displayPages()}
    </ul>
  );
};

pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageSelect: PropTypes.func.isRequired
};

export default pagination;
