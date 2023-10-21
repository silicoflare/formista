import FormStyles from "./FormStyles";

export default function StyleList({ data, setData }) {
    const styleMaps = {
        "header": "Header",
        "body": "Body",
        "heading": "Heading",
        "label": "Label",
        "textbox": "Textbox",
        "button": "Button"
    }


    return (
        <div className="w-3/4 space-y-4">
            {Object.entries(data.styles).map(([key, value]) => <FormStyles element={key} key={key} data={data} setData={setData}>{styleMaps[key]}</FormStyles>
            )}
        </div>
    )
}