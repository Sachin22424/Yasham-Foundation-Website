import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css"; // Import Font Awesome
import { useNavigate } from 'react-router-dom';
import '../assets/Chat.css'; // Import the custom CSS
import newsImage from '../assets/news.png';
import { Carousel } from 'react-bootstrap';
import sliderImage1 from '../assets/SI1.jpg';
import sliderImage2 from '../assets/SI4.jpg';
import sliderImage4 from '../assets/SI3.jpg';

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeData = async (url) => {
      try {
        const response = await axios.get(url);
        setHomeData(response.data);
      } catch (error) {
        console.error("Error fetching home data", error);
      }
    };

    const localUrl = 'http://localhost:5000/api/home';
    const deployedUrl = 'https://yasham-foundation-website.onrender.com/api/home';

    // Try fetching from the deployed URL first, then fallback to local URL
    fetchHomeData(deployedUrl).catch(() => fetchHomeData(localUrl));
  }, []);

  const handleKnowMoreClick = () => {
    navigate('/about'); // Example: Navigate to the About page
  };

  const handleJoinClick = () => {
    navigate('/contact'); // Example: Navigate to the Mission page
  };

  const getEmbeddedUrl = (url) => {
    if (url.includes('embed')) {
      return url;
    }
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleInitiativeClick = (initiative) => {
    setSelectedInitiative(initiative);
  };

  if (!homeData) return <p>Loading...</p>;

  return (
    <>
      <Carousel>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100 carousel-img"
            src={sliderImage1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100 carousel-img"
            src={sliderImage2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100 carousel-img"
            src={sliderImage4}
            alt="Fourth slide"
          />
        </Carousel.Item>
      </Carousel>

      <div style={{ backgroundColor: '#f7f8f9', padding: '20px 0' }}>
        <div className="container mx-auto px-6">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
              <h1 className="text-3xl font-bold text-gray-800 " style={{ color: 'black', fontWeight: 'bold' }}>
                {homeData.story?.title}
              </h1>
              <p className="text-gray-600 mt-3" style={{ color: 'black', fontSize: '1.2rem' }}>
                {homeData.story?.description}
              </p>
              <button type="button" className="btn btn-dark mt-3" style={{ fontWeight: 'bold' }} onClick={handleKnowMoreClick}>
                {homeData.story?.button}
              </button>
            </div>

            <div className="col-md-1"></div>

            <div className="col-md-5">
              <div className="row">
                <div className="col-md-5 mb-2">
                  <div className="text-center">
                    <div className="icon-circlesh">
                      <img src={homeData.story?.pointer1image?.url} className="mb-0" alt="Leave a Legacy" style={{ width: homeData.story?.pointer1image?.width, height: homeData.story?.pointer1image?.height }} />
                    </div>
                    <h5 className="font-bold">{homeData.story?.pointer1title}</h5>
                    <p className="para">{homeData.story?.pointer1description}</p>
                  </div>
                </div>
                <div className="col-md-5 mb-2">
                  <div className="text-center">
                    <div className="icon-circlesh">
                      <img src={homeData.story?.pointer2image?.url} className="mb-0" alt="Make Donation" style={{ width: homeData.story?.pointer2image?.width, height: homeData.story?.pointer2image?.height }} />
                    </div>
                    <h5 className="font-bold">{homeData.story?.pointer2title}</h5>
                    <p className="para">{homeData.story?.pointer2description}</p>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="text-center">
                    <div className="icon-circlesh">
                      <img src={homeData.story?.pointer3image?.url} className="mb-0" alt="Become a Fundraiser" style={{ width: homeData.story?.pointer3image?.width, height: homeData.story?.pointer3image?.height }} />
                    </div>
                    <h5 className="font-bold">{homeData.story?.pointer3title}</h5>
                    <p className="para">{homeData.story?.pointer3description}</p>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="text-center">
                    <div className="icon-circlesh">
                      <img src={homeData.story?.pointer4image?.url} className="mb-0" alt="Become a Volunteer" style={{ width: homeData.story?.pointer4image?.width, height: homeData.story?.pointer4image?.height }} />
                    </div>
                    <h5 className="font-bold">{homeData.story?.pointer4title}</h5>
                    <p className="para">
                      {homeData.story?.pointer4description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <section className="demo-section py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-7 mb-2" >
              <div className="card h-100 border-0 d-flex flex-row align-items-center" >
              <img
                  src={newsImage}
                  className="mb-0"
                  alt="Leave a Legacy"
                  style={{ width: homeData.mainevent?.width, height: homeData.mainevent?.height, cursor: 'pointer' }}
                  onClick={() => navigate('/news')}
                />
                <div className="card-body">
                  <h3 className="font-bold" style = {{fontWeight: '700'}}>Our Impact</h3>
                  <h3 className="text-warning">For Students</h3>
                  <p className="para" style={{ fontSize: '1.1rem' }}>
                  The pandemic has made it hard for many students to continue their education, especially those preparing for JEE and NEET exams. However, numerous NGOs and initiatives have risen to help these students by providing them with study materials, mentorship, and financial support to keep their dreams alive.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-5">
            <h4 className="font-bold mb-4" style={{ marginLeft: '180px',  fontWeight: '700'  }}>Testimonials</h4>
              <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-inner">
                  {homeData.testimonials?.map((testimonial, index) => (
                    <div
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      key={index}
                    >
                      <div
                        className="testimonial-card text-center p-4 mx-auto"
                        onClick={() => navigate('/studentTestimonial')}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="testimonial-header mb-3">
                          <span className="icon-quote text-warning">“</span>
                          <h5 className="mb-1">{testimonial.name}</h5>
                          <span className="text-muted">{testimonial.role}</span>
                        </div>
                        <p className="testimonial-text">{testimonial.quote}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Controls */}
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#testimonialCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#testimonialCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="events-section pt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-5 mb-4 cardevent">
              <div className="p-4 h-100">
                <h2 className="font-bold text-xl mb-4 text-dark" style={{ fontWeight: 'bold' }}>Our Initiatives:</h2>
                <ul className="list-unstyled text-dark">
                  {homeData.events?.map((event, index) => (
                    <li className="mb-4 event-item" key={index} onClick={() => handleInitiativeClick(event)}>
                      <i className="fa fa-calendar mr-2"></i>
                      <span className="event-item-text mx-4">{event.name}</span>
                      <hr className="event-divider" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-md-7 mb-4">
              <div className="p-4 h-100">
                {selectedInitiative ? (
                  <>
                    <h2 className="font-bold text-xl mb-4 text-dark" style={{ color: 'black', fontWeight: 'bold' }}>{selectedInitiative.name}</h2>
                    <p className="para">{selectedInitiative.description}</p>
                  </>
                ) : (
                  <>
                    <h2 className="font-bold text-xl mb-4 text-dark" style={{ color: 'black', fontWeight: 'bold' }}>{homeData.upcomingEvent?.name}</h2>
                    <iframe
                      src={getEmbeddedUrl(homeData.video?.url)}
                      title={homeData.video?.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ width: '75%', height: '250px' }} // Adjust the height as needed
                    ></iframe>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="text-center my-1 join">
        <h2 className="text-4xl font-bold" style={{ color: 'black', fontWeight: 'bold' }}>Become a Volunteer</h2>
        <p className="text-xl mb-9" style={{ color: 'black', fontSize: '1.2rem' }}>Join us for a better life and beautiful future</p>
        <button type="button" className="btn btn-dark mt-1" style={{ fontWeight: 'bold' }} onClick={handleJoinClick}>Join Us Now</button>
      </div> */}
      
      <div className="col-md-6 mt-2 mb-2" style = {{marginLeft:'300px'}}>
              <div className="card h-100 border-0 d-flex flex-row align-items-center" >
              <img
                  src={homeData.mainevent?.image}
                  className="mb-0"
                  alt="Leave a Legacy"
                  style={{ width: homeData.mainevent?.width, height: homeData.mainevent?.height, cursor: 'pointer' }}
                 
                />
                <div className="card-body">
                  <h3 className="font-bold" style = {{fontWeight: '700'}}>{homeData.mainevent?.name}</h3>
                  <h3 className="text-warning">For Students</h3>
                  <p className="para" style={{ fontSize: '1.1rem' }}>
                  {homeData.mainevent?.description}
                  </p>
                </div>
              </div>
            </div>

    </>
  );
};

export default Home;