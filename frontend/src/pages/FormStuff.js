import { Outlet } from "react-router-dom";

function FormStuff() {
    return (
        <div className="flex flex-col justify-center text-center">
            <Outlet />
        </div>
    );
}

export default FormStuff;