import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'; // Import the Card component
import '../assets/studentTestimonial.css'; // Custom CSS for additional styling
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import student1 from '../assets/student1.png';
import student2 from '../assets/student2.png';
import student3 from '../assets/student3.png';
import student4 from '../assets/student4.png';
import student5 from '../assets/student5.png';

const testimonials = [

    {
        name: "Mayuri Maroti Mundhe",
        position: "NEET Aspirant",
        image: student2,
        feedback: "I met Sunita Mandelia mam when I was in class 10th. I want to be a doctor. I am learning in PACE institute which is best for neet and engeenering preparation. I am able to pursue my goal because of Sunita Mandelia mam and her team. Sunita mam gave me 100% scholarship. Yasham foundation not only helping in academic s but also in other curriculum activities.Mam I will try my best to achieve my goals."
    },
    {
        name: "Juhi Bait",
        position: "Student",
        image: student3,
        feedback: "I'm currently studying at D.G Ruparel as a science student. I met sunita ma'am even before my college started. I belong from very poor household but had dream of being engineer. I came cross ma'am and yasham foundation through my friend. Sunita ma'am helped me a lot with my studies by providing me coaching class with reduced fees and hence my finances issue were reduced. Therefore I was more encouraged to chase my dream."
    },
    {
        name: "Bhakti Palve",
        position: "JEE Aspirant",
        image: student4,
        feedback: "Currently, I'm studying in Mindsetters. I'm preparing for JEE competitive exam. Getting into this coaching was only possible because of YASHAM FOUNDATION. Because of Yasham, I got into mind setters with a full scholarship. Both Sunita Ma'am and Shubha Ma'am have guided us a lot from studies to personality development. It's been 4 years since I'm with Yasham, like a family. I chose the path, but Yasham gave me wings to fly on that path."
    },
    {
        name: "Nilesh Vijay More",
        position: "PACE Student",
        image: student1,
        feedback: "I am studying in Pace Institute. I am able to study in such a bigInstitute  because of Mrs Sunita Mandelia and Mrs Subha mamand their team and their foundation The Yasham Foundation. Because of them I am able to study in such Institute and I got this opportunity to change my life. I am very thankful to them for giving me such a great opportunity. I will try my best and I will not disappoint them."
    },
    {
        name: "Ankush Mahto",
        position: "JEE Aspirant",
        image: student5,
        feedback: "I am studying in 12th standard. Few years ago when I was in 11th standard I wanted to give jee exam but I need an institute to study well but when I got to know the Institute fees I could not afford it . I could not believe that I can even study in such a big Institute. I am thankful to Sunita ma'am and our Yasham Foundation to get an opportunity to introduce myself."
    }
];

const StudentTestimonials = () => {
    return (
        <div className="team-section">
            <div className="team-section" style={{ textAlign: 'center' }}>
                <h1 style={{ fontWeight: '700' }}>Student Testimonials</h1>
            </div>
            <Card className="p-3 mb-4" style={{ border: 'none', backgroundColor: '#f9f9f9' }}>
                <div className="mt-4 row justify-content-center text-center testimonials-container">
                    {testimonials.map((testimonial, index) => (
                        <div className="col-md-3 mb-4" key={index}>
                            <div className="card testimonial-card h-100">
                                <div className="card-body text-center">
                                    <div className="mb-3">
                                        <img src={testimonial.image} alt={testimonial.name} className="rounded-circle img-fluid" style={{ width: '50px', height: '52px' }} />

                                    </div>
                                    <i className="fas fa-quote-left testimonial-quote-icon" style={{ marginRight: '200px' }}></i>
                                    <p className="card-text" style={{ fontSize: '0.8rem' ,  marginBottom: '0.5rem' }}>{testimonial.feedback}</p>
                                    <p className="card-title" style={{ fontSize: '1rem', marginBottom: '0.1rem' }}>{testimonial.name}</p>
                                    <p className="card-subtitle text-muted" style={{ fontSize: '0.95rem', marginBottom: '0rem' }}>{testimonial.position}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default StudentTestimonials;
