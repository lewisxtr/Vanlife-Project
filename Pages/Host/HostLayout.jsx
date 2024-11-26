import React from 'react';

import { Outlet, NavLink } from "react-router-dom";

export default function HostLayout() {

    const activeStyle = {
        textDecoration: "underline",
        fontWeight: "bold"
    }

    return (
        <div className="host__container">
            <nav className="host__links">
                <NavLink 
                to="."
                end
                style={({isActive}) => isActive ? activeStyle : null}>
                Dashboard
                </NavLink>

                <NavLink 
                to="income"
                style={({isActive}) => isActive ? activeStyle : null}>
                Income
                </NavLink>

                <NavLink 
                to="reviews"
                style={({isActive}) => isActive ? activeStyle : null}>
                Reviews
                </NavLink>

                <NavLink 
                to="vans"
                style={({isActive}) => isActive ? activeStyle : null}>
                Vans
                </NavLink>
            </nav>
            <Outlet />
        </div>
    )

}

