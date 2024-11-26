import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <nav className="header">
            <div className="logo">
                <NavLink to="/">#VANLIFE</NavLink>
            </div>
            <ul className="nav-links">
                <li><NavLink style={({isActive}) => isActive ? activeStyle : null} to="about">About</NavLink></li>
                <li><NavLink style={({isActive}) => isActive ? activeStyle : null} to="vans">Vans</NavLink></li>
                <li><NavLink style={({isActive}) => isActive ? activeStyle : null} to="host">Host</NavLink></li>
                <li><Link to="login" className="header-login-link">
                    <img src="/accounticon.png" className="header-login-icon" />
                </Link></li>
            </ul>
        </nav>

    )
}