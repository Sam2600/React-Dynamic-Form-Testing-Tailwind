/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Typography } from '@mui/material'
import React from 'react'

export const TableHead = ({ head }) => {
    return (
        <th className="border-blue-gray-100 bg-blue-gray-50 p-4">
            <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
            >
                {head}
            </Typography>
        </th>
    )
}
