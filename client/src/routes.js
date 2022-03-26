import React from "react"
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { DetailPage } from "./pages/DetailPage"
import { AuthPage } from "./pages/AuthPage"
import { LinksPage } from "./pages/LinksPage"
import { CreatePage } from "./pages/CreatePage"



export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <BrowserRouter>
                <Routes >
                    <Route path="/links" exact element={<LinksPage />} />
                    <Route path="/create" exact element={<CreatePage />} />
                    <Route path="/detail:id" element={<DetailPage />} />
                    <Route path="/" element={<Navigate to="/create" />} />
                </Routes>
            </BrowserRouter >
        )
    }

    return (
        <BrowserRouter>
            <Routes >
                <Route path="/" exact element={<AuthPage />} />
                <Route path="/" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter >
    )
}