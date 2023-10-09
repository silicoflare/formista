/** 
 * Form Component: Textbox
 * Props:
    • label: String
    • id: String
    • placeholder: String
    • required: Boolean
    • styles: Object
*/

function Textbox({ id, placeholder, required, styles, children })   {
    return (
        <>
            <label 
                className="text-3xl"
                htmlFor={ id } 
                style={ styles[0] }
            >
                { children }
            </label>

            <input 
                type="text" 
                className="p-2 w-full text-xl"
                required={ required } 
                placeholder={ placeholder } 
                id={ id } 
                name={ id } 
                style={ styles[1] }
            />
            <br/>
            <br/>
        </>
    );
}

export default Textbox;