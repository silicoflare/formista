import Feature from "./Feature";

function FeatureList() {
    return (
        <div className="mt-20">
            <h1 className="text-4xl lg:text-6xl text-center font-bold young-serif text-[--three]">Features</h1>
            <br/>
            <div className="flex flex-col lg:grid grid-cols-3">
                <Feature icon={ 'nf-seti-css' }>Control over page and<br/>element styles</Feature>
                <Feature icon={ 'nf-md-form_select' }>Various types of form fields to choose from</Feature>
                <Feature icon={ 'nf-md-key' }>Form editing is password-protected and doesn't require  an account</Feature>
            </div>
        </div>
    );
}

export default FeatureList;