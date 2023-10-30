/** 
 * Form Component: Textbox
 * Props:
    • label: String
    • id: String
    • placeholder: String
    • required: Boolean
    • styles: Object
*/

function Number({ id, placeholder, required, range, styles, children, handleOut })   {
    const changeVal = (e) => {
        handleOut((oldVals) => ({
            ...oldVals,
            [id]: parseInt(e.target.value),
        }));
    };

    return (
        <>
            <label 
                className="form-label"
                htmlFor={ id } 
                style={ styles[0] }
            >
                { children }
            </label>

            <input 
                type="number" 
                min={ range.min }
                max={ range.max }
                className="form-textbox"
                required={ required } 
                placeholder={ placeholder } 
                id={ id } 
                name={ id } 
                style={ styles[1] }
                onChange={changeVal}
            />
            <br/>
            <br/>
        </>
    );
}

export default Number;