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
            <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="Logo" className="logo-img" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 custom-nav">
                            <li className="nav-item">
                                <a className="nav-link active " aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item dropdown custom-dropdown">
                                <a className="nav-link " href="#" role="button">
                                    Our Story
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Our Team</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Our Mission</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Our Initiatives</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">About Us</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown custom-dropdown">
                                <a className="nav-link " href="#" role="button">
                                    Our Work
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Yasham Centre Model</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Saathi Haath Badhana</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Sunn Zara</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Hum Honge Kaamyab</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Swacch English Mission</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown custom-dropdown">
                                <a className="nav-link " href="#" role="button">
                                    Our Impact
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Student Testimonials</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Mentor Testimonials</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Yasham in News</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown custom-dropdown">
                                <a className="nav-link " href="#" role="button">
                                    Get Involved
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Sponsor</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Support Us</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Teach</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Mentor</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active " aria-current="page" href="#">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    return null;
};

export default Navbar;