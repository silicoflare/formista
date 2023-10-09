import { useParams } from 'react-router-dom';

import Heading from '../components/form/Heading';
import Textbox from '../components/form/Textbox';
import Number from '../components/form/Number';
import Textarea from '../components/form/Textarea';
import Dropdown from '../components/form/Dropdown';

// add stylesheets
function addFonts(styles) {
    const sty = document.createElement('style');
    for(const st of styles)
        sty.innerHTML += st;
    document.head.appendChild(sty);
}


// set basic styles
function setBodyStyles(styles) {
    const body = document.body;

    for(const st in styles) {
        if(styles.hasOwnProperty(st))
            body.style[st] = styles[st];
    }
}


// element render
function renderElement(metadata, styles)    {
    switch(metadata.type)   {
        case 'heading':
            // console.log(metadata);
            return <Heading styles={ styles.heading } key={ metadata.id }>{ metadata.label }</Heading>;
        
        case 'textbox':
            return <Textbox id={ metadata.id } placeholder={ metadata.placeholder } required={ metadata.required } styles={[styles.label, styles.textbox ]} className="my-10" key={ metadata.id }>{ metadata.label }</Textbox>

        case 'number':
            return <Number id={ metadata.id } range={ metadata.range } placeholder={ metadata.placeholder } required={ metadata.required } styles={[styles.label, styles.textbox ]} className="my-10" key={ metadata.id }>{ metadata.label }</Number>
        
        case 'textarea':
            return <Textarea id={ metadata.id } placeholder={ metadata.placeholder } required={ metadata.required } styles={[styles.label, styles.textbox ]} className="my-10" key={ metadata.id }>{ metadata.label }</Textarea>

        case 'dropdown':
            return <Dropdown id={metadata.id} required={metadata.required} options={metadata.options} styles={[styles.label, styles.dropdown, styles.option ]} className="my-10" key={metadata.id}>{metadata.label}</Dropdown>


        default: 
            return null;
    }
}





function ViewForm() {
    const { formID } = useParams();
    const formData =  require(`../../form_ideas/${formID}.json`);
    // console.log(formData);

    // Setting title
    document.title = `${formData.title} - Formista`;
    const docTitle = document.title;
    window.addEventListener("blur", function() {
        document.title = "Pleae come back :_)";
    });
    window.addEventListener("focus", function() {
        document.title = docTitle;
    });


    // import fonts
    addFonts(formData.fontImports);

    // set basic styles
    setBodyStyles(formData.styles.body);



    const mainBody = (
        <div className="flex flex-col justify-center text-left">
            <header className="p-5 lg:p-10 text-left text-2xl lg:text-5xl" style={ formData.styles.header }>
                { formData.title }
            </header>
            <br/><br/>

            <main className="flex flex-col justify-center items-center text-left px-10 w-full">
                <div className='lg:w-3/4'>
                    { formData.metadata.map((x) => renderElement(x, formData.styles.formElements)) }
                </div>
            </main>
        </div>
    );


    return mainBody;
}

export default ViewForm;