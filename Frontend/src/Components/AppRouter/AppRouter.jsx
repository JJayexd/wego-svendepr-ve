import { Routes, Route } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { FrontPage } from "../../Pages/FrontPage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<FrontPage />} />
            </Route>
        </Routes>
    )
}