/**
 * Form Component: Radio
 * Props:
    • id: String
    • label: String
    • required: Bolean
    • options: Array<Object{name,value}>
    • icons: Object{no,yes}
    • colors: Object{no,yes}
    • styles: Object
 */

import { useState, useEffect } from "react";

function Radio({ id, required, options, icon, colors, styles, children, handleOut })    {
    const [ selected, select ] = useState("");
    
    useEffect(() => {
        // Update the parent component state using the selected value
        handleOut((oldVals) => ({
            ...oldVals,
            [id]: selected,
        }));
    }, [selected]);

    // function changeVal(val) {
    //     handleOut(function (oldVals) {
    //         select(val);
    //         return {
    //             ...oldVals,
    //             [id]: val
    //         }
    //     });
    // }

    function selectVal(value) {
        // Update the state
        select((oldSelect) => value);
    }
    
    return (
        <div key={id}>
            <label 
            className="form-label"
            htmlFor={ id } 
            style={ styles }>
                { children }
            </label><br/>

            { options.map((x) => (
                <span key={x.value} onClick={() => selectVal(x.value)} className="text-2xl my-5">
                    { selected === x.value ? 
                        <i className={`nf ${icon.yes}`} style={{ "color": colors.yes }}></i> : 
                        <i className={`nf ${icon.no}`} style={{ "color": colors.no }}></i> 
                    }&nbsp; {x.name} <br/>
                </span>
            ))}
            <br/>
        </div>
    );
}

export default Radio;