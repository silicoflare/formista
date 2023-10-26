import { useState, useEffect } from "react";
import FormTodo from "./FormTodo";
import FormStyles from "./FormStyles";
import StyleList from "./StyleList";
import ElementList from './ElementList';

export default function FormEditor({ formData, setTitle })    {
    const [ data, setData ] = useState({});
    const [imports, setImports] = useState([]);
    const [ styleData, setStyleData ] = useState({});
    const [ elementList, setElementList ] = useState([]);

    
    function changeTitle(value) {
        setData(prevData => {
            const updatedData = {
              ...prevData,
              title: value
            };
            setTitle(() => value !== '' ? updatedData.title : ' ');
            // console.log(value !== '');
            return updatedData;
        });
    }

    function submitData(e)   {
        e.preventDefault();
        setData((oldData) => {
            const newData = {
                ...oldData,
                'fontImports': imports,
                'styles': styleData
            };
            // console.log(newData);
            return newData;
        });
    }


    function getStuff(key, value)   {
        switch(key)     {
            case 'formID':
                return (
                    <div className="bg-[--three] p-5 w-3/4 space-y-4" key={key}>
                        <span className="text-white text-3xl">Form ID:</span><br/>
                        <input type="text" id="formID" className="p-2 bg-gray-300 text-gray-600 text-xl focus:outline-none focus:ring-2 focus:ring-[--one]" value={value} readOnly={true} />
                    </div>
                );
            
            case 'title':
                return (
                    <div className="bg-[--three] p-5 w-3/4 space-y-4" key={key}>
                        <span className="text-white text-3xl">Title:</span><br/>
                        <input type="text" id="title" className="p-2 bg-[--four] text-white text-xl focus:outline-none focus:ring-2 focus:ring-[--one]" value={value} onChange={(e) => changeTitle(e.target.value)}/>
                    </div>
                );
            
            case 'fontImports':
                return <FormTodo data={data} setData={setData} key={key} keyName={key} titl="Font Imports" imports={imports} setImports={setImports}>import</FormTodo>
            
            case 'styles':
                return <StyleList data={data} setData={setData} key={key} styleData={styleData} setStyleData={setStyleData} />
            
            case 'metadata':
                return <ElementList data={data} setData={setData} elementList={elementList} setElementList={setElementList}/>

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
        if(formData['formID'] === '')
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
            <br/><br/>
            <button className="bg-[--one] px-5 py-2 text-xl text-white focus:outline-none focus:ring-2 mx-2 focus:ring-[--five]" onClick={(e) => submitData(e)}>Submit</button>
        </div>  
    );
}