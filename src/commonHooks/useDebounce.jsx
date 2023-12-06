import { useEffect, useState } from 'react'


export const useDebounce = ({ value, milliSeconds }) => {

    const [deBounce, setDebounce] = useState(value);

    useEffect(() => {

        setTimeout(() => {

            setDebounce(value)

        }, milliSeconds);

        return () => clearTimeout(milliSeconds);

    }, [value, milliSeconds]);


    return deBounce;

}
