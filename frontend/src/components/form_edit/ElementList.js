import { useEffect, useState } from 'react';
import FormElement from './FormElement';

export default function Element({ data, setData, elementList, setElementList }) {
    const [ selected, select ] = useState('');
    useEffect(() => {
        setElementList(() => data.metadata);
    }, [data]);

    const formMeta = {
        "[Select a value]": {},
        "heading": {
            "type": "heading",
            "label": "",
            "id": ""
        },
        "textbox": {
            "type": "textbox",
            "id": "",
            "label": "",
            "placeholder": "",
            "required": false
        },
        "number": {
            "type": "number",
            "id": "",
            "label": "",
            "placeholder": "",
            "required": false,
            "range": {
                "min": 0,
                "max": 0
            }
        },
        "dropdown": {
            "type": "dropdown",
            "id": "",
            "label": "",
            "required": false,
            "options": [
                {
                    "name": "",
                    "value": ""
                }
            ]
        },
        "textarea": {
            "type": "textarea",
            "id": "",
            "label": "",
            "placeholder": "",
            "required": false
        },
        "radio": {
            "type": "radio",
            "id": "",
            "label": "",
            "required": false,
            "options": [
                {
                    "name": "",
                    "value": ""
                }
            ],
            "icon": {
                "no": "",
                "yes": ""
            },
            "colors": {
                "no": "",
                "yes": ""
            }
        },
        "checkbox": {
            "type": "checkbox",
            "id": "",
            "label": "",
            "required": false,
            "options": [
                {
                    "name": "",
                    "value": ""
                },
                {
                    "name": "",
                    "value": ""
                }
            ],
            "icon": {
                "no": "",
                "yes": ""
            },
            "colors": {
                "no": "",
                "yes": ""
            }
        },
        "rating": {
            "type": "rating",
            "id": "",
            "label": "",
            "count": 0,
            "icon": "",
            "colors": {
                "no": "",
                "yes": ""
            }
        }
    }

    function selectElement(type)    {
        select(() => {
            // console.log(type);
            return type;
        });
    }

    function addElement(type)   {
        if(type !== '[Select a value]') {
            setElementList((oldList) => {
                const temp = [...oldList];
                temp.push(formMeta[type]);
                // console.log(temp);
                return temp;
            });
        }
        document.getElementById('selector').value = '[Select a value]';
    }

    return (
        <>
            <br /><br />
            <div className='w-3/4 flex-col justify-center flex items-center'>
                <span className="text-[--three] text-5xl font-bold">Form Elements</span><br /><br />
                <span className='flex flex-row w-4/5 justify-center align-middle'>
                    <select className="fonts p-2 bg-[--four] text-white text-lg font-mono w-4/5 focus:outline-none focus:ring-2 focus:ring-[--one]" id='selector' onChange={(e) => selectElement(e.target.value)}>
                        { Object.keys(formMeta).map((x) => <option key={x} value={x}>{x}</option>) }
                    </select>
                    <button className="bg-[--one] p-2 text-white focus:outline-none focus:ring-2 mx-2 focus:ring-[--five]" onClick={() => addElement(selected)}>
                        + Add element
                    </button><br /><br />
                </span>
                {elementList.map((ele, i) => <FormElement data={ele} elementList={elementList} type={ele?.type} key={i} index={i} setElementList={setElementList} length={elementList.length}/>)}
            </div>
        </>
    );
}