import { useEffect, useState } from 'react';
import FormElement from './FormElement';

export default function Element({ data, setData, elementList, setElementList }) {
    useEffect(() => {
        setElementList(() => data.metadata);
    }, [data]);

    return (
        <>
            <br /><br />
            <div className='w-3/4 flex-col justify-center flex items-center'>
                <span className="text-[--three] text-5xl font-bold">Form Elements</span><br /><br />
                <span className='flex flex-row w-3/4 justify-center align-middle'>
                    <select className="fonts p-2 bg-[--four] text-white text-lg font-mono w-4/5 focus:outline-none focus:ring-2 focus:ring-[--one]">
                        <option>{'lmao'}</option>
                    </select>
                    <button className="bg-[--one] p-2 text-white focus:outline-none focus:ring-2 mx-2 focus:ring-[--five]">
                        + Add element
                    </button><br /><br />
                </span>
                {elementList.map((ele, i) => <FormElement data={ele} type={ele.type} key={i} index={i} setElementList={setElementList} />)}
            </div>
        </>
    );
}