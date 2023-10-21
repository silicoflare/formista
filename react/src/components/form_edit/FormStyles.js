/**
 * STYLE LIST:
 *  color
 *  backgroundColor
 *  fontFamily
 *  borderWidth
 *  borderRadius
 *  borderColor
 */

import { useState, useEffect } from "react";

export default function FormStyles({ element, data, setData, children })    {
    const [ styles, setStyles ] = useState({});
    const [ drop, setDrop ] = useState(['[Select a property]', 'color', 'backgroundColor', 'fontFamily', 'borderWidth', 'borderRadius', 'borderColor']);
    const [ selected, select ] = useState('[Select a property]');

    useEffect(() => {
        setStyles(() => data['styles'][element]);
    }, [data, element]);


    useEffect(() => {
        if (Object.keys(styles).length > 0) {
            setDrop((oldDrop) => oldDrop.filter((item) => !(item in styles)));
        }
    }, [styles]);
    

    function addStyle(style) {
        if (style !== '[Select a property]') {
            setStyles((old) => ({
                ...old,
                [style]: '' // You can set a default value here
            }));
            select(() => '[Select a property]');
        }
    }
    
    function removeStyle(style) {
        setStyles((old) => {
            const temp = {...old};
            delete temp[style];
            return temp;
        });
        setDrop((oldDrop) => [...oldDrop, style]);
    }

    return (
        <div className="bg-[--three] p-5 w-full space-y-4">
            <span className="text-white text-3xl">{`${children} Styles`}</span><br/>
            <select className="fonts p-2 bg-[--four] text-white text-lg font-mono w-4/5 focus:outline-none focus:ring-2 focus:ring-[--one]" onChange={(e) => select(() => e.target.value)}>
                { drop.map((x) => <option key={x} value={x} readOnly>{x}</option>) }
            </select>
            <button className="bg-[--one] p-2 text-white focus:outline-none focus:ring-2 mx-2 focus:ring-[--five]" onClick={() => addStyle(selected)}>
                + Add property
            </button><br/><br/>
            { Object.entries(styles).map(([key, value]) => 
                <span className="flex flex-row items-center justify-between my-2" key={key}>
                    <span className="text-white text-lg">{key}: </span>
                    <span className="w-10/12 text-right">
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={value} onChange={null}/>
                        <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => removeStyle(key)}>×</button>
                    </span>
                </span>
            ) }
        </div>
    )

}