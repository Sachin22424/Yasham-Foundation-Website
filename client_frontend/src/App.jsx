import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
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
import ContentTeam from "./pages/ContentTeam"; // Import ContentTeam component
import ContentYcm from "./pages/contentYcm"; // Import ContentYcm component
import ContentShb from "./pages/contentShb"; // Import ContentShb component
import ContentSz from "./pages/contentSz"; // Import ContentSz component
import ContentHhk from "./pages/contentHhk"; // Import ContentHhk component
import ContentSem from "./pages/contentSem"; // Import ContentSem component
import ContentStudentTestimonial from "./pages/ContentStudentTestimonial"; // Import ContentStudentTestimonial component
import ContentMentorTestimonial from "./pages/ContentMentorTestimonial"; // Import ContentMentorTestimonial component
import ContentNews from "./pages/ContentNews"; // Import ContentNews component
import ContentMentorForm from "./pages/ContentMentorForm"; // Import ContentMentorForm component
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
import MentorTestimonial from './pages/mentorTestimonials'; // Import MentorTestimonial component
import YCM from './pages/YCM'; // Import YCM component
import SZ from './pages/SZ'; // Import SZ component
import SHB from './pages/SHB'; // Import SHB component
import SEM from './pages/SEM'; // Import SEM component
import HHK from './pages/HHK'; // Import HHK component
import MentorForm from './pages/MentorForm'; // Import MentorForm component

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isContentPage = location.pathname.startsWith("/content");

  return (
    <AuthProvider>
      {!isLoginPage && !isContentPage && <Navbar />}
      {isContentPage && <NavbarContent />}
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/about" element={<About />} /> {/* Add About route */}
        <Route path="/contact" element={<Contact />} /> {/* Add Contact route */}
        <Route path="/mission" element={<Mission />} /> {/* Add Mission route */}
        <Route path="/support" element={<Support />} /> {/* Add Support route */}
        <Route path="/news" element={<News />} /> {/* Add News route */}
        <Route path="/login" element={<Login />} /> {/* Add Login route */}
        <Route path="/contenthome" element={<PrivateRoute><ContentHome /></PrivateRoute>} /> {/* Add ContentHome route */}
        <Route path="/contentcontact" element={<PrivateRoute><ContentContact /></PrivateRoute>} /> {/* Add ContentContact route */}
        <Route path="/contentabout" element={<PrivateRoute><ContentAbout /></PrivateRoute>} /> {/* Add ContentAbout route */}
        <Route path="/contentsupport" element={<PrivateRoute><ContentSupport /></PrivateRoute>} /> {/* Add ContentSupport route */}
        <Route path="/contentmission" element={<PrivateRoute><ContentMission /></PrivateRoute>} /> {/* Add ContentMission route */}
        <Route path="/contentfeedback" element={<PrivateRoute><ContentFeedback /></PrivateRoute>} /> {/* Add ContentFeedback route */}
        <Route path="/contentteam" element={<PrivateRoute><ContentTeam /></PrivateRoute>} /> {/* Add ContentTeam route */}
        <Route path="/contentycm" element={<PrivateRoute><ContentYcm /></PrivateRoute>} /> {/* Add ContentYcm route */}
        <Route path="/contentshb" element={<PrivateRoute><ContentShb /></PrivateRoute>} /> {/* Add ContentShb route */}
        <Route path="/contentsz" element={<PrivateRoute><ContentSz /></PrivateRoute>} /> {/* Add ContentSz route */}
        <Route path="/contenthhk" element={<PrivateRoute><ContentHhk /></PrivateRoute>} /> {/* Add ContentHhk route */}
        <Route path="/contentsem" element={<PrivateRoute><ContentSem /></PrivateRoute>} /> {/* Add ContentSem route */}
        <Route path="/contentstudenttestimonial" element={<PrivateRoute><ContentStudentTestimonial /></PrivateRoute>} /> {/* Add ContentStudentTestimonial route */}
        <Route path="/contentmentortestimonial" element={<PrivateRoute><ContentMentorTestimonial /></PrivateRoute>} /> {/* Add ContentMentorTestimonial route */}
        <Route path="/contentnews" element={<PrivateRoute><ContentNews /></PrivateRoute>} /> {/* Add ContentNews route */}
        <Route path="/contentmentorform" element={<PrivateRoute><ContentMentorForm /></PrivateRoute>} /> {/* Add ContentMentorForm route */}
        <Route path="/team" element={<Team />} /> {/* Add Team route */}
        <Route path="/studentTestimonial" element={<StudentTestimonial />} /> {/* Add StudentTestimonial route */}
        <Route path="/mentorTestimonial" element={<MentorTestimonial />} /> {/* Add MentorTestimonial route */}
        <Route path="/ycm" element={<YCM />} /> {/* Add YCM route */}
        <Route path="/sz" element={<SZ />} /> {/* Add SZ route */}
        <Route path="/shb" element={<SHB />} /> {/* Add SHB route */}
        <Route path="/sem" element={<SEM />} /> {/* Add SEM route */}
        <Route path="/hhk" element={<HHK />} /> {/* Add HHK route */}
        <Route path="/mentorform" element={<MentorForm />} /> {/* Add MentorForm route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!isLoginPage && !isContentPage && <Footer />}
    </AuthProvider>
  );
}

export default App;