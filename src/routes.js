import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";

const RoutesComponent = () => (
    <Routes>
        <Route exact path="/" element={<Dashboard />} />
    </Routes>
);

export default RoutesComponent;