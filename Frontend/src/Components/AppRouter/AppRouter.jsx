import { Routes, Route } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { FrontPage } from "../../Pages/FrontPage";
import { LiftPage } from "../../Pages/LiftPage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<FrontPage />} />
                <Route path="/lift" element={<LiftPage />} />
            </Route>
        </Routes>
    )
}