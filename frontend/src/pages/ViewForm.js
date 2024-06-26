import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

import Heading from '../components/form/Heading';
import Textbox from '../components/form/Textbox';
import Number from '../components/form/Number';
import Textarea from '../components/form/Textarea';
import Dropdown from '../components/form/Dropdown';
import Radio from '../components/form/Radio';
import Checkbox from '../components/form/Checkbox';
import Rating from '../components/form/Rating';
import Alert from '../components/Alert';



export default function ViewForm() {
    const { formID } = useParams();

    const [formData, setFormData] = useState(null);
    const [formOut, setFormOut] = useState({});

    const [ isShown, setIsShown ] = useState(false);

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
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${formID}`);
                const data = await response.json();
                setFormData(data);
                // console.log(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [formID]);

    useEffect(() => {
        if (formData)
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

        addFonts(formData?.fontImports);
        setBodyStyles(formData?.styles?.body);
    }


    async function submit() {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
            body: JSON.stringify(formOut)
        };

        let resp = null;

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/respond/${formID}`, options)
            .then(response => response.json())
            .then(response => resp = response)
            .catch(err => console.error(err));

        if(resp)
            setIsShown(() => true);
    }


    const mainBody = (formData &&
        <div className="flex flex-col justify-center text-left">
            <Alert message='Form submitted successfully!' duration={3} isShown={isShown} setIsShown={setIsShown} />
            <header className="p-5 lg:p-10 text-left text-3xl lg:text-5xl" style={formData?.styles?.header}>
                {formData?.title}
            </header>
            <br /><br />

            <main className="flex flex-col justify-center items-center text-left px-4 lg:px-10 w-full">
                <div className='lg:w-1/2'>
                    {formData.metadata.map((x) => renderElement(x, formData?.styles))}
                </div>
                <button onClick={() => submit()} style={formData?.styles?.button} className='text-xl px-10 py-2 text-center'>Submit</button>
            </main>
            <br /><br />
        </div>
    );

    return mainBody;
}