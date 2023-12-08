/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

// eslint-disable-next-line react/prop-types
export const PaginatedItems = ({ totalPage, handlePageChange }) => {

    return (
        <div className="mt-5">
            <ReactPaginate
                className="flex flex-row gap-4 p-3"
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageChange}
                pageRangeDisplayed={5}
                pageCount={totalPage}
                previousLabel="Previous"
                renderOnZeroPageCount={null}
                containerClassName="isolate inline-flex -space-x-px rounded-md shadow-sm"
                pageLinkClassName="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                previousLinkClassName="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                nextLinkClassName="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                activeClassName=""
            />
            {/** To test active class name */}
        </div>

    );
}