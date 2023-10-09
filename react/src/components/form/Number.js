/** 
 * Form Component: Textbox
 * Props:
    • label: String
    • id: String
    • placeholder: String
    • required: Boolean
    • styles: Object
*/

function Number({ id, placeholder, required, range, styles, children })   {
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
                type="number" 
                min={ range.min }
                max={ range.max }
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

export default Number;