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
                            <a className="nav-link" href="#" role="button">Story</a>
                            <ul className="dropdown-menu full-width-dropdown">
                                <li><a className="dropdown-item" href="/contentabout">About</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/contentmission">Mission</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/contentteam">Team</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown custom-dropdown">
                            <a className="nav-link" href="#" role="button">Work</a>
                            <ul className="dropdown-menu full-width-dropdown">
                                <li><a className="dropdown-item" href="/contentycm">Work Page 1</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/contentShb">Work Page 2</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/contentSz">Work Page 3</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/contentHhk">Work Page 4</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/contentSem">Work Page 5</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/international">Work Page 6</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown custom-dropdown">
                            <a className="nav-link" href="#" role="button">Impact</a>
                            <ul className="dropdown-menu full-width-dropdown">
                                <li><a className="dropdown-item" href="/contentstudenttestimonial">Student Testimonials</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/contentmentortestimonial">Mentor Testimonials</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/contentnews">News</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown custom-dropdown">
                            <a className="nav-link" href="#" role="button">Involved</a>
                            <ul className="dropdown-menu full-width-dropdown">
                                <li><a className="dropdown-item" href="#">Sponsor</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/contentsupport">Support Us</a></li>
                               
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/contentcontact">Contact Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/contentfeedback">Feedback</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/contentmentorform">Mentor/Teach Feedback</a>
                        </li>
                    </ul>
                </div>
                <button
                    className="btn btn-outline-light get-image-btn mb-2 mx-2"
                    onClick={() => window.open('https://postimages.org/', '_blank')}
                    style={{ fontWeight: 'bold' }}
                >
                    Get Image Url
                </button>
                <button
                    className="btn btn-outline-light logout-btn mb-2 mx-4"
                    onClick={handleLogout}
                    style={{ fontWeight: 'bold' }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default NavbarContent;