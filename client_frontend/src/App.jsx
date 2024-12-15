import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Chat from "./pages/Chat";
import About from "./pages/About"; // Import About component
import Contact from "./pages/Contact"; // Import Contact component
import Login from "./pages/Login"; // Import Login component
import ContentHome from "./pages/ContentHome"; // Import ContentHome component
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Mission from './pages/mission';
import Support from './pages/support';
import News from './pages/news';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isContentHome = location.pathname === "/contenthome";

  return (
    <>
      {!isLoginPage && !isContentHome && <Navbar />}
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/about" element={<About />} /> {/* Add About route */}
        <Route path="/contact" element={<Contact />} /> {/* Add Contact route */}
        <Route path="/mission" element={<Mission />} /> {/* Add Mission route */}
        <Route path="/support" element={<Support />} /> {/* Add Support route */}
        <Route path="/news" element={<News />} /> {/* Add News route */}
        <Route path="/login" element={<Login />} /> {/* Add Login route */}
        <Route path="/contenthome" element={<ContentHome />} /> {/* Add ContentHome route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!isLoginPage && !isContentHome && <Footer />}
    </>
  );
}

export default App;