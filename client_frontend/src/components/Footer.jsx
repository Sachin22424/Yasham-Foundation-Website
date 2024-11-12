import React from 'react';
import '../assets/Footer.css';
import insta from '../assets/img_instagram.svg';
import fb from '../assets/fb.png';
import linkedin from '../assets/linkedin.png';
import mail from '../assets/img_email_white_a700.svg';
import call from '../assets/img_call.svg';

function Footer() {
    return (
        <footer className="footer mt-auto py-3 bg-custom text-white">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h4 className="d-flex justify-content-center">Contacts</h4>
                        <div className="d-flex justify-content-center mb-3">
                            <a href="tel:+91-9817545817">
                                <img src={call} alt="phone icon" className="mr-2" />
                            </a>
                            <p className="mb-0 mx-1">+91-9820373390</p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <a href="mailto:yashamfoundation@gmail.com">
                                <img src={mail} alt="email icon" className="mr-2" />
                            </a>
                            <p className="mb-0 mx-2">yashamfoundation@gmail.com</p>
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <h4>Social Media</h4>
                        <div className="d-flex justify-content-center">
                            <a href="https://www.instagram.com/yasham_foundation/" target="_blank" className="mr-3 mx-2">
                                <img src={insta} alt="instagram icon" className="footer-icon" />
                            </a>
                            <a href="https://www.facebook.com/100069949045484/posts/104813755189149/" target="_blank" className="mr-3 mx-2">
                                <img src={fb} alt="github icon" className="footer-icon" />
                            </a>
                            <a href="https://www.linkedin.com/company/yasham-foundation/" target="_blank" className="mr-3 mx-3">
                                <img src={linkedin} alt="linkedin icon" className="footer-icon" />
                            </a>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h4>Navigation Links</h4>
                        <ul className="list-unstyled">
                            <li><a href="#" className="nav-link">Home</a></li>
                            <li><a href="/contact" className="nav-link">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
