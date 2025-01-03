import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/Login.css";
import cross from "../assets/cross.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        document.body.classList.add('login-background');
        return () => {
            document.body.classList.remove('login-background');
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format.");
            setSuccess("");
            return;
        }

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setError("");
                setSuccess("Login successful!");
                login(data.token); // Update authentication state with JWT token
                setTimeout(() => {
                    navigate("/contenthome");
                }, 2000);
            } else {
                setError(data.message || "Invalid email or password.");
                setSuccess("");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
            setSuccess("");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="header-container">
                    <a href="/"><img src={cross} alt="Logo" className="login-img" /></a>
                    <h1 className="login-title">Admin Login</h1>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group mt-2">
                        <label htmlFor="email" className="label-large">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control mt-1"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ fontSize: '18px', padding: '10px', backgroundColor: '#FAF9F6', border: 'none', color: '#282C35' }}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="password" className="label-large">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control mt-1"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ fontSize: '18px', padding: '10px', backgroundColor: '#FAF9F6', border: 'none', color: '#282C35' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <p className="text-center mt-3">
                    <a href="/forgot-password" className="link-primary">Forgot Password?</a>
                </p>
            </div>
        </div>
    );
};

export default Login;