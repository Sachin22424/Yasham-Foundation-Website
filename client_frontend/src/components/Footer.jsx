import React, { useContext } from 'react';
import '../assets/Footer.css';
import insta from '../assets/img_instagram.svg';
import git from '../assets/github.png';
import linkedin from '../assets/linkedin.png';
import mail from '../assets/img_email_white_a700.svg';
import call from '../assets/img_call.svg';
import { AuthContext } from "../context/AuthContext";

function Footer() {
    const { user } = useContext(AuthContext);

    if (user) {
        return null;
    }

    return (
        <footer className="footer mt-auto py-4 bg-dark text-white">
            <div className="container my-3">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <h4>Contacts</h4>
                        <div className="d-flex align-items-center mb-3">
                            <a href="tel:+91-9817545817">
                                <img src={call} alt="phone icon" className="mr-2" />
                            </a>
                            <p className="mb-0 mx-1">+91-9817545817</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <a href="mailto:sachin22424@iiitd.ac.in">
                                <img src={mail} alt="email icon" className="mr-2" />
                            </a>
                            <p className="mb-0 mx-2">sachin22424@iiitd.ac.in</p>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h4>Social Media</h4>
                        <div className="d-flex">
                            <a href="https://github.com/Sachin22424" target="_blank" className="mr-3 mx-2">
                                <img src={git} alt="github icon" className="footer-icon" />
                            </a>
                            <a href="https://www.linkedin.com/in/sachin-maurya-9028b4271/" target="_blank" className="mr-3 mx-3">
                                <img src={linkedin} alt="linkedin icon" className="footer-icon" />
                            </a>
                            <a href="https://www.instagram.com/sa.chin_1708/" target="_blank" className="mr-3 mx-2">
                                <img src={insta} alt="instagram icon" className="footer-icon" />
                            </a>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h4>Navigation Links</h4>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white">Home</a></li>
                            <li><a href="/about" className="text-white">About</a></li>
                            <li><a href="/contact" className="text-white">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p>Copyright © 2024 The Dot Store. All Rights Reserved</p>
                </div>
                <div className="text-center mt-4">
                    <p>Designed and Developed by Sachin Maurya<br />
                        3rd Year, B.Tech, Computer Science and Bioscience,<br />
                        Indraprastha Institute of Information Technology Delhi</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
