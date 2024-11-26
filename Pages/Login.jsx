import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({email: "", password: ""})
    const location = useLocation();
    const navigate = useNavigate();

    const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)
    const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem("loggedIn"))

    function handleSubmit(event) {
        event.preventDefault()
        setStatus("pending")
        
        async function login() {
            try {
                const data = await loginUser(loginFormData)
                setError(null)
                localStorage.setItem("loggedIn", true)
                setIsLoggedIn(true)
                navigate(`${location.state?.from || "/host"}`, {replace: true})
            } catch (error) {
                setError(error.message)
                setLoginFormData({email: "", password: ""})
            } finally {
                setStatus("idle")
            }
        }
        login()
    }

    function handleChange(event) {
        const { name, value } = event.target
        setLoginFormData(prev => {
            return {...prev, [name]: value}
        })
    }

    function handleLogout() {
        localStorage.removeItem("loggedIn")
        setIsLoggedIn(false)
        setLoginFormData({email: "", password: ""})
        navigate("/login", {replace: true})
    }

    const message = location.state?.message;

    return (
        <div className="login__container">
            <h1 className="login__title">{message ? message : "Sign in to your account"}</h1>
            {error && <h3 className="login__error">{error}</h3>}
            {isLoggedIn ? (
                <div>
                    <h2 className="login__loggedin">You are logged in</h2>
                    <button 
                        className="fullwidth__button"
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="login__form">
                    <input
                        type="email"
                        onChange={handleChange}
                        placeholder="Email address"
                        name="email"
                        value={loginFormData.email}>
                    </input>
                    <input
                        type="password"
                        onChange={handleChange}
                        placeholder="Password"
                        name="password"
                        value={loginFormData.password}>
                    </input>
                    <button 
                        className="fullwidth__button" 
                        disabled={status === "pending"}
                    >
                        {status === "pending" ? "Logging in..." : "Log in"}
                    </button>
                </form>
            )}
        </div>
    )
}

