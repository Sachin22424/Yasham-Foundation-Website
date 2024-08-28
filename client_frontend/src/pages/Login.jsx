import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useState } from 'react';
import '../assets/Login.css';
import X from '../assets/cross.png';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { loginUser, loginError, isLoginLoading } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [clientError, setClientError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setClientError(null);

        const success = await loginUser({ email, password });
        if (success) {
            navigate("/");
        } else {
            setClientError("Invalid email or password");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="header-container">
                    <a href="/">
                        <img src={X} alt="Chat" className="login-img" />
                    </a>
                    <h1 className="login-title">Login</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group my-4">
                        <label htmlFor="email" className="label-large">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-1">
                        <label htmlFor="password" className="label-large">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    {clientError && <div className="alert alert-danger">{clientError}</div>}
                    {loginError && <div className="alert alert-danger">{loginError}</div>}
                    <button type="submit" className="btn btn-primary mt-4 mb-2" disabled={isLoginLoading}>
                        {isLoginLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="mt-3">
                    New to Chit Chat? <a href="/register" className="link-primary">Get Started</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
