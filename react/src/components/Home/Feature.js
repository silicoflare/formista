function Feature({ icon, children }) {
    return (
        <div className="flex flex-col justify-center text-center p-10">
            <i className={ 'nf text-7xl fg-four ' + icon }></i><br/>
            <span className="text-[--two] font-bold text-xl montserrat">
                { children }
            </span>
        </div>
    );
}

export default Feature;