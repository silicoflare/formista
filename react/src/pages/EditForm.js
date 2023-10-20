import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormEditor from "../components/form_edit/FormEditor";
// import Popup from "../components/Popup";

export default function EditForm() {
    const { formID } = useParams();
    const [ isPass, setIsPass ] = useState(false);
    const [ title, setTitle ] = useState('');
    // const [ showPopup, setPopup ] = useState(true);
    const formData = require(`../../form_ideas/${formID}.json`);

    function init()  {
        document.title = `Edit ${formData.title} - Formista`;

        if(document.getElementById("pass").value === formData.password) {
            setIsPass(() => true); 
            document.getElementById("pass").setAttribute('disabled', 'disabled');
        }
        else    {
            document.getElementById("pass").value = '';
            document.getElementById("pass").focus();
            setIsPass(() => false); 
        }
    }

    useEffect(() => {
        setTitle(formData.title);
    }, []);

    // useEffect(() => {
    //     askPass(setPass);
    // }, []);
    
    // useEffect(() => {
    //     if (password === formData.password && password !== '') {
    //         // setPopup(() => true);
    //         setIsPass(() => true);
    //     }
    //     else {
    //         setIsPass(() => false);
    //         askPass(setPass);
    //     }
    // }, [password]);

    return (
        <div className="flex flex-col justify-top w-screen h-screen items-start p-10 text-[--two] font-montserrat">
            <h1 className="text-4xl lg:text-6xl w-full text-center font-[--three] young-serif">{ title }</h1>
            <br/><br/>

            { !isPass && <div className="w-full p-3 flex flex-row justify-between items-center text-3xl">
                <div>
                    <span className="text-[--three]">Password:</span>&nbsp;
                    <input type="password" id="pass" className="p-2 bg-[--four] text-xl focus:outline-none focus:ring-2 focus:ring-[--four]" />&nbsp;
                    <button className="px-5 py-2 text-xl bg-[--one] text-white focus:outline-none focus:ring-[#317a63]" onClick={init}>Submit</button>
                </div> 
            </div> }
            <br/><br/>
            { isPass && <FormEditor formData={formData} setTitle={setTitle}/> }
        </div>
    );
}