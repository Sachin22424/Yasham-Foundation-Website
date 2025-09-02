import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Carousel, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/international.css";

const International = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/international`
        );

        if (response.data && response.data.length > 0) {
          setSections(response.data);
        } else {
          setError("No data found.");
          setSections([]);
        }
      } catch (err) {
        console.error("Error fetching international data:", err);
        setError("Failed to fetch data.");
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div style={{ textAlign: "center", marginTop: 40 }}>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!sections || sections.length === 0) return <div>No data available.</div>;

  const intro = sections[0];
  const contentSections = sections.slice(1);

  // ensure any inline heights are cleared after images load
  const handleImgLoad = (e) => {
    try {
      const carouselInner = e.target.closest(".carousel-inner");
      if (carouselInner) carouselInner.style.height = "auto";
      const carouselItem = e.target.closest(".carousel-item");
      if (carouselItem) carouselItem.style.height = "auto";
    } catch (err) { /* ignore */ }
  };

  return (
    <Container className="international-container my-4">
      {/* Intro */}
      <Card className="international-card">
        <Card.Body>
          <h1
            className="page-title text-center"
            style={{
              // color: "#555",
              fontSize: "calc(2rem + 2vw)",
              fontWeight: 700,
              lineHeight: 1.4,
              marginBottom: "0.5rem",
            }}
          >
            {intro.title}
          </h1>

          {intro.description && (
            <p
              className="text-center"
              style={{
                // color: "#666",
                fontSize: "1.1rem",
                lineHeight: 1.4,
                maxWidth: "900px",
                margin: "0 auto",
                marginBottom: 0,
              }}
            >
              {intro.description}
            </p>
          )}
        </Card.Body>
      </Card>

      {/* Sections */}
      {contentSections.map((section, idx) => (
        <Card key={idx} className="international-card">
          <Card.Body>
            <h2
              style={{
                color: "#333",
                fontSize: "calc(1.25rem + 1vw)",
                fontWeight: 700,
                lineHeight: 1.6,
              }}
            >
              {section.title}
            </h2>

            {section.description && (
              <p style={{ color: "#333", fontSize: "1.05rem", lineHeight: 1.6, marginTop: "0.5rem" }}>
                {section.description}
              </p>
            )}

            {/* Images */}
            {section.images?.length > 0 &&
              (section.images.length > 1 ? (
                <Carousel
                  className="my-3"
                  indicators={section.images.length > 1}
                  controls={section.images.length > 1}
                >
                  {section.images.map((img, i) => (
                    <Carousel.Item key={i}>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img
                          src={img.url}
                          alt={img.caption || ""}
                          className="international-img"
                          onLoad={handleImgLoad}
                          onError={handleImgLoad}
                        />
                      </div>
                      {img.caption && (
                        <Carousel.Caption>
                          <p>{img.caption}</p>
                        </Carousel.Caption>
                      )}
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                  <img
                    src={section.images[0].url}
                    alt={section.images[0].caption || ""}
                    className="international-img"
                    onLoad={handleImgLoad}
                    onError={handleImgLoad}
                  />
                </div>
              ))}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default International;
