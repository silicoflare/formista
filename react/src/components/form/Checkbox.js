import { useState, useEffect } from "react";

export default function Checkbox({ id, required, options, icon, colors, styles, children, handleOut }) {
    const [selected, select] = useState(() => {
        const init = {};
        options.forEach((ele) => {
            init[ele.value] = false;
        });
        return init;
    });

    useEffect(() => {
        // Log the updated state
        // console.log(selected);

        // Update the parent component state using the selected value
        handleOut((oldVals) => ({
            ...oldVals,
            [id]: selected,
        }));
    }, [selected, handleOut, id]);

    function checkDaBox(value) {
        // Update the state
        select((oldSelect) => ({
            ...oldSelect,
            [value]: !oldSelect[value],
        }));
    }



    return (
        <div key={id}>
            <label
                className="form-label"
                htmlFor={id}
                style={styles}>
                {children}
            </label><br />

            {options.map((x) => (
                <span key={x.value} onClick={() => checkDaBox(x.value)} className="text-2xl my-5">
                    {selected[x.value] === true ?
                        <i className={`nf ${icon.yes}`} style={{ "color": colors.yes }}></i> :
                        <i className={`nf ${icon.no}`} style={{ "color": colors.no }}></i>
                    }&nbsp; {x.name}<br />
                </span>
            ))}
            <br />
        </div>
    );
}
