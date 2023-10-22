import { useEffect, useState } from "react";
import FormStyles from "./FormStyles";

export default function StyleList({ data, setData, styleData, setStyleData }) {

    // useEffect(() => {
    //     setData((oldData) => ({
    //         ...oldData,
    //         'styles': styleData
    //     }))
    // }, [styleData]);

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
            {Object.entries(data.styles).map(([key, value]) => <FormStyles element={key} key={key} data={data} setData={setData} setStyleData={setStyleData}>{styleMaps[key]}</FormStyles>
            )}
        </div>
    )
}