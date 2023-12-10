/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
import { Card } from '@material-tailwind/react';
import { Search } from "../../components/Search";
import { TableHead } from '../../components/TableHead';
import { axiosClient } from "../../axios/axiosClient"
import { TableRecord } from '../../components/TableRecord';
import { useDebounce } from '../../commonHooks/useDebounce';
import { PaginatedItems } from '../../components/PaginatedItems';
import { useQuery } from '@tanstack/react-query';

const TABLE_HEAD = ["ID", "NAME", "GRADE", "EMAIL", ""];

// Table header
const tableHeader = TABLE_HEAD.map(head => <TableHead key={head} head={head} />);


export const TestingQuery = () => {

    // query params states
    const [queryParam, setQueryParam] = useState({
        search: "",
        page: 1,
        grade: 0
    });


    // a little slowed search text for better performance
    const debounce = useDebounce(queryParam.search, 350);


    // fetching students with react query
    const { data: students, error, isLoading, isError } = useQuery({

        queryKey: ['students', queryParam.page, debounce, queryParam.grade],

        queryFn: async () => {
            const response = await axiosClient.get(`students?page=${queryParam.page}&q=${debounce}&grade=${queryParam.grade}`);
            return response.data?.data;
        },

        staleTime: 10000    

    });


    if (isError) return <h1 className='text-xl text-center mt-40 text-red-500'>{error.message}</h1>


    if (isLoading) return <h1 className='text-xl text-center mt-40 text-indigo-500'>Loading...</h1>


    // Table body records
    const studentRecords = students?.data.map((student, index) => {

        const isLast = index === students?.data.length - 1;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

        return <TableRecord key={student.id} student={student} classes={classes} />

    });


    const totalPage = students?.last_page;

    return (
        <>
            <Search
                handleDropDownChange={
                    (e) => setQueryParam({ ...queryParam, grade: e.target.value })
                }
                handleInputChange={
                    (e) => setQueryParam({ ...queryParam, search: e.target.value })
                }
            />

            {/** Data Table */}
            <Card className="h-full w-10/12 mx-auto">
                { /** toTestclass => overflow - scroll */}
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr className='rounded-md'>
                            {tableHeader}
                        </tr>
                    </thead>
                    <tbody>
                        {studentRecords}
                    </tbody>
                </table>
            </Card>
            {/** Data Table */}

            {/** Pagination */}
            <div className="flex overflow-x-auto sm:justify-center">
                <PaginatedItems
                    totalPage={totalPage}
                    handlePageChange={
                        (e) => setQueryParam({ ...queryParam, page: e.selected + 1 })
                    }
                />
            </div>
            {/** Pagination */}

        </>
    );
}
