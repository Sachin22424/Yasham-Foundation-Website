import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useState } from 'react';
import '../assets/Register.css';
import X from '../assets/cross.png';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(AuthContext);
    const [clientError, setClientError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateRegisterInfo({
            ...registerInfo,
            [name]: value,
        });
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return re.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setClientError(null);

        if (!validateEmail(registerInfo.email)) {
            return setClientError("Invalid email format");
        }

        if (!validatePassword(registerInfo.password)) {
            return setClientError("Password must be 8 characters long with at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol");
        }

        const success = await registerUser(e);
        if (success) {
            setSuccessMessage("Register successful! You can login now.");
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <div className="header-container">
                    <a href="/">
                        <img src={X} alt="Chat" className="register-img" />
                    </a>
                    <h1 className="register-title">Register</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group my-4">
                        <label htmlFor="name" className="label-large">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter name"
                            value={registerInfo.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group my-4">
                        <label htmlFor="email" className="label-large">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            value={registerInfo.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="password" className="label-large">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={registerInfo.password}
                            onChange={handleChange}
                        />
                        <small className="form-text text-muted">
                            Password must be 8 characters long with at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.
                        </small>
                    </div>
                    {clientError && <div className="alert alert-danger">{clientError}</div>}
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <button type="submit" className="btn btn-primary mb-2" disabled={isRegisterLoading}>
                        {isRegisterLoading ? "Creating your account..." : "Register"}
                    </button>
                </form>
                <p className="mt-3">
                    Already have an account? <a href="/login" className="link-primary">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
