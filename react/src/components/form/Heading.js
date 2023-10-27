/** 
 * Form Component: Heading
 * Props:
    • label: String
    • styles: Object
*/

function Heading({ styles, children }) {
    return (
        <>
            <h1 className="text-3xl" style={ styles }>{ children }</h1>
            <br/>
        </>
    );
}

export default Heading;