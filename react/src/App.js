import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Layout from './pages/Layout';
import FormStuff from "./pages/FormStuff";
import ViewForm from "./pages/ViewForm";
import EditForm from "./pages/EditForm";
import PreviewForm from "./pages/PreviewForm";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/:formID" element={ <FormStuff/> }>
                    <Route index element={<ViewForm />} />
                    <Route path="edit" element={ <EditForm/> } />
                    <Route path="preview" element={ <PreviewForm/> } />
                    {/* <Route path="delete" element={ <DeleteForm/> } /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;