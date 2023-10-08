import Navbar from "../Navbar";

function Header() {
    return (
        <>
            <Navbar/>
            <div className="flex flex-col justify-center text-center pt-20 lg:pt-40 p-10 bg-one shadow-lg">
                <h1 className="text-3xl lg:text-6xl young-serif text-white">Creating and sharing forms just became easier and powerful!</h1>
                <br/><br/>
                <p className="px-1 lg:px-32 text-lg lg:text-2xl text-white montserrat">With extensive levels of customizability, it is your forms, your way, with Formista.</p>
            </div>
        </>
    );
}

export default Header;