import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Chat from "./pages/Chat";
import About from "./pages/About"; // Import About component
import Contact from "./pages/Contact"; // Import Contact component
import Login from "./pages/Login"; // Import Login component
import ContentHome from "./pages/ContentHome"; // Import ContentHome component
import ContentContact from "./pages/ContentContact"; // Import ContentContact component
import ContentAbout from "./pages/ContentAbout"; // Import ContentAbout component
import ContentSupport from "./pages/ContentSupport"; // Import ContentSupport component
import ContentMission from "./pages/ContentMission"; // Import ContentMission component
import ContentFeedback from "./pages/ContentFeedback"; // Import ContentFeedback component
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar";
import NavbarContent from "./components/NavbarContent";
import Footer from "./components/Footer";
import Mission from './pages/mission';
import Support from './pages/support';
import News from './pages/news';
import Team from './pages/Team'; // Import Team component
import StudentTestimonial from './pages/studentTestimonials'; // Import StudentTestimonial component

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isContentHome = location.pathname === "/contenthome";
  const isContentContact = location.pathname === "/contentcontact";
  const isContentAbout = location.pathname === "/contentabout";
  const isContentSupport = location.pathname === "/contentsupport";
  const isContentMission = location.pathname === "/contentmission";
  const isContentFeedback = location.pathname === "/contentfeedback";

  return (
    <>
      {!isLoginPage && !isContentHome && !isContentContact && !isContentAbout && !isContentSupport && !isContentMission && !isContentFeedback && <Navbar />}
      {(isContentHome || isContentContact || isContentAbout || isContentSupport || isContentMission || isContentFeedback) && <NavbarContent />}
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/about" element={<About />} /> {/* Add About route */}
        <Route path="/contact" element={<Contact />} /> {/* Add Contact route */}
        <Route path="/mission" element={<Mission />} /> {/* Add Mission route */}
        <Route path="/support" element={<Support />} /> {/* Add Support route */}
        <Route path="/news" element={<News />} /> {/* Add News route */}
        <Route path="/login" element={<Login />} /> {/* Add Login route */}
        <Route path="/contenthome" element={<ContentHome />} /> {/* Add ContentHome route */}
        <Route path="/contentcontact" element={<ContentContact />} /> {/* Add ContentContact route */}
        <Route path="/contentabout" element={<ContentAbout />} /> {/* Add ContentAbout route */}
        <Route path="/contentsupport" element={<ContentSupport />} /> {/* Add ContentSupport route */}
        <Route path="/contentmission" element={<ContentMission />} /> {/* Add ContentMission route */}
        <Route path="/contentfeedback" element={<ContentFeedback />} /> {/* Add ContentFeedback route */}
        <Route path="/team" element={<Team />} /> {/* Add Team route */}
        <Route path="/studentTestimonial" element={<StudentTestimonial />} /> {/* Add StudentTestimonial route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!isLoginPage && !isContentHome && !isContentContact && !isContentAbout && !isContentSupport && !isContentMission && !isContentFeedback && <Footer />}
    </>
  );
}

export default App;