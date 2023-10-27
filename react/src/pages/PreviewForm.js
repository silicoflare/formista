import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

import Heading from '../components/form/Heading';
import Textbox from '../components/form/Textbox';
import Number from '../components/form/Number';
import Textarea from '../components/form/Textarea';
import Dropdown from '../components/form/Dropdown';
import Radio from '../components/form/Radio';
import Checkbox from '../components/form/Checkbox';
import Rating from '../components/form/Rating';



export default function PreviewForm() {
    const { formID } = useParams();
    const nav = useNavigate();

    const [formData, setFormData] = useState(null);
    const [formOut, setFormOut] = useState({});

    function addFonts(styleData) {
        // console.log(styleData);
        const sty = document.createElement('style');
        for (const st of styleData)
            sty.innerHTML += `${st}`;
        document.head.appendChild(sty);
    }


    // set basic styles
    function setBodyStyles(styles) {
        const body = document.body;

        for (const st in styles) {
            if (styles.hasOwnProperty(st))
                body.style[st] = styles[st];
        }
    }


    function renderElement(metadata, styles) {
        // console.log(metadata.type);
        switch (metadata.type) {
            case 'heading':
                // console.log(styles['heading']);
                return <Heading styles={styles.heading} key={metadata.id}>{metadata.label}</Heading>;

            case 'textbox':
                return <Textbox handleOut={setFormOut} id={metadata.id} placeholder={metadata.placeholder} required={metadata.required} styles={[styles.label, styles.textbox]} className="my-10" key={metadata.id}>{metadata.label}</Textbox>

            case 'number':
                return <Number handleOut={setFormOut} id={metadata.id} range={metadata.range} placeholder={metadata.placeholder} required={metadata.required} styles={[styles.label, styles.textbox]} className="my-10" key={metadata.id}>{metadata.label}</Number>

            case 'textarea':
                return <Textarea handleOut={setFormOut} id={metadata.id} placeholder={metadata.placeholder} required={metadata.required} styles={[styles.label, styles.textbox]} className="my-10" key={metadata.id}>{metadata.label}</Textarea>

            case 'dropdown':
                return <Dropdown fOut={formOut} handleOut={setFormOut} id={metadata.id} required={metadata.required} options={metadata.options} styles={[styles.label, styles.textbox]} className="my-10" key={metadata.id}>{metadata.label}</Dropdown>

            case 'radio':
                return <Radio fOut={formOut} handleOut={setFormOut} id={metadata.id} options={metadata.options} icon={metadata.icon} colors={metadata.colors} styles={styles.label} key={metadata.id}>{metadata.label}</Radio>

            case 'checkbox':
                return <Checkbox fOut={formOut} handleOut={setFormOut} id={metadata.id} options={metadata.options} icon={metadata.icon} colors={metadata.colors} styles={styles.label} key={metadata.id}>{metadata.label}</Checkbox>

            case 'rating':
                // console.log(metadata);
                return <Rating fOut={formOut} handleOut={setFormOut} id={metadata.id} count={metadata.count} icon={metadata.icon} colors={metadata.colors} styles={styles.label} key={metadata.id}>{metadata.label}</Rating>

            default:
                return null;
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/gettemp/${formID}`);
                const data = await response.json();
                setFormData(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [formID]);

    useEffect(() => {
        if(formData)
            setFormOut(() => {
                const init = {}
                const defaultVals = {
                    'textbox': '',
                    'number': 0,
                    'textarea': '',
                    'dropdown': '',
                    'radio': '',
                    'checkbox': {},
                    'rating': 0,
                }
                formData?.metadata.forEach((ele) => {
                    if (ele.type in defaultVals)
                        init[ele.id] = defaultVals[ele.type];
                });
                return init;
            });
    }, [formData, formID]);

    if (formData) {
        document.title = `${formData?.title} - Formista`;
        // const docTitle = document.title;
        // window.addEventListener("blur", function () {
        //     document.title = "Please come back :_)";
        // });
        // window.addEventListener("focus", function () {
        //     document.title = docTitle;
        // });

        addFonts(formData?.fontImports);
        setBodyStyles(formData?.styles?.body);
    }


    function goBack()   {
        nav('../edit')
    }


    const mainBody = (formData &&
        <div className="flex flex-col justify-center text-left">
            <header className="p-5 lg:p-10 text-left text-3xl lg:text-5xl" style={formData?.styles?.header}>
                {formData?.title}
            </header>
            <br /><br />

            <main className="flex flex-col justify-center items-center text-left px-4 lg:px-10 w-full">
                <div className='lg:w-1/2'>
                    {formData.metadata.map((x) => renderElement(x, formData?.styles))}
                </div>
                <button onClick={() => goBack()} style={formData?.styles?.button} className='text-xl px-10 py-2 text-center'>Go Back</button>
            </main>
            <br /><br />
        </div>
    );

    return mainBody;
}