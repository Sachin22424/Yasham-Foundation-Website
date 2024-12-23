import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css"; // Import Font Awesome
import { useNavigate } from 'react-router-dom';
import '../assets/Chat.css'; // Import the custom CSS

const Home = () => {
  const [homeData, setHomeData] = useState(null);
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

  if (!homeData) return <p>Loading...</p>;

  return (
    <>
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={homeData.newSliderImage?.image} className="d-block w-100 carousel-image" alt="Slide" />
          </div>
        </div>
      </div>

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
            <div className="col-md-6 mb-2">
              <div className="card h-100 border-0 d-flex flex-row align-items-center">
                <img src={homeData.mainevent?.image} className="mb-0" alt="Leave a Legacy" style={{ width: homeData.mainevent?.width, height: homeData.mainevent?.height }} />
                <div className="card-body">
                  <h4 className="font-bold">{homeData.mainevent?.name}</h4>
                  <h4 className="text-warning">{homeData.mainevent?.form}</h4>
                  <p className="para">
                    {homeData.mainevent?.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-2">
              <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-inner">
                  {homeData.testimonials?.map((testimonial, index) => (
                    <div
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      key={index}
                    >
                      <div className="testimonial-card text-center p-4 mx-auto">
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
                    <li className="mb-4 event-item" key={index}>
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
                <h2 className="font-bold text-xl mb-4 text-dark" style={{ color: 'black', fontWeight: 'bold' }}>{homeData.upcomingEvent?.name}</h2>
                <iframe
                  src={getEmbeddedUrl(homeData.video?.url)}
                  title={homeData.video?.title}
                  
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ width: '75%', height: '250px' }} // Adjust the height as needed
                ></iframe>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center my-1 join">
        <h2 className="text-4xl font-bold" style={{ color: 'black', fontWeight: 'bold' }}>Become a Volunteer</h2>
        <p className="text-xl mb-9" style={{ color: 'black', fontSize: '1.2rem' }}>Join us for a better life and beautiful future</p>
        <button type="button" className="btn btn-dark mt-1" style={{ fontWeight: 'bold' }} onClick={handleJoinClick}>Join Us Now</button>
      </div>
    </>
  );
};

export default Home;