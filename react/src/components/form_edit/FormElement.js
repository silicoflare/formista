// import { useEffect, useState } from "react";

export default function FormElement({ data, elementList, type, index, setElementList, length }) {
    function deleteElement(index) {
        setElementList((oldData) => {
            const temp = [...oldData];
            temp.splice(index, 1);
            return temp;
        })
    }

    function elementDown(index) {
        setElementList((oldData) => {
            const temp = [...oldData];
            let foo;
            foo = temp[index];
            temp[index] = temp[index + 1];
            temp[index + 1] = foo;
            return temp;
        })
    }

    function elementUp(index) {
        setElementList((oldData) => {
            const temp = [...oldData];
            let foo;
            foo = temp[index];
            temp[index] = temp[index - 1];
            temp[index - 1] = foo;
            return temp;
        })
    }


    function changeValue(prop, val, opt, i) {
        setElementList(oldList => {
            const temp = [...oldList];
            if (opt === undefined) {
                temp[index][prop] = val;
            }
            else if (i === undefined) {
                temp[index][prop][opt] = val;
            }
            else {
                temp[index][prop][i][opt] = val;
            }
            return temp;
        });
    }


    function addOption()    {
        setElementList(oldList => {
            const temp = [...oldList];
            temp[index]['options'].push({
                "name": '',
                "value": ''
            });
            return temp;
        })
    }


    function deleteOption(i)    {
        setElementList(oldList => {
            const temp = [...oldList];
            temp[index]['options'].splice(i, 1);
            return temp;
        })
    }

    switch (type) {
        case 'heading':
            return (
                <div className="bg-[--three] p-5 w-3/4 space-y-4 my-5" key={index}>
                    <span className="flex flex-row items-center justify-between">
                        <span className="text-white text-3xl">Heading</span><br />
                        <span>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four] disabled:bg-gray-500 disabled:text-gray-300" onClick={() => elementUp(index)} disabled={index === 0}>▲</button>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four] disabled:bg-gray-500 disabled:text-gray-300" onClick={() => elementDown(index)} disabled={index === length - 1}>▼</button>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteElement(index)}>×</button>
                        </span>
                    </span>

                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">ID: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].id || ''} onChange={(e) => changeValue('id', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Label: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].label || ''} onChange={(e) => changeValue('label', e.target.value)} />
                    </span>
                </div>
            );


        case 'textbox':
            return (
                <div className="bg-[--three] p-5 w-3/4 space-y-4 my-5" key={index}>
                    <span className="flex flex-row items-center justify-between">
                        <span className="text-white text-3xl">Textbox</span><br />
                        <span>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four] disabled:bg-gray-500 disabled:text-gray-300" onClick={() => elementUp(index)} disabled={index === 0}>▲</button>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four] disabled:bg-gray-500 disabled:text-gray-300" onClick={() => elementDown(index)} disabled={index === length - 1}>▼</button>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteElement(index)}>×</button>
                        </span>
                    </span>

                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">ID: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].id || ''} onChange={(e) => changeValue('id', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Label: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].label || ''} onChange={(e) => changeValue('label', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Placeholder: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].placeholder || ''} onChange={(e) => changeValue('placeholder', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Required: </span>
                        <select className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].required || false} onChange={(e) => changeValue('required', e.target.value)}>
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
                        <span>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four] disabled:bg-gray-500 disabled:text-gray-300" onClick={() => elementUp(index)} disabled={index === 0}>▲</button>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four] disabled:bg-gray-500 disabled:text-gray-300" onClick={() => elementDown(index)} disabled={index === length - 1}>▼</button>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteElement(index)}>×</button>
                        </span>
                    </span>

                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">ID: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].id || ''} onChange={(e) => changeValue('id', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Label: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].label || ''} onChange={(e) => changeValue('label', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Placeholder: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].placeholder || ''} onChange={(e) => changeValue('placeholder', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Range min: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index]?.range?.min || 0} onChange={(e) => changeValue('range', e.target.value, 'min')} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Range max: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index]?.range?.max || 0} onChange={(e) => changeValue('range', e.target.value, 'max')} />
                    </span>

                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Required: </span>
                        <select className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].required || false} onChange={(e) => changeValue('required', e.target.value)}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </span>
                </div>
            );

        case 'textarea':
            return (
                <div className="bg-[--three] p-5 w-3/4 space-y-4 my-5" key={index}>
                    <span className="flex flex-row items-center justify-between">
                        <span className="text-white text-3xl">Textarea</span><br />
                        <span>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four] disabled:bg-gray-500 disabled:text-gray-300" onClick={() => elementUp(index)} disabled={index === 0}>▲</button>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four] disabled:bg-gray-500 disabled:text-gray-300" onClick={() => elementDown(index)} disabled={index === length - 1}>▼</button>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteElement(index)}>×</button>
                        </span>
                    </span>

                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">ID: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].id || ''} onChange={(e) => changeValue('id', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Label: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].label || ''} onChange={(e) => changeValue('label', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Placeholder: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].placeholder || ''} onChange={(e) => changeValue('placeholder', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Required: </span>
                        <select className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].required || false} onChange={(e) => changeValue('required', e.target.value)}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </span>
                </div>
            );

        case 'rating':
            return (
                <div className="bg-[--three] p-5 w-3/4 space-y-4 my-5" key={index}>
                    <span className="flex flex-row items-center justify-between">
                        <span className="text-white text-3xl">Rating</span><br />
                        <span>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four] disabled:bg-gray-500 disabled:text-gray-300" onClick={() => elementUp(index)} disabled={index === 0}>▲</button>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four] disabled:bg-gray-500 disabled:text-gray-300" onClick={() => elementDown(index)} disabled={index === length - 1}>▼</button>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteElement(index)}>×</button>
                        </span>
                    </span>

                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">ID: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].id || ''} onChange={(e) => changeValue('id', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Label: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].label || ''} onChange={(e) => changeValue('label', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Count: </span>
                        <input type="number" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].count || ''} onChange={(e) => changeValue('count', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Icon: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].icon || ''} onChange={(e) => changeValue('icon', e.target.value)} />
                    </span>
                    <span className="grid grid-cols-7 items-center my-2 w-full text-center">
                        <span className="w-full col-span-1 text-white text-lg text-right">Colors</span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">No:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index]?.colors?.no || ''} onChange={(e) => changeValue('colors', e.target.value, 'no')} />
                        </span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">Yes:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index]?.colors?.yes || ''} onChange={(e) => changeValue('colors', e.target.value, 'yes')} />
                        </span>
                    </span>
                </div>
            );

        case 'dropdown':
            return (
                <div className="bg-[--three] p-5 w-3/4 space-y-4 my-5" key={index}>
                    <span className="flex flex-row items-center justify-between">
                        <span className="text-white text-3xl">Dropdown</span><br />
                        <span>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four] disabled:bg-gray-500 disabled:text-gray-300" onClick={() => elementUp(index)} disabled={index === 0}>▲</button>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four] disabled:bg-gray-500 disabled:text-gray-300" onClick={() => elementDown(index)} disabled={index === length - 1}>▼</button>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteElement(index)}>×</button>
                        </span>
                    </span>

                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">ID: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].id || ''} onChange={(e) => changeValue('id', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Label: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].label || ''} onChange={(e) => changeValue('label', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Required: </span>
                        <select className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].required || false} onChange={(e) => changeValue('required', e.target.value)}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </span>
                    <button className="bg-[--one] p-2 text-white focus:outline-none focus:ring-2 focus:ring-[--five]" onClick={() => addOption()} title='Add option'>
                        + Add option
                    </button>
                    {
                        elementList[index].options.map((opt, i) => {
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

        case 'radio':
            return (
                <div className="bg-[--three] p-5 w-3/4 space-y-4 my-5" key={index}>
                    <span className="flex flex-row items-center justify-between">
                        <span className="text-white text-3xl">Radio</span><br />
                        <span>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four] disabled:bg-gray-500 disabled:text-gray-300" onClick={() => elementUp(index)} disabled={index === 0}>▲</button>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four] disabled:bg-gray-500 disabled:text-gray-300" onClick={() => elementDown(index)} disabled={index === length - 1}>▼</button>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteElement(index)}>×</button>
                        </span>
                    </span>

                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">ID: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].id || ''} onChange={(e) => changeValue('id', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Label: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].label || ''} onChange={(e) => changeValue('label', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Required: </span>
                        <select className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].required || false} onChange={(e) => changeValue('required', e.target.value)}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </span>
                    <span className="grid grid-cols-7 items-center my-2 w-full text-center">
                        <span className="w-full col-span-1 text-white text-lg text-right">Unselected</span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">Icon:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index]?.icon?.no || ''} onChange={(e) => changeValue('icon', e.target.value, 'no')} />
                        </span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">Color:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index]?.colors?.no || ''} onChange={(e) => changeValue('color', e.target.value, 'no')} />
                        </span>
                    </span>
                    <span className="grid grid-cols-7 items-center my-2 w-full text-center">
                        <span className="w-full col-span-1 text-white text-lg text-right">Selected</span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">Icon:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index]?.icon?.yes || ''} onChange={(e) => changeValue('icon', e.target.value, 'yes')} />
                        </span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">Color:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index]?.colors?.yes || ''} onChange={(e) => changeValue('color', e.target.value, 'yes')} />
                        </span>
                    </span>
                    <button className="bg-[--one] p-2 text-white focus:outline-none focus:ring-2 focus:ring-[--five]" onClick={() => addOption()} title='Add option'>
                        + Add option
                    </button>
                    {
                        elementList[index].options.map((opt, i) => {
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
                        <span>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four] disabled:bg-gray-500 disabled:text-gray-300" onClick={() => elementUp(index)} disabled={index === 0}>▲</button>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four] disabled:bg-gray-500 disabled:text-gray-300" onClick={() => elementDown(index)} disabled={index === length - 1}>▼</button>
                            <button className="p-2 w-11 h-11 mx-2 bg-[--two] text-white focus:outline-none focus:ring-2 focus:ring-[--four]" onClick={() => deleteElement(index)}>×</button>
                        </span>
                    </span>

                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">ID: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].id || ''} onChange={(e) => changeValue('id', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Label: </span>
                        <input type="text" className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].label || ''} onChange={(e) => changeValue('label', e.target.value)} />
                    </span>
                    <span className="flex flex-row items-center justify-between my-2">
                        <span className="text-white text-lg">Required: </span>
                        <select className="fonts p-2 bg-[--four] text-white text-lg font-mono w-1/2 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index].required || false} onChange={(e) => changeValue('required', e.target.value)}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </span>
                    <span className="grid grid-cols-7 items-center my-2 w-full text-center">
                        <span className="w-full col-span-1 text-white text-lg text-right">Unselected</span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">Icon:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index]?.icon?.no || ''} onChange={(e) => changeValue('icon', e.target.value, 'no')} />
                        </span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">Color:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index]?.colors?.no || ''} onChange={(e) => changeValue('color', e.target.value, 'no')} />
                        </span>
                    </span>
                    <span className="grid grid-cols-7 items-center my-2 w-full text-center">
                        <span className="w-full col-span-1 text-white text-lg text-right">Selected</span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">Icon:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index]?.icon?.yes || ''} onChange={(e) => changeValue('icon', e.target.value, 'yes')} />
                        </span>
                        <span className="w-full col-span-3">
                            <span className="text-white text-lg">Color:&nbsp;</span>
                            <input type="text" className="fonts p-2 bg-[--four] text-white text-md font-mono w-2/3 focus:outline-none focus:ring-2 focus:ring-[--one]" value={elementList[index]?.colors?.yes || ''} onChange={(e) => changeValue('color', e.target.value, 'yes')} />
                        </span>
                    </span>
                    <button className="bg-[--one] p-2 text-white focus:outline-none focus:ring-2 focus:ring-[--five]" onClick={() => addOption()} title='Add option'>
                        + Add option
                    </button>
                    {
                        elementList[index].options.map((opt, i) => {
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


        default:
            return null;
    }
}