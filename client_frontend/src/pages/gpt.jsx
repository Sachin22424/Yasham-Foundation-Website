

import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css"; // Import Font Awesome
import slider1 from '../assets/slider1.jpg';
import slider2 from '../assets/slider2.jpg';
import slider3 from '../assets/slider3.jpg';
import storyImage from '../assets/storyImage.jpg';
import eventImage1 from '../assets/eventImage1.jpg';
import eventImage3 from '../assets/eventImage3.jpg';
import student from '../assets/student.png';
import family from '../assets/family.png';
import volunteer from '../assets/volunteer.png';
import woman from '../assets/woman.png';
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
import { useNavigate } from 'react-router-dom';
import '../assets/Chat.css'; // Import the custom CSS

const Home = () => {

  const navigate = useNavigate();

  const handleKnowMoreClick = () => {
    // Define the action to be taken when the button is clicked
    navigate('/about'); // Example: Navigate to the About page
  };

  const handleJoinClick = () => {
    // Define the action to be taken when the button is clicked
    navigate('/support'); // Example: Navigate to the Mission page
  }

  return (
    <>
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={slider3} className="d-block w-100 carousel-image" alt="Slide 1" />
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#f7f8f9', padding: '20px 0' }}>
        <div className="container mx-auto px-6">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
              <h1 className="text-3xl font-bold text-gray-800 " style={{ color: 'black', fontWeight: 'bold' }}>
                Story About<br />
                <span style={{ color: '#ffc107', fontWeight: 'bold' }}>What We Do</span>
              </h1>
              <p className="text-gray-600 mt-4" style={{ color: 'black' , fontSize:'1.2rem' }}>
              Yasham works every single day to empower society holistically, through changes big or small. We work predominantly in the field of education to sharpen young minds and make them a better version of themselves, irrespective of where they come from.
              </p>
              <button type="button" className="btn btn-dark my-2" style={{ fontWeight: 'bold' }} onClick={handleKnowMoreClick}>
        Know More
      </button>
            </div>

            <div className="col-md-1">

            </div>

            <div className="col-md-5">
              <div className="row ">
                <div className="col-md-5 mb-4">
                  <div className="text-center">
                    <img src={student} className="mb-3" alt="Leave a Legacy" style={{ width: '19%', height: 'auto' }} />
                    <h5 className="font-bold">Students and Youth</h5>
                    <p className="para">With over 9000+ students and youth impacted</p>
                  </div>
                </div>
                <div className="col-md-5 mb-4">
                  <div className="text-center">
                    <img src={family} className="mb-3" alt="Make Donation" style={{ width: '16%', height: 'auto' }} />
                    <h5 className="font-bold">Families</h5>
                    <p className="para">With more than 5000+ families assisted.</p>
                  </div>
                </div>
                <div className="col-md-5 mb-4">
                  <div className="text-center">
                    <img src={woman} className="mb-3" alt="Become a Fundraiser" style={{ width: '16%', height: 'auto' }} />
                    <h5 className="font-bold">Become a Fundraiser</h5>
                    <p className="para">Over 3000 women have associated with us.</p>
                  </div>
                </div>
                <div className="col-md-5 mb-4">
                  <div className="text-center">
                    <img src={volunteer} className="mb-3" alt="Become a Volunteer" style={{ width: '16%', height: 'auto' }} />
                    <h5 className="font-bold">Become a Volunteer</h5>
                    <p className="para">
                    Volunteer with us and be part of a mission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="demo-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4 demoevent">
              <img src={eventImage3} className="img-fluid" alt="Story" />
            </div>

            <div className="col-md-6 mb-4 mt-3">
              <div className="p-4 h-100">
                <h1 className="font-bold text-xl mb-3 text-dark" style={{ color: 'black', fontWeight: 'bold' }}>Name of the Event</h1>
                <p className="mb-6 mt-3" style={{ color: 'black', fontSize: '1.2rem' }}>Industry. Lorem Ipsum has been the industry's standard dummy text ever since the, Lorem Ipsum has been the industry's standard dummy. Industry.</p>
                <p className="mb-6 mt-3" style={{ color: 'black', fontSize: '1.2rem' }}>Industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
                <button className="btn btn-warning text-white mt-3" style={{ fontWeight: 'bold' }}>Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="events-section pt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4 cardevent">
              <div className="p-4 h-100">
                <h1 className="font-bold text-xl mb-4 text-dark" style={{ fontWeight: 'bold' }}>Events:</h1>
                <ul className="list-unstyled text-dark">
                  <li className="mb-4 event-item ">
                    <i className="fa fa-calendar mr-2"></i>
                    <span className="event-item-text mx-4">Saathi Haath Badhana</span>
                  </li>
                  <hr className="event-divider" />
                  <li className="mb-4 event-item">
                    <i className="fa fa-calendar mr-2"></i>
                    <span className="event-item-text mx-4">Hum Honge Kaamyab</span>
                  </li>
                  <hr className="event-divider" />
                  <li className="mb-4 event-item">
                    <i className="fa fa-calendar mr-2"></i>
                    <span className="event-item-text mx-4">Swacch English Mission</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-8 mb-4">
              <div className="p-4 h-100">
                <h1 className="font-bold text-xl mb-3 text-dark" style={{ color: 'black', fontWeight: 'bold' }}>Upcoming Events</h1>
                <p className="mb-6 mt-3" style={{ color: 'black', fontSize: '1.2rem' }}>Industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown industry. Lorem Ipsum has been the industry's standard dummy, Lorem Ipsum has been the industry's standard dummy. Industry.</p>

                <button className="btn btn-warning text-white mt-3" style={{ fontWeight: 'bold' }}>Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center my-5 join">
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'black', fontWeight: 'bold' }}>Become a Volunteer</h1>
        <p className="text-xl mb-8" style={{ color: 'black', fontSize: '1.2rem' }}>Join us for a better life and beautiful future</p>
        <button type="button" className="btn btn-light mt-1" style={{ fontWeight: 'bold' }} onClick={handleJoinClick}>Join Us Now</button>
      </div>

      <section className="bg-white video-section py-3 mb-4">
        <div className="row mx-5">
          <div className="col-md-5 mb-6 videoevent">
            <iframe src="https://www.youtube.com/embed/mg9JoVv4w8E" title="video placeholder" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="w-100 h-100"></iframe>
          </div>

          <div className="col-md-7 my-4">
            <div className="p-4 h-100">
            <h1 className="font-bold text-xl mb-3 text-dark text-center" style={{ color: 'black', fontWeight: 'bold' }}>
  Educate.<span style={{ color: '#ffc107', fontWeight: 'bold' }}> Enlighten.</span> Empower.
</h1>
              <p className="mb-6 mt-3 text-center" style={{ color: 'black', fontSize: '1.1rem' }}>To be able to guide and assist the many promising minds is one of the most gratifying feelings that motivates us at Yasham.
                Yasham predominantly works in education to sharpen young minds today so that they might red-pencil the assigned labels.
                To achieve our vision, we actively mediate between a child's aspirations and the acquisition of their goals.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;


