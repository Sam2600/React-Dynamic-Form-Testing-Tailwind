/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
import { Search } from '../components/Search';
import { Card } from '@material-tailwind/react';
import { axiosClient } from '../axios/axiosClient';
import { TableHead } from '../components/TableHead';
import { TableRecord } from '../components/TableRecord';
import { useDebounce } from '../commonHooks/useDebounce';
import { PaginatedItems } from '../components/PaginatedItems';

const TABLE_HEAD = ["ID", "NAME", "GRADE", "EMAIL", ""];

// Table header
const tableHeader = TABLE_HEAD.map(head => <TableHead key={head} head={head} />);


export const StudentList = () => {

    // to store sutdents from back-end
    const [students, setStudents] = useState(null);

    // query params states
    const [queryParam, setQueryParam] = useState({
        search: "",
        page: students?.current_page || 1,
        grade: 0
    });

    // error
    const [error, setError] = useState(null);

    // a little slowed search text for better performance
    const debounce = useDebounce(queryParam.search, 350);

    const totalPage = students?.last_page;

    useEffect(() => {

        axiosClient.get(`students?page=${queryParam.page}&q=${debounce}&grade=${queryParam.grade}`)
            .then(res => res?.data)
            .then(data => data?.data)

            .then(result => setStudents(result))

            .catch(error => setError(error));

    }, [debounce, queryParam.page])

    // Table body records
    let studentRecords;

    studentRecords = students?.data.map((student, index) => {

        const isLast = index === students?.data.length - 1;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

        return <TableRecord key={student.id} student={student} classes={classes} />

    });


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
            { /** toTestclass => overflow - scroll */}
            <Card className="h-full w-10/12 mx-auto">
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
            <div className="flex overflow-x-auto sm:justify-center">
                <PaginatedItems
                    totalPage={totalPage}
                    handlePageChange={
                        (e) => setQueryParam({ ...queryParam, page: e.selected + 1 })
                    }
                />
            </div>
        </>
    );
}