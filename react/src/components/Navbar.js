import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex flex-row justify-between align-middle w-full p-5 fixed top-0 bg-one">
            <span className="text-lg md:text-2xl lg:text-2xl font-bold text-white young-serif">Formista</span>

            <div className="space-x-4">
                <Link to="/create-form"
                    className="text-md md:text-xl lg:text-xl bg-five text-white w-30 px-4 md:px-8 lg:px-8 py-2 rounded-md montserrat font-bold">Get Started</Link>
            </div>
        </nav>
    );
}

export default Navbar;