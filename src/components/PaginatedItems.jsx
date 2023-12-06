/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

// eslint-disable-next-line react/prop-types
export const PaginatedItems = ({ totalPage, handlePageChange }) => {

    return (
        <div>
            {/* <Items currentItems={currentItems} /> */}
            <ReactPaginate className="flex flex-row gap-4 p-3"
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageChange}
                pageRangeDisplayed={5}
                pageCount={totalPage}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </div>
    );
}