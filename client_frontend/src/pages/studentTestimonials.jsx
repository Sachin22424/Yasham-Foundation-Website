import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/studentTestimonial.css'; // Custom CSS for additional styling

const testimonials = [
    {
        name: "Jessica Doe",
        position: "Manager, Company",
        image: "path/to/jessica-image.jpg",
        feedback: "Praesent volutpat diam lacus, fringilla orci vitae, hendrerit odio. Aenean venenatis, mauris et suscipit venenatis, augue lectus gravida dui, eget commodo mauris ex non risus."
    },
    {
        name: "John Doe",
        position: "Manager, Company",
        image: "path/to/john-image.jpg",
        feedback: "Praesent volutpat diam lacus, fringilla orci vitae, hendrerit odio. Aenean venenatis, mauris et suscipit venenatis, augue lectus gravida dui, eget commodo mauris ex non risus."
    },
    {
        name: "David Doe",
        position: "Manager, Company",
        image: "path/to/david-image.jpg",
        feedback: "Praesent volutpat diam lacus, fringilla orci vitae, hendrerit odio. Aenean venenatis, mauris et suscipit venenatis, augue lectus gravida dui, eget commodo mauris ex non risus."
    },
    {
        name: "Lana Steiner",
        position: "Manager, Company",
        image: "path/to/lana-image.jpg",
        feedback: "Praesent volutpat diam lacus, fringilla orci vitae, hendrerit odio. Aenean venenatis, mauris et suscipit venenatis, augue lectus gravida dui, eget commodo mauris ex non risus."
    },
    {
        name: "Emily Donnavan",
        position: "Manager, Company",
        image: "path/to/emily-image.jpg",
        feedback: "Praesent volutpat diam lacus, fringilla orci vitae, hendrerit odio. Aenean venenatis, mauris et suscipit venenatis, augue lectus gravida dui, eget commodo mauris ex non risus."
    },
    {
        name: "Sasha Kindred",
        position: "Manager, Company",
        image: "path/to/sasha-image.jpg",
        feedback: "Praesent volutpat diam lacus, fringilla orci vitae, hendrerit odio. Aenean venenatis, mauris et suscipit venenatis, augue lectus gravida dui, eget commodo mauris ex non risus."
    }
];

const StudentTestimonials = () => {
    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1>Student Testimonials</h1>
                <p>Welcome to the student testimonials page. Here you will find feedback from our students.</p>
            </div>
            <div className="row justify-content-center text-center testimonials-container">
                {testimonials.map((testimonial, index) => (
                    <div className="col-md-3 mb-4" key={index}>
                        <div className="card testimonial-card h-100">
                            <div className="card-body text-center">
                                <div className="mb-3">
                                    <img src={testimonial.image} alt={testimonial.name} className="rounded-circle img-fluid" />
                                </div>
                                <p className="card-text">{testimonial.feedback}</p>
                                <h5 className="card-title">{testimonial.name}</h5>
                                <p className="card-subtitle text-muted">{testimonial.position}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentTestimonials;
