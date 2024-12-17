import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../assets/Navbar.css';
import logo from '../assets/logo.png';

const NavbarContent = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout(); // Update authentication state
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={logo} alt="Logo" className="logo-img" />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-center"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mb-2 mb-lg-0 custom-nav text-center">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/contenthome">Home</a>
                        </li>
                        <li className="nav-item dropdown custom-dropdown">
                            <a className="nav-link" href="#" role="button">Our Story</a>
                            <ul className="dropdown-menu full-width-dropdown">
                                <li><a className="dropdown-item" href="/contentabout">About Us</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/contentmission">Our Mission</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Our Initiatives</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Our Team</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown custom-dropdown">
                            <a className="nav-link" href="#" role="button">Our Work</a>
                            <ul className="dropdown-menu full-width-dropdown">
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
                            <a className="nav-link" href="#" role="button">Our Impact</a>
                            <ul className="dropdown-menu full-width-dropdown">
                                <li><a className="dropdown-item" href="#">Student Testimonials</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Mentor Testimonials</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/news">Yasham in News</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown custom-dropdown">
                            <a className="nav-link" href="#" role="button">Get Involved</a>
                            <ul className="dropdown-menu full-width-dropdown">
                                <li><a className="dropdown-item" href="#">Sponsor</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/contentsupport">Support Us</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Teach</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Mentor</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/contentcontact">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </div>
            <button
                className="btn btn-outline-light logout-btn mb-2 mx-4"
                onClick={handleLogout}
                style={{ fontWeight: 'bold' }}
            >
                Logout
            </button>
        </nav>
    );
};

export default NavbarContent;