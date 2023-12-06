/* eslint-disable react/prop-types */

/**
 * Onchange event change the state cause re-render, so debounce value is always change and return the milli sec delayed string.
 * With that string, fetch the api for better performance.
 */

export const Search = ({ handleChange }) => {

    return (
        <div className="w-2/6 mx-auto mb-10 mt-5">
            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Search
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">

                {/** Select box here */}

                <input
                    onChange={handleChange}
                    type="text"
                    name="price"
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Sam..."
                />

            </div>
        </div>
    )
}


/*
    <div className="absolute inset-y-0 right-0 flex items-center">
        <label htmlFor="currency" className="sr-only">
            Currency
        </label>
            <select
                id="currency"
                name="currency"
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            >
                <option>USD</option>
                <option>CAD</option>
                <option>EUR</option>
            </select>
    </div>
*/