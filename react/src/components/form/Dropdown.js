/**
 * Form Component: Dropdown
 * Props:
    • id: String
    • label: String
    • required: Boolean
    • options: Array<Object{name, value}>
    • styles: Object
*/

function Dropdown({ id, label, required, options, styles, children, handleOut }) {
    const changeVal = (e) => {
        handleOut((oldVals) => ({
            ...oldVals,
            [id]: e.target.value,
        }));
    };

    return (
        <>
            <label
                className="text-3xl"
                htmlFor={id}
                style={styles[0]}
            >
                {children}
            </label>
            <br />
            <select
                id={id}
                className="p-2 w-full text-xl"
                name={id}
                required={required}
                style={styles[1]}
                onChange={changeVal}
            >
                {options.map((x) => (
                    <option
                        key={x.value}
                        value={x.value}
                        className="p-2 w-full text-xl"
                        style={styles[2]}
                    >
                        {x.name}
                    </option>
                ))}
            </select>
            <br />
            <br />
        </>
    );
}

export default Dropdown;
