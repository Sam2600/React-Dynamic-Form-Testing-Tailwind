import { useEffect, useState } from 'react'


export const useDebounce = (value, milliSeconds) => {

    const [deBounce, setDebounce] = useState(value);

    useEffect(() => {

        const timer = setTimeout(() => {

            setDebounce(value)

        }, milliSeconds);

        return () => clearTimeout(timer);

    }, [value, milliSeconds]);


    return deBounce;

}
