/* eslint-disable react/prop-types */

/**
 * Onchange event change the state cause re-render, so debounce value is always change and return the milli sec delayed string.
 * With that string, fetch the api for better performance.
 */

const grades = [
    {
        name: "A",
        id: 1
    },
    {
        name: "B",
        id: 2
    },
    {
        name: "C",
        id: 3
    },
    {
        name: "D",
        id: 4
    },
    {
        name: "E",
        id: 5
    },
    {
        name: "F",
        id: 6
    },
]

const gradeOptions = grades.map(grade => <option key={grade.id} value={grade.id}>{grade.name}</option>);

export const Search = ({ handleInputChange, handleDropDownChange }) => {

    return (
        <div className="w-3/12 mx-auto mb-7 mt-7">

            <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <select
                        onChange={handleDropDownChange}
                        id="grade"
                        name="grade"
                        className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    >
                        <option value={0}>Grades</option>
                        {
                            gradeOptions
                        }
                    </select>
                </div>
                <input
                    onChange={handleInputChange}
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Search Students . . ."
                />
            </div>
        </div >
    )
}
