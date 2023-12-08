/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Typography } from '@material-tailwind/react';

export const TableRecord = ({ student, classes }) => {

    return (
        <tr key={student.id}>
            <td className={`${classes} bg-blue-gray-50/50`}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {student.id}
                </Typography>
            </td>
            <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {student.name}
                </Typography>
            </td>
            <td className={`${classes} bg-blue-gray-50/50`}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {student.grade}
                </Typography>
            </td>
            <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {student.email}
                </Typography>
            </td>
            <td className={`${classes} bg-blue-gray-50/50`}>
                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                    Edit
                </Typography>
            </td>
        </tr>
    );
}