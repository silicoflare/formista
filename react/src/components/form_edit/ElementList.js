import { useEffect, useState } from 'react';
import FormElement from './FormElement';

export default function Element({ data, setData, elementList, setElementList })  {
    useEffect(() => {
        setElementList(() => data.metadata);
    }, [data]);

    return (
        <>
        <br/><br/>
        <div className='w-3/4 flex-col justify-center flex items-center'>
            <span className="text-[--three] text-5xl font-bold">Form Elements</span><br/><br/>
            { elementList.map((ele, i) => <FormElement data={ele} type={ele.type} key={i} index={i} setElementList={setElementList}/>) }
        </div>
        </>
    );
}