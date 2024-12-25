import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../assets/Team.css';  // Ensure you create and include your custom CSS'
import founder from '../assets/Founder.png';

const founderMembers = [
    {
        name: "Sunita Mandelia",
        position: "Alumna",
        image: founder,
        description: "An alumna of The J.B. Petit High School, is a gold medallist Honours student in Psychology from St. Xavier's College, Mumbai. Encompassing numerous roles from a drama artist, a singer, a dancer, a creative writer and a poet, Rotarian Ms. Mandelia is a die-hard patriot and pro-educationist who passionately and actively works at grassroots levels to empower and create holistic societal change. As an active member of many social and charitable organizations working on medical and educational projects, Ms.'s diverse set of talents and dedication to social causes make her a well-rounded and socially responsible individual who actively contributes to the community. Her successes include her book of poetries' Bhanwar' published by Write Place Publications, an initiative by Crossword Bookstores Limited."
    },
    {
        name: "Smita Kaushal",
        position: "Accountant and Lawyer",
        image: "path/to/orlando-image.jpg",
        description: "As a chartered accountant and lawyer, Smita Kausal is a highly qualified professional with a background in both finance and law, and she contributes her expertise to various multinational organizations. She has extensive experience in the social sector through her involvement with several not-for-profit organizations in Mumbai. Ms. Kausal's combination of financial and legal expertise, along with her commitment to the social sector, makes her a professional who excels in her career and actively contributes to the community through her involvement in not-for-profit initiatives in Mumbai."
    },
    {
        name: "Shilpa Bhagat",
        position: "Lead Coordinator",
        image: "path/to/sophie-image.jpg",
        description: "Ms Bhagat is a qualified management graduate who has previously worked with HDFC Bank. She is Mrs India World 2013. She is involved with several not-for-profit organizations working in the areas of education and cancer relief."
    },
];

const supportMembers = [
    {
        name: "Jaya Rajdev",
        position: "Educator and Counsellor",
        image: "path/to/lana-image.jpg",
        description: "A counsellor, author, and educator with a passion for personal growth and community service. With over 8 years in Learning and Development and a corporate background spanning 12 years, Jaya specializes in equipping individuals and organizations with essential life skills and emotional intelligence. Holding a Master's Degree in Human Development and a Postgraduate Diploma in Counseling Skills, her expertise is grounded in theoretical knowledge and practical experience. As the co-author of Celebrating Relationships, she has mentored aspiring writers through innovative programs like the Coaching Circle. Beyond her professional roles, Jaya is dedicated to community engagement, actively contributing to NGOs to build sustainable communities. She finds solace in the arts, indulging in practices like painting Dot Mandalas and pottery, while her love for literature and travel enriches her counseling approach. Connect with Jaya today to embark on a journey of growth and transformation."
    },
    {
        name: "Subhashini Harikrishnan",
        position: "Philanthropist",
        image: "path/to/emily-image.jpg",
        description: "Subhashini Harikrishnan is an philanthropist, Partner in Blue Lotus capital Fund and Project Head in Yasham foundation for the Hum Honge Kamyab project. She has done her graduation in Engineering and Masters in Business Administration. Her patriotism towards nation has made her to join Yasham to guide every student in their social and academic growth. Her passion towards science made her to do a extensive research on quantum physics which in turn helped her in her spiritual evolution.She strives to bring her nation forward through education and build a co operative community."
    },
    {
        name: "Geeta Vora",
        position: "Career Counsellor",
        image: "path/to/sasha-image.jpg",
        description: "A career counsellor with a wide experience of work in logistics, production, computers and construction. Worked in corporates like Gati, LnT, Infosys and Devansh. 1.5 years of working in US as a programmer for Capital One. Started an educational setup in 2011 with an intent to make Math and Science fun for young kids via multiple classes. Have taken additional certifications in career counselling, psychology and emotional therapies from various platforms over the years. Also working with an NGO Yasham to reach out career counselling benefits to financially weaker societies and schools in Mumbai"
    },
];

const Team = () => {
    const [show, setShow] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (member) => {
        setSelectedMember(member);
        setShow(true);
    };

    return (
        
        <div className="team-section">
            <div className="team-section" style={{ textAlign: 'center' }}>
                <h1 style={{ fontWeight: '700'}}>Our Team</h1>
            </div>
            
            <h2 style={{ fontWeight: '700' , marginTop:'20px', marginLeft: '5px', color: '#ffc107'}}>Founding Team</h2>
            
            <div className="team-grid mt-4" style={{ textAlign: 'center'}}>
                {founderMembers.map((member, index) => (
                    <div key={index} className="team-member" onClick={() => handleShow(member)}>
                        <img src={member.image} alt={member.name} className="member-image" />
                        <div className="member-info">
                            <h3>{member.name}</h3>
                            <p>{member.position}</p>
                        </div>
                    </div>
                ))}
            </div>

            <h2 style={{ fontWeight: '700' , marginTop:'20px', marginLeft: '5px', color: '#ffc107'}}>Supporting Team</h2>

            <div className="team-grid mt-4" style={{ textAlign: 'center'}}>
                {supportMembers.map((member, index) => (
                    <div key={index} className="team-member" onClick={() => handleShow(member)}>
                        <img src={member.image} alt={member.name} className="member-image" />
                        <div className="member-info">
                            <h3>{member.name}</h3>
                            <p>{member.position}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedMember?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={selectedMember?.image} alt={selectedMember?.name} className="modal-image" />
                    <p>{selectedMember?.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Team;
