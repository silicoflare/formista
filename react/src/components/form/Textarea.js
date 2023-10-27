/** 
 * Form Component: Textarea
 * Props:
    • label: String
    • id: String
    • placeholder: String
    • required: Boolean
    • styles: Object
*/

function Textarea({ id, placeholder, required, styles, children, handleOut })   {
    const changeVal = (e) => {
        handleOut((oldVals) => ({
            ...oldVals,
            [id]: e.target.value,
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

            <textarea 
                className="form-textbox"
                rows="5"
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

export default Textarea;