import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Login.css";
import cross from "../assets/cross.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const validEmail = "yashamfoundation@gmail.com";
    const validPassword = "yashamcontent@8170";

    useEffect(() => {
        // Add the class to the body element
        document.body.classList.add('login-background');

        // Remove the class when the component is unmounted
        return () => {
            document.body.classList.remove('login-background');
        };
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format.");
            setSuccess("");
            return;
        }

        // Credential check
        if (email === validEmail && password === validPassword) {
            setError("");
            setSuccess("Login successful!");
            setTimeout(() => {
                navigate("/contenthome"); // Navigate to ContentHome page
            }, 2000); // Delay navigation to show success message
        } else {
            setError("Invalid email or password.");
            setSuccess("");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="header-container">
                    <a href="/"><img
                        src={cross} // Replace with your logo path
                        alt="Logo"
                        className="login-img"
                    /></a>

                    <h1 className="login-title">Login</h1>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group mt-2">
                        <label htmlFor="email" className="label-large">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control mt-1"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                fontSize: '18px',
                                padding: '10px',
                                backgroundColor: '#FAF9F6',
                                border: 'none',
                                color: '#282C35'
                            }}
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="password" className="label-large">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control mt-1"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                fontSize: '18px',
                                padding: '10px',
                                backgroundColor: '#FAF9F6',
                                border: 'none',
                                color: '#282C35'
                            }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>

                <p className="text-center mt-3">
                    <a href="/forgot-password" className="link-primary">
                        Forgot Password?
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;