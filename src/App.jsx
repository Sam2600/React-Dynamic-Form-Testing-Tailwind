/* eslint-disable no-unused-vars */
'use client';
import axios from 'axios';
import { Button, Table, Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { PaginatedItems } from './components/PaginatedItems';
import { Search } from './components/Search';

const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
}

export const App = () => {

    const [students, setStudents] = useState(null);

    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/students", config)
            .then(res => res?.data)
            .then(data => data?.data)
            .then(result => setStudents(result))
            .catch(err => setError(err))
    }, []);

    const studentRows = students?.data.map(student =>

        <Table.Row key={student.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>{student.id}</Table.Cell>
            <Table.Cell>{student.name}</Table.Cell>
            <Table.Cell>{student.email}</Table.Cell>
            <Table.Cell>
                <Button>Edit</Button>
            </Table.Cell>
        </Table.Row>
    );

    return (
        <div className="overflow-x-auto">
            <Search />
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
            <PaginatedItems itemsPerPage={4} />,
            </div>
        </div>
    );
}
