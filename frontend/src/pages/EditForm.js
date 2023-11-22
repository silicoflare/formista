import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormEditor from "../components/form_edit/FormEditor";

export default function EditForm() {
    const { formID } = useParams();
    const [formData, setFormData] = useState(null);
    const [isPass, setIsPass] = useState(false);
    const [title, setTitle] = useState('');

    function init() {
        if (document.getElementById("pass").value === formData.password) {
            setIsPass(() => true);
            document.getElementById("pass").setAttribute('disabled', 'disabled');
        }
        else {
            document.getElementById("pass").value = '';
            document.getElementById("pass").focus();
            setIsPass(() => false);
        }
    }

    useEffect(() => {
        document.body.style.backgroundColor = '#c9d2c6';
        if(formData)    {
            setTitle(() => formData.title);
            document.title = `Edit ${formData.title} - Formista`;
        }
    }, [formData]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/gettemp/${formID}`)
            .then(response => {
                if(response.status === 404)
                    throw new Error('Not found!')
                else if (!response.ok)
                    throw new Error(`HTTP error with status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                setFormData(() => data);
                setIsPass(() => true);
                // console.log(data);
                // init();
            })
            .catch(error => {
                console.error(error);
                fetch(`${process.env.REACT_APP_BACKEND_URL}/${formID}`)
                    .then(response => {
                        if (!response.ok)
                            throw new Error(`HTTP error with status: ${response.status}`);
                        return response.json();
                    })
                    .then(data => {
                        setFormData(() => data);
                        // console.log(data);
                        // init();
                    })
                    .catch(error => {
                        console.error(error);
                    })
            })
    }, [formID]);

    return (formData &&
        <div className="flex flex-col justify-top w-screen h-screen items-start p-5 lg:p-10 text-[--two] font-montserrat">
            <h1 className="text-4xl lg:text-6xl w-full text-center font-[--three] young-serif">{title}</h1>
            <br /><br />

            {!isPass && <div className="w-full p-3 flex flex-row justify-between items-center text-3xl">
                <div className='flex flex-col lg:flex-row w-full items-start lg:items-middle'>
                    <span className="text-[--three]">Password:</span>
                    <span className="hidden lg:inline">&nbsp;</span>
                    <input type="password" id="pass" className="p-2 bg-[--four] text-xl focus:outline-none focus:ring-2 focus:ring-[--four] w-full lg:w-fit" />
                    &nbsp;
                    <button className="px-5 py-2 text-xl bg-[--one] text-white focus:outline-none focus:ring-[#317a63] w-full lg:w-fit" onClick={init}>Submit</button>
                </div>
            </div>}
            <br /><br />
            {isPass && <FormEditor formData={formData} title={title} setTitle={setTitle} formID={formID} />}
        </div>
    );
}