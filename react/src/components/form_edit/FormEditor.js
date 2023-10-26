import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import FormTodo from "./FormTodo";
import StyleList from "./StyleList";
import ElementList from './ElementList';

export default function FormEditor({ formData, setTitle, formID }) {
    const [data, setData] = useState({});
    const [imports, setImports] = useState([]);
    const [styleData, setStyleData] = useState({});
    const [elementList, setElementList] = useState([]);

    const nav = useNavigate();


    function changeTitle(value) {
        setData(prevData => {
            const updatedData = {
                ...prevData,
                title: value
            };
            setTitle(() => value !== '' ? updatedData.title : ' ');
            return updatedData;
        });
    }

    function changePassword(value)  {
        setData(prevData => {
            return {
                ...prevData,
                'password': value
            }
        });
    }

    async function submitData(e) {
        e.preventDefault();
        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ...data,
                    'fontImports': imports,
                    'styles': styleData,
                    'metadata': elementList
                })
            };

            const response = await fetch(`http://localhost:8001/${formID}/edit`, options);

            if (!response.ok) 
                throw new Error(`HTTP error with status: ${response.status}`);

            setData({
                ...data,
                'fontImports': imports,
                'styles': styleData,
                'metadata': elementList
            });
            nav('../');
        } 
        catch (err) {
            console.error('Error:', err.message);
        }
    }


    function getStuff(key, value) {
        switch (key) {
            case 'password':
                return (
                    <div className="bg-[--three] p-5 w-3/4 space-y-4" key={key}>
                        <span className="text-white text-3xl">Password:</span><br />
                        <input type="text" id="title" className="p-2 bg-[--four] text-white text-xl focus:outline-none focus:ring-2 focus:ring-[--one]" value={value} onChange={(e) => changePassword(e.target.value)} />
                    </div>
                );

            case 'title':
                return (
                    <div className="bg-[--three] p-5 w-3/4 space-y-4" key={key}>
                        <span className="text-white text-3xl">Title:</span><br />
                        <input type="text" id="title" className="p-2 bg-[--four] text-white text-xl focus:outline-none focus:ring-2 focus:ring-[--one]" value={value} onChange={(e) => changeTitle(e.target.value)} />
                    </div>
                );

            case 'fontImports':
                return <FormTodo data={data} setData={setData} key={key} keyName={key} titl="Font Imports" imports={imports} setImports={setImports}>import</FormTodo>

            case 'styles':
                return <StyleList data={data} setData={setData} key={key} styleData={styleData} setStyleData={setStyleData} />

            case 'metadata':
                return <ElementList data={data} setData={setData} elementList={elementList} setElementList={setElementList} />

            default:
                return;
        }
    }


    function getFormID() {
        let formID = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 1; i <= 10; i++)
            formID += chars.charAt(Math.floor(Math.random() * chars.length));
        return formID;
    }

    useEffect(() => {
        if (formData['formID'] === '') {
            setData({ "formID": getFormID() });
        }
        else {
            setData(formData);
        }
    }, [formData]);


    async function previewForm() {
        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ...data,
                    'fontImports': imports,
                    'styles': styleData,
                    'metadata': elementList
                })
            };

            const response = await fetch(`http://localhost:8001/storetemp/${formID}`, options);

            if (!response.ok) 
                throw new Error(`HTTP error with status: ${response.status}`);

            setData({
                ...data,
                'fontImports': imports,
                'styles': styleData,
                'metadata': elementList
            });
            nav('../preview');
        } 
        catch (err) {
            console.error('Error:', err.message);
        }
    }


    return (
        <div className="flex flex-col justify-start items-center w-full text-left space-y-8">
            {Object.entries(data).map(([key, value]) =>
                getStuff(key, value)
            )}
            <br /><br />
            <span className="w-3/4 flex flex-row justify-center">
                <button className="bg-[--one] px-5 py-2 text-xl text-white focus:outline-none focus:ring-2 mx-5 focus:ring-[--five]" onClick={() => previewForm()}>Preview</button>
                <button className="bg-[--one] px-5 py-2 text-xl text-white focus:outline-none focus:ring-2 mx-5 focus:ring-[--five]" onClick={(e) => submitData(e)}>Submit</button>
            </span>
            <br /><br />
        </div>
    );
}