import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaComments, FaInfoCircle, FaQuestionCircle, FaSignOutAlt, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import Notifications from "./Notifications";
import '../assets/Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [soundEnabled, setSoundEnabled] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("User");
        setUser(null);
        navigate("/login");
    };

    const toggleSound = () => {
        setSoundEnabled(!soundEnabled);
    };

    if (!user) {
        return (
            <nav className="navbar navbar-expand-lg bg-dark navbar-not-logged-in">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="/">
                        <img src={logo} alt="Icon" className="navbar-icon" />
                        Chit Chat
                    </a>
                    <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0" id="links" style={{ width: '20%' }}>
                            <li className="nav-item1">
                                <a className="nav-link active text-white mx-3" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item1">
                                <a className="nav-link text-white mx-3" href="/about">About</a>
                            </li>
                            <li className="nav-item1">
                                <a className="nav-link text-white mx-3" href="/contact">Contact</a>
                            </li>
                        </ul>
                        <a href="/login" className="btn btn-outline-light login-btn" style={{ width: '80px' }}>Login</a>
                    </div>
                </div>
            </nav>
        );
    } else {
        return (
            <div className="navbar-container">
                <div className="navbar">
                    <div className="navbar-header">
                        <img src={logo} alt="Logo" className="navbar-logo" />
                        <div className="navbar-profile">
                            <FaUser className="navbar-icon" />
                            <span>{user.name}</span>
                        </div>
                    </div>
                    <ul className="navbar-nav mt-4">
                        <li className="nav-item">
                            <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                                <FaComments className="navbar-icon" />
                                <span>Chats</span>
                            </a>
                        </li>
                        <Notifications soundEnabled={soundEnabled} />
                        <li className="nav-item">
                            <a href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>
                                <FaInfoCircle className="navbar-icon" />
                                <span>About</span>
                            </a>
                        </li>
                        <li className="nav-item mb-4">
                            <a href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>
                                <FaQuestionCircle className="navbar-icon" />
                                <span>Help</span>
                            </a>
                        </li>
                        <li className="nav-item logout mt-4" onClick={handleLogout}>
                            <a href="/logout" style={{ color: 'inherit', textDecoration: 'none' }}>
                                <FaSignOutAlt className="navbar-icon" />
                                <span>Logout</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link sound-icon" onClick={toggleSound}>
                                {soundEnabled ? <FaVolumeUp className="navbar-icon white-color" /> : <FaVolumeMute className="navbar-icon white-color" />}
                                <span className="white-color">{soundEnabled ? "on" : "off"}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
};

export default Navbar;
