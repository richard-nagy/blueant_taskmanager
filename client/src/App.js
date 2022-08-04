import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserTable from "./Components/User/UserTable";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserTable />} />
            </Routes>
        </BrowserRouter>
    );
}
