/* eslint-disable no-unused-vars */
'use client';
import { Button, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { PaginatedItems } from './components/PaginatedItems';
import { Search } from './components/Search';
import { useDebounce } from './commonHooks/useDebounce';
import axios from 'axios';


const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
}

export const App = () => {

    // to store sutdents from back-end
    const [students, setStudents] = useState(null);

    // to make query string for url
    const [search, setSearch] = useState("");

    // pagination pages
    const [page, setPage] = useState(students?.current_page || 1);


    const [grade, setGrade] = useState(0);

    // search
    const handleInputChange = (e) => setSearch(e.target.value);

    // page change
    const handlePageChange = (e) => setPage(e.selected + 1);

    // dropdown change
    const handleDropDownChange = (e) => setGrade(e.target.value);

    // a little slowed search text for better performance
    let debounce = useDebounce(search, 200);

    const totalPage = students?.last_page;

    useEffect(() => {

        if (debounce && page) {

            axios.get(`http://127.0.0.1:8000/api/students?page=${page}&q=${debounce}&grade=${grade}`, config)
                .then(res => res?.data)
                .then(data => data?.data)
                .then(result => setStudents(result))
                .catch(err => console.log(err))

        } else if (debounce) {

            axios.get(`http://127.0.0.1:8000/api/students?q=${debounce}`, config)
                .then(res => res?.data)
                .then(data => data?.data)
                .then(result => setStudents(result))
                .catch(err => console.log(err))

        } else {

            axios.get(`http://127.0.0.1:8000/api/students?page=${page}`, config)
                .then(res => res?.data)
                .then(data => data?.data)
                .then(result => setStudents(result))
                .catch(err => console.log(err))
        }

    }, [debounce, page])

    const studentRows = students?.data.map(student =>

        <Table.Row key={student.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>{student.id}</Table.Cell>
            <Table.Cell>{student.name}</Table.Cell>
            <Table.Cell>{student.email}</Table.Cell>
            <Table.Cell style={{ display: "flex", gap: "10px" }}>
                <Button style={{ width: "65px" }}>Edit</Button>
                <Button style={{ width: "65px" }}>Delete</Button>
            </Table.Cell>
        </Table.Row>
    );

    return (
        <div className="overflow-x-auto">
            <Search handleDropDownChange={handleDropDownChange} handleInputChange={handleInputChange} />
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                    {/* <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell> */}
                </Table.Head>
                <Table.Body className="divide-y">
                    {studentRows}
                </Table.Body>
            </Table>
            <div className="flex overflow-x-auto sm:justify-center">
                <PaginatedItems totalPage={totalPage} handlePageChange={handlePageChange} />,
            </div>
        </div>
    );
}
