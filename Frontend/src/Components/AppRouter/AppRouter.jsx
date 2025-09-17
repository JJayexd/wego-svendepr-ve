import { Routes, Route } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { FrontPage } from "../../Pages/FrontPage";
import { LiftPage } from "../../Pages/LiftPage";
import { LiftDetailsPage } from "../../Pages/LiftDetailsPage";
import { LiftBookPage } from "../../Pages/LiftBookPage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<FrontPage />} />
                <Route path="/lift" element={<LiftPage />} />
                <Route path="/trips/:id" element={<LiftDetailsPage />} />
                <Route path="/trips/:id/book" element={<LiftBookPage />} />
            </Route>
        </Routes>
    )
}