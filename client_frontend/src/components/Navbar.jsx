import React, { useState, useEffect } from "react";
import '../assets/Navbar.css';
import logo from '../assets/logo.png';
import axios from 'axios';

const Navbar = () => {
    const [navInfo, setNavInfo] = useState({
        heading: '',
        dropdowns: []
    });

    useEffect(() => {
        const fetchNavInfo = async () => {
            try {
                const response = await axios.get('https://yasham-foundation-website.onrender.com/api/nav');
                setNavInfo(response.data);
            } catch (error) {
                console.error('Error fetching nav info:', error);
            }
        };

        fetchNavInfo();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
            <div className="container-fluid">
                <a className="navbar-brand" href="/home">
                    <img src={logo} alt="Logo" className="logo-img" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 custom-nav text-center">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        {navInfo.dropdowns.map((dropdown, index) => (
                            <li key={index} className="nav-item dropdown custom-dropdown">
                                <a className="nav-link" href="#" role="button">
                                    {dropdown.title}
                                </a>
                                <ul className="dropdown-menu full-width-dropdown">
                                    {dropdown.links.map((link, linkIndex) => (
                                        <React.Fragment key={linkIndex}>
                                            <li><a className="dropdown-item" href={link.url}>{link.name}</a></li>
                                            {linkIndex < dropdown.links.length - 1 && <li><hr className="dropdown-divider" /></li>}
                                        </React.Fragment>
                                    ))}
                                </ul>
                            </li>
                        ))}
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/contact">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;