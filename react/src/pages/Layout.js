import { Outlet } from "react-router-dom";

function Layout() {
    return(
        <div className="flex flex-col justify-center text-center">
            <Outlet/>
        </div>
    )
};

export default Layout;