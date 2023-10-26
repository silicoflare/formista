import { useEffect, useState } from "react";

export default function FormElement({ data, type, index, setElementList }) {
    const [eleData, setEleData] = useState({});
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setEleData(() => data);
    }, [data]);

    useEffect(() => {
        if (type === 'dropdown' || type === 'radio' || type === 'checkbox') {
            setOptions(() => data?.options);
            // console.log(data?.options);
        }
    }, [data]);

    function addOption() {
        setOptions((oldOpt) => [
            ...oldOpt,
            {
                "name": '',
                "value": ''
            }
        ]);
    }

    function deleteOption(index) {
        setOptions((oldOpt) => {
            const temp = [...oldOpt];
            temp.splice(index, 1);
            return temp;
        })
    }

    function changeValue(prop, val, opt, index) {
        setEleData((oldData) => {
            let temp;
            if (opt === undefined) {
                temp = {
                    ...oldData,
                    [prop]: val
                };
            }
            else if (index === undefined) {
                let blah = oldData[prop];
                temp = {
                    ...oldData,
                    [prop]: {
                        ...blah,
                        [opt]: val
                    }
                };
            }
            else {
                temp = {
                    ...oldData
                };
                temp[prop][index][opt] = val;
            }
            return temp;
        })
    }

    function deleteElement(index)   {
        setElementList((oldData) => {
            const temp = [...oldData];
            temp.splice(index, 1);
            return temp;
        })
    }

    switch (type) {
        case 'heading':
            return (
                <div className="bg-[--three] p-5 w-3/4 space-y-4 my-5" key={index}>
                    <span className="flex flex-row items-center justify-between">
                        <span className="text-white text-3xl">Heading</span><br />
                        <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteElement(index)}>×</button>
                    </span>

                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">ID: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.id || ''} onChange={(e) => changeValue('id', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Label: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.label || ''} onChange={(e) => changeValue('label', e.target.value)} />
                    </span>
                </div>
            );

        case 'textbox':
            return (
                <div className="bg-[--three] p-5 w-3/4 space-y-4 my-5" key={index}>
                    <span className="flex flex-row items-center justify-between">
                        <span className="text-white text-3xl">Textbox</span><br />
                        <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteElement(index)}>×</button>
                    </span>

                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">ID: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.id || ''} onChange={(e) => changeValue('id', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Label: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.label || ''} onChange={(e) => changeValue('label', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Placeholder: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.placeholder || ''} onChange={(e) => changeValue('placeholder', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Required: </span>
                        <select className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.required || false} onChange={(e) => changeValue('required', e.target.value)}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </span>
                </div>
            );

        case 'number':
            return (
                <div className="bg-[--three] p-5 w-3/4 space-y-4 my-5" key={index}>
                    <span className="flex flex-row items-center justify-between">
                        <span className="text-white text-3xl">Number</span><br />
                        <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteElement(index)}>×</button>
                    </span>

                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">ID: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.id || ''} onChange={(e) => changeValue('id', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Label: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.label || ''} onChange={(e) => changeValue('label', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Placeholder: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.placeholder || ''} onChange={(e) => changeValue('placeholder', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Range min: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData?.range?.min || 0} onChange={(e) => changeValue('range', e.target.value, 'min')} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Range max: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData?.range?.max || 0} onChange={(e) => changeValue('range', e.target.value, 'max')} />
                    </span>

                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Required: </span>
                        <select className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.required || false} onChange={(e) => changeValue('required', e.target.value)}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </span>
                </div>
            );

        case 'dropdown':
            return (
                <div className="bg-[--three] p-5 w-3/4 space-y-4 my-5" key={index}>
                    <span className="flex flex-row items-center justify-between">
                        <span className="text-white text-3xl">Dropdown</span><br />
                        <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteElement(index)}>×</button>
                    </span>

                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">ID: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.id || ''} onChange={(e) => changeValue('id', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Label: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.label || ''} onChange={(e) => changeValue('label', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Required: </span>
                        <select className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.required || false} onChange={(e) => changeValue('required', e.target.value)}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </span>
                    <button className="bg-[--one] p-2 text-white focus:outline-none focus:ring-2 focus:ring-[--five]" onClick={() => addOption()} title='Add option'>
                        + Add option
                    </button>
                    {
                        options.map((opt, i) => {
                            // console.log(i);
                            return <span className="grid grid-cols-7 items-center my-2 w-full text-right" key={`option-${i}`}>
                                <span className="w-full col-span-3">
                                    <span className="text-white text-lg">Name:&nbsp;</span>
                                    <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={opt.name || ''} onChange={(e) => changeValue('options', e.target.value, 'name', i)} />
                                </span>
                                <span className="w-full col-span-3">
                                    <span className="text-white text-lg">Value:&nbsp;</span>
                                    <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={opt.value || ''} onChange={(e) => changeValue('options', e.target.value, 'value', i)} />
                                </span>
                                <button className="w-10 h-10 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteOption(i)} title={`Delete option`}>×</button>
                            </span>
                        })
                    }
                </div>
            );

        case 'textarea':
            return (
                <div className="bg-[--three] p-5 w-3/4 space-y-4 my-5" key={index}>
                    <span className="flex flex-row items-center justify-between">
                        <span className="text-white text-3xl">Textarea</span><br />
                        <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteElement(index)}>×</button>
                    </span>

                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">ID: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.id || ''} onChange={(e) => changeValue('id', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Label: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.label || ''} onChange={(e) => changeValue('label', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Placeholder: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.placeholder || ''} onChange={(e) => changeValue('placeholder', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Required: </span>
                        <select className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.required || false} onChange={(e) => changeValue('required', e.target.value)}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </span>
                </div>
            );

        case 'radio':
            return (
                <div className="bg-[--three] p-5 w-3/4 space-y-4 my-5" key={index}>
                    <span className="flex flex-row items-center justify-between">
                        <span className="text-white text-3xl">Radio</span><br />
                        <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteElement(index)}>×</button>
                    </span>

                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">ID: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.id || ''} onChange={(e) => changeValue('id', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Label: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.label || ''} onChange={(e) => changeValue('label', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Required: </span>
                        <select className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.required || false} onChange={(e) => changeValue('required', e.target.value)}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </span>
                    <span className="grid grid-cols-7 items-center my-2 w-full text-center">
                        <span className="w-full col-span-1 text-white text-lg text-right">Unselected</span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">Icon:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData?.icon?.no || ''} onChange={(e) => changeValue('icon', e.target.value, 'no')} />
                        </span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">Color:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData?.colors?.no || ''} onChange={(e) => changeValue('color', e.target.value, 'no')} />
                        </span>
                    </span>
                    <span className="grid grid-cols-7 items-center my-2 w-full text-center">
                        <span className="w-full col-span-1 text-white text-lg text-right">Selected</span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">Icon:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData?.icon?.yes || ''} onChange={(e) => changeValue('icon', e.target.value, 'yes')} />
                        </span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">Color:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData?.colors?.yes || ''} onChange={(e) => changeValue('color', e.target.value, 'yes')} />
                        </span>
                    </span>
                    <button className="bg-[--one] p-2 text-white focus:outline-none focus:ring-2 focus:ring-[--five]" onClick={() => addOption()} title='Add option'>
                        + Add option
                    </button>
                    {
                        options.map((opt, i) => {
                            // console.log(i);
                            return <span className="grid grid-cols-7 items-center my-2 w-full text-right" key={`radio-option-${i}`}>
                                <span className="w-full col-span-3">
                                    <span className="text-white text-lg">Name:&nbsp;</span>
                                    <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={opt.name || ''} onChange={(e) => changeValue('options', e.target.value, 'name', i)} />
                                </span>
                                <span className="w-full col-span-3">
                                    <span className="text-white text-lg">Value:&nbsp;</span>
                                    <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={opt.value || ''} onChange={(e) => changeValue('options', e.target.value, 'value', i)} />
                                </span>
                                <button className="w-10 h-10 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteOption(i)} title={`Delete option`}>×</button>
                            </span>
                        })
                    }
                </div>
            );

        case 'checkbox':
            return (
                <div className="bg-[--three] p-5 w-3/4 space-y-4 my-5" key={index}>
                    <span className="flex flex-row items-center justify-between">
                        <span className="text-white text-3xl">Checkbox</span><br />
                        <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteElement(index)}>×</button>
                    </span>

                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">ID: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.id || ''} onChange={(e) => changeValue('id', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Label: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.label || ''} onChange={(e) => changeValue('label', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Required: </span>
                        <select className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.required || false} onChange={(e) => changeValue('required', e.target.value)}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </span>
                    <span className="grid grid-cols-7 items-center my-2 w-full text-center">
                        <span className="w-full col-span-1 text-white text-lg text-right">Unselected</span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">Icon:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData?.icon?.no || ''} onChange={(e) => changeValue('icon', e.target.value, 'no')} />
                        </span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">Color:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData?.colors?.no || ''} onChange={(e) => changeValue('color', e.target.value, 'no')} />
                        </span>
                    </span>
                    <span className="grid grid-cols-7 items-center my-2 w-full text-center">
                        <span className="w-full col-span-1 text-white text-lg text-right">Selected</span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">Icon:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData?.icon?.yes || ''} onChange={(e) => changeValue('icon', e.target.value, 'yes')} />
                        </span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">Color:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData?.colors?.yes || ''} onChange={(e) => changeValue('color', e.target.value, 'yes')} />
                        </span>
                    </span>
                    <button className="bg-[--one] p-2 text-white focus:outline-none focus:ring-2 focus:ring-[--five]" onClick={() => addOption()} title='Add option'>
                        + Add option
                    </button>
                    {
                        options.map((opt, i) => {
                            // console.log(i);
                            return <span className="grid grid-cols-7 items-center my-2 w-full text-right" key={`check-option-${i}`}>
                                <span className="w-full col-span-3">
                                    <span className="text-white text-lg">Name:&nbsp;</span>
                                    <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={opt.name || ''} onChange={(e) => changeValue('options', e.target.value, 'name', i)} />
                                </span>
                                <span className="w-full col-span-3">
                                    <span className="text-white text-lg">Value:&nbsp;</span>
                                    <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={opt.value || ''} onChange={(e) => changeValue('options', e.target.value, 'value', i)} />
                                </span>
                                <button className="w-10 h-10 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteOption(i)} title={`Delete option`}>×</button>
                            </span>
                        })
                    }
                </div>
            );

        case 'rating':
            return (
                <div className="bg-[--three] p-5 w-3/4 space-y-4 my-5" key={index}>
                    <span className="flex flex-row items-center justify-between">
                        <span className="text-white text-3xl">Rating</span><br />
                        <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteElement(index)}>×</button>
                    </span>

                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">ID: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.id || ''} onChange={(e) => changeValue('id', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Label: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.label || ''} onChange={(e) => changeValue('label', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Count: </span>
                        <input type="number" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.count || ''} onChange={(e) => changeValue('count', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Icon: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData.icon || ''} onChange={(e) => changeValue('icon', e.target.value)} />
                    </span>
                    <span className="grid grid-cols-7 items-center my-2 w-full text-center">
                        <span className="w-full col-span-1 text-white text-lg text-right">Colors</span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">No:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData?.colors?.no || ''} onChange={(e) => changeValue('colors', e.target.value, 'no')} />
                        </span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">Yes:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={eleData?.colors?.yes || ''} onChange={(e) => changeValue('colors', e.target.value, 'yes')} />
                        </span>
                    </span>
                </div>
            );

        default:
            return null;
    }

}