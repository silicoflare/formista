import { useParams } from 'react-router-dom';
import { useState } from "react";

import Heading from '../components/form/Heading';
import Textbox from '../components/form/Textbox';
import Number from '../components/form/Number';
import Textarea from '../components/form/Textarea';
import Dropdown from '../components/form/Dropdown';
import Radio from '../components/form/Radio';
import Checkbox from '../components/form/Checkbox';
import Rating from '../components/form/Rating';







function ViewForm() {
    const { formID } = useParams();
    const formData = require(`../../form_ideas/${formID}.json`);
    const [formOut, setFormOut] = useState(() => {
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
        formData.metadata.forEach((ele) => {
            if(ele.type in defaultVals)
                init[ele.id] = defaultVals[ele.type];
        });
        return init;
    });

    // add stylesheets
    function addFonts(styles) {
        const sty = document.createElement('style');
        for (const st of styles)
            sty.innerHTML += st;
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


    // element render
    function renderElement(metadata, styles) {
        // console.log(metadata.type);
        switch (metadata.type) {
            case 'heading':
                // console.log(metadata);
                return <Heading styles={styles.heading} key={metadata.id}>{metadata.label}</Heading>;

            case 'textbox':
                return <Textbox handleOut={setFormOut} id={metadata.id} placeholder={metadata.placeholder} required={metadata.required} styles={[styles.label, styles.textbox]} className="my-10" key={metadata.id}>{metadata.label}</Textbox>

            case 'number':
                return <Number handleOut={setFormOut} id={ metadata.id } range={ metadata.range } placeholder={ metadata.placeholder } required={ metadata.required } styles={[styles.label, styles.textbox ]} className="my-10" key={ metadata.id }>{ metadata.label }</Number>

            case 'textarea':
                return <Textarea handleOut={setFormOut} id={ metadata.id } placeholder={ metadata.placeholder } required={ metadata.required } styles={[styles.label, styles.textbox ]} className="my-10" key={ metadata.id }>{ metadata.label }</Textarea>

            case 'dropdown':
                return <Dropdown fOut={formOut} handleOut={setFormOut} id={metadata.id} required={metadata.required} options={metadata.options} styles={[styles.label, styles.dropdown, styles.option ]} className="my-10" key={metadata.id}>{metadata.label}</Dropdown>

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





    // Setting title
    document.title = `${formData.title} - Formista`;
    const docTitle = document.title;
    window.addEventListener("blur", function () {
        document.title = "Please come back :_)";
    });
    window.addEventListener("focus", function () {
        document.title = docTitle;
    });


    // import fonts
    addFonts(formData.fontImports);

    // set basic styles
    setBodyStyles(formData.styles.body);

    //handling changes in the form
    const handleChange = (field, newData) => {
        setFormOut(function (oldData) {
            return {
                ...oldData,
                [field]: newData
            }
        })
    };

    const mainBody = (
        <div className="flex flex-col justify-center text-left">
            <header className="p-5 lg:p-10 text-left text-2xl lg:text-5xl" style={formData.styles.header}>
                {formData.title}
            </header>
            <br /><br />

            <main className="flex flex-col justify-center items-center text-left px-10 w-full">
                <div className='lg:w-3/4'>
                    {formData.metadata.map((x) => renderElement(x, formData.styles.formElements))}
                </div>
                <button onClick={() => console.log(formOut)} style={formData.styles.formElements.button} className='text-3xl px-10 py-2'>Submit</button>
            </main>
            <br/><br/>
        </div>
    );


    return mainBody;
}

export default ViewForm;