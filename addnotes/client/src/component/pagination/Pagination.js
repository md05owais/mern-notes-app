import React from "react";
import { useGlobalContext } from "../Context";
import "./Pagination.css";
const Pagination = () => {
  const { page, nbPages, getPrevPage, getNextPage } = useGlobalContext();
  return (
    <div className="pagination">
      <div className="page" onClick={() => getPrevPage()}>
        PREV
      </div>
      <div className="page pageNumber">
        {page} of {nbPages}
      </div>
      <div className="page" onClick={() => getNextPage()}>
        NEXT
      </div>
    </div>
  );
};

export default Pagination;
