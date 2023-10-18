import { useState, useEffect } from "react";
import FormTodo from "./FormTodo";

export default function FormEditor({ formData, setTitle })    {
    const [ data, setData ] = useState({});

    function changeTitle(value) {
        setData(prevData => {
            const updatedData = {
              ...prevData,
              title: value
            };
            setTitle(() => value !== '' ? updatedData.title : ' ');
            console.log(value !== '');
            return updatedData;
        });
    }

    function getStuff(key, value)   {
        switch(key)     {
            case 'formID':
                return (
                    <div className="bg-[--five] py-3 px-5 rounded-md w-3/4 space-y-4" key={key}>
                        <span className="text-white text-3xl">Form ID:</span><br/>
                        <input type="text" id="formID" className="p-2 bg-gray-300 text-gray-600 text-xl" value={value} readOnly={true} />
                    </div>
                );
            
            case 'title':
                return (
                    <div className="bg-[--five] py-3 px-5 rounded-md w-3/4 space-y-4" key={key}>
                        <span className="text-white text-3xl">Title:</span><br/>
                        <input type="text" id="title" className="p-2 bg-white text-black text-xl" value={value} onChange={(e) => changeTitle(e.target.value)}/>
                    </div>
                );
            
            case 'fontImports':
                return <FormTodo data={data} setData={setData} key={key} keyName={key} titl="Font Imports">import</FormTodo>
            
            default:
                return;
        }
    }
    

    function getFormID()    {
        let formID = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for(let i = 1; i <= 10; i++)
            formID += chars.charAt(Math.floor(Math.random() * chars.length));
        return formID;
    }

    useEffect(() => {
        if(formData === {})
        {
            setData({ "formID": getFormID() });
        }
        else    {
            setData(formData);
        }
    }, [formData]);

    return (
        <div className="flex flex-col justify-start items-center w-full text-left space-y-8">
            { Object.entries(data).map(([key, value]) => 
                getStuff(key, value)
            ) }
        </div>
    );
}