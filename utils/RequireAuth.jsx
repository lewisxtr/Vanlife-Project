import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
    const location = useLocation();
    const isAuth = localStorage.getItem("loggedIn")

    if (!isAuth) {
        return <Navigate to="/login" state={{message: "Sorry. You must log in first!", from: location.pathname}} replace />
    }

    return <Outlet />
}
