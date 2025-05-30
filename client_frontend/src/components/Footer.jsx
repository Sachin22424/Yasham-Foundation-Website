import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/Footer.css';
import insta from '../assets/img_instagram.svg';
import fb from '../assets/fb.png';
import linkedin from '../assets/linkedin.png';
import mail from '../assets/img_email_white_a700.svg';
import call from '../assets/img_call.svg';

function Footer() {
    const [contactInfo, setContactInfo] = useState({
        mail: '',
        number: '',
        linkedin: '',
        facebook: '',
        instagram: ''
    });
    const [showDesigner, setShowDesigner] = useState(false);

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const deployedUrl = `${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/contact`;
                const localUrl = 'http://localhost:5000/api/contact';
                const response = await axios.get(deployedUrl);
                setContactInfo(response.data);
            } catch (error) {
                console.error('Error fetching contact info from deployed URL, trying local URL:', error);
                try {
                    const response = await axios.get('http://localhost:5000/api/contact');
                    setContactInfo(response.data);
                } catch (localError) {
                    console.error('Error fetching contact info from local URL:', localError);
                }
            }
        };

        fetchContactInfo();
    }, []);

    const handleDoubleClick = () => {
        setShowDesigner(!showDesigner);
    };

    return (
        <footer className="footer mt-auto py-3 bg-custom text-white" onDoubleClick={handleDoubleClick}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="d-flex justify-content-center mt-3">
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="d-flex justify-content-center">
                            <a href={`mailto:${contactInfo.mail}`} target="_blank" className="mr-3 mx-4" rel="noopener noreferrer">
                                <div className="icon-circle">
                                    <img src={mail} alt="email icon" className="footer-icon" />
                                </div>
                            </a>
                            <a href={contactInfo.instagram} target="_blank" className="mr-3 mx-4" rel="noopener noreferrer">
                                <div className="icon-circle">
                                    <img src={insta} alt="instagram icon" className="footer-icon" />
                                </div>
                            </a>
                            <a href={contactInfo.facebook} target="_blank" className="mr-3 mx-4" rel="noopener noreferrer">
                                <div className="icon-circle">
                                    <img src={fb} alt="facebook icon" className="footer-icon" />
                                </div>
                            </a>
                            <a href={contactInfo.linkedin} target="_blank" className="mr-3 mx-4" rel="noopener noreferrer">
                                <div className="icon-circle">
                                    <img src={linkedin} alt="linkedin icon" className="footer-icon" />
                                </div>
                            </a>
                        </div>
                        {showDesigner && (
                            <div className="designer-text mt-3">
                                Designed by Sachin Maurya<br />
                                <a href="mailto:sachin22424@iiitd.ac.in" style={{ fontSize: '0.95em', color: 'inherit', textDecoration: 'underline' }}>
                                    sachin22424@iiitd.ac.in
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;