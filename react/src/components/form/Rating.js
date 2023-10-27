/**
 * Form Component: Rating
 * Props:
    • id: String
    • label: String
    • required: Bolean
    • count: Integer
    • icon: String
    • colors: Object{no,yes}
    • styles: Object
 */

import { useState, useEffect } from "react";

export default function Rating({ id, required, count, icon, colors, styles, children, fOut, handleOut })     {
    const [ value, setValue ] = useState(0);
    const [ high, setHigh ] = useState(0);

    useEffect(() => {
        handleOut((oldVals) => ({
            ...oldVals,
            [id]: value,
        }));
    }, [value]);

    const countArray = [];
    // console.log(count);
    for(let i = 1; i <= count; i++)
        countArray.push(i);
    // console.log(countArray);

    return (
        <div key={id} onMouseLeave={() => setHigh(value)}>
            <label 
            className="form-label"
            htmlFor={ id } 
            style={ styles }>
                { children }
            </label><br/>

            {countArray.map((x) => (
                <span key={x} onClick={() => setValue(x)} onMouseEnter={() =>{ if(x !== high) setHigh(x)}} className={`nf ${icon} text-2xl my-5`} style={{ "color": x <= high ? colors.yes : colors.no }}>&nbsp;</span>
            ))}
            <br/>
        </div>
    );
}