import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css"; // Import Font Awesome
import { useNavigate } from 'react-router-dom';
import '../assets/Chat.css'; // Import the custom CSS
import { Carousel } from 'react-bootstrap';

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get('https://yasham-foundation-website-production.up.railway.app/api/home');
        setHomeData(response.data);
      } catch (error) {
        console.error("Error fetching home data", error);
      }
    };

    fetchHomeData();
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
        {homeData.sliderImages.map((image, index) => (
          <Carousel.Item key={index} interval={3000}>
            <img
              className="d-block w-100 carousel-img"
              src={image}
              alt={`Slide ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div style={{ backgroundColor: '#f7f8f9', padding: '20px 0' }}>
        <div className="container mx-auto px-6">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
              <h1 className="text-3xl font-bold text-gray-800" style={{ fontWeight: 'bold' }}>
                {homeData.story?.title?.map((wordObj, index) => (
                  <span key={index} style={{ color: wordObj.color }}>
                    {wordObj.word}{" "}
                  </span>
                ))}
              </h1>
              <p className="text-gray-600 mt-3" style={{ color: 'black', fontSize: '1.2rem' }}>
                {homeData.story?.description}
              </p>
              <button type="button" className="btn btn-warning mt-3" style={{ fontWeight: 'bold', color: 'white' }} onClick={handleKnowMoreClick}>
                {homeData.story?.button}
              </button>
            </div>

            <div className="col-md-1"></div>

            <div className="col-md-5">
              <div className="row">
                <div className="col-md-6 mb-2">
                  <div className="text-center">
                    <div className="icon-circlesh">
                      <img src={homeData.story?.pointer1image?.url} className="mb-0" alt="Leave a Legacy" style={{ width: homeData.story?.pointer1image?.width, height: homeData.story?.pointer1image?.height }} />
                    </div>
                    <h5 className="font-bold">{homeData.story?.pointer1title}</h5>
                    <p className="para">{homeData.story?.pointer1description}</p>
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="text-center">
                    <div className="icon-circlesh">
                      <img src={homeData.story?.pointer2image?.url} className="mb-0" alt="Make Donation" style={{ width: homeData.story?.pointer2image?.width, height: homeData.story?.pointer2image?.height }} />
                    </div>
                    <h5 className="font-bold">{homeData.story?.pointer2title}</h5>
                    <p className="para">{homeData.story?.pointer2description}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="text-center">
                    <div className="icon-circlesh">
                      <img src={homeData.story?.pointer3image?.url} className="mb-0" alt="Become a Fundraiser" style={{ width: homeData.story?.pointer3image?.width, height: homeData.story?.pointer3image?.height }} />
                    </div>
                    <h5 className="font-bold">{homeData.story?.pointer3title}</h5>
                    <p className="para">{homeData.story?.pointer3description}</p>
                  </div>
                </div>
                <div className="col-md-6">
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
                  src={homeData.ourImpact?.image}
                  className="mb-0"
                  alt="Our Impact"
                  style={{ width: homeData.ourImpact?.width, height: homeData.ourImpact?.height, cursor: 'pointer' }}
                  onClick={() => navigate('/news')}
                />
                <div className="card-body">
                  <h3 className="font-bold" style={{ fontWeight: '700' }}>{homeData.ourImpact?.title1}</h3>
                  <h4 className="text-warning">{homeData.ourImpact?.title2}</h4>
                  <p className="para" style={{ fontSize: '1.1rem' }}>
                    {homeData.ourImpact?.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <h4 className="font-bold mb-4 text-center" style={{ fontWeight: '700' }}>Student Testimonials</h4>
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
                    {selectedInitiative.imageUrl && (
                      <img src={selectedInitiative.imageUrl} alt={selectedInitiative.name} style={{ width: selectedInitiative.imageWidth, height: selectedInitiative.imageHeight }} />
                    )}
                    {selectedInitiative.videoUrl && (
                      <iframe
                        src={getEmbeddedUrl(selectedInitiative.videoUrl)}
                        title={selectedInitiative.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        style={{ width: selectedInitiative.videoWidth, height: selectedInitiative.videoHeight }} // Adjust the height as needed
                      ></iframe>
                    )}
                  </>
                ) : (
                  homeData.events && homeData.events.length > 0 && (
                    <>
                      <h2 className="font-bold text-xl mb-4 text-dark" style={{ color: 'black', fontWeight: 'bold' }}>{homeData.events[0].name}</h2>
                      <p className="para">{homeData.events[0].description}</p>
                      {homeData.events[0].imageUrl && (
                        <img src={homeData.events[0].imageUrl} alt={homeData.events[0].name} style={{ width: homeData.events[0].imageWidth, height: homeData.events[0].imageHeight }} />
                      )}
                      {homeData.events[0].videoUrl && (
                        <iframe
                          src={getEmbeddedUrl(homeData.events[0].videoUrl)}
                          title={homeData.events[0].name}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          style={{ width: homeData.events[0].videoWidth, height: homeData.events[0].videoHeight }} // Adjust the height as needed
                        ></iframe>
                      )}
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row justify-content-center align-items-center mt-2 mb-2">
          {homeData.mainevent?.map((event, index) => (
            <div className="col-md-6 mt-2 mb-2" key={index}>
              <div className="card h-100 border-0 d-flex flex-row align-items-center">
                <img
                  src={event.image}
                  className="mb-0"
                  alt={event.name}
                  style={{ width: event.width, height: event.height }}
                 
                />
                <div className="card-body">
                  <h3 className="font-bold" style={{ fontWeight: '700' }}>{event.name}</h3>
                  <h4 className="text-warning">{event.form}</h4>
                  <p className="para" style={{ fontSize: '1.1rem' }}>
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;