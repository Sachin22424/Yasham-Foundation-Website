import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
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
import International from "./pages/International";
import contentInternational from "./pages/ContentInternational"; // Import ContentShb component
import ContentInternational from './pages/ContentInternational';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

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
        <Route path="/contenthome" element={<ProtectedRoute><ContentHome /></ProtectedRoute>} /> {/* Add ContentHome route */}
        <Route path="/contentcontact" element={<ProtectedRoute><ContentContact /></ProtectedRoute>} /> {/* Add ContentContact route */}
        <Route path="/contentabout" element={<ProtectedRoute><ContentAbout /></ProtectedRoute>} /> {/* Add ContentAbout route */}
        <Route path="/contentsupport" element={<ProtectedRoute><ContentSupport /></ProtectedRoute>} /> {/* Add ContentSupport route */}
        <Route path="/contentmission" element={<ProtectedRoute><ContentMission /></ProtectedRoute>} /> {/* Add ContentMission route */}
        <Route path="/contentfeedback" element={<ProtectedRoute><ContentFeedback /></ProtectedRoute>} /> {/* Add ContentFeedback route */}
        <Route path="/contentteam" element={<ProtectedRoute><ContentTeam /></ProtectedRoute>} /> {/* Add ContentTeam route */}
        <Route path="/contentycm" element={<ProtectedRoute><ContentYcm /></ProtectedRoute>} /> {/* Add ContentYcm route */}
        <Route path="/contentshb" element={<ProtectedRoute><ContentShb /></ProtectedRoute>} /> {/* Add ContentShb route */}
        <Route path="/contentsz" element={<ProtectedRoute><ContentSz /></ProtectedRoute>} /> {/* Add ContentSz route */}
        <Route path="/contentInternational" element={<ProtectedRoute><ContentInternational /></ProtectedRoute>} /> {/* Add ContentInternational route */}
        <Route path="/contenthhk" element={<ProtectedRoute><ContentHhk /></ProtectedRoute>} /> {/* Add ContentHhk route */}
        <Route path="/contentsem" element={<ProtectedRoute><ContentSem /></ProtectedRoute>} /> {/* Add ContentSem route */}
        <Route path="/contentstudenttestimonial" element={<ProtectedRoute><ContentStudentTestimonial /></ProtectedRoute>} /> {/* Add ContentStudentTestimonial route */}
        <Route path="/contentmentortestimonial" element={<ProtectedRoute><ContentMentorTestimonial /></ProtectedRoute>} /> {/* Add ContentMentorTestimonial route */}
        <Route path="/contentnews" element={<ProtectedRoute><ContentNews /></ProtectedRoute>} /> {/* Add ContentNews route */}
        <Route path="/contentmentorform" element={<ProtectedRoute><ContentMentorForm /></ProtectedRoute>} /> {/* Add ContentMentorForm route */}
        <Route path="/team" element={<Team />} /> {/* Add Team route */}
        <Route path="/studentTestimonial" element={<StudentTestimonial />} /> {/* Add StudentTestimonial route */}
        <Route path="/mentorTestimonial" element={<MentorTestimonial />} /> {/* Add MentorTestimonial route */}
        <Route path="/ycm" element={<YCM />} /> {/* Add YCM route */}
        <Route path="/sz" element={<SZ />} /> {/* Add SZ route */}
        <Route path="/shb" element={<SHB />} /> {/* Add SHB route */}
        <Route path="/sem" element={<SEM />} /> {/* Add SEM route */}
        <Route path="/hhk" element={<HHK />} /> {/* Add HHK route */}
        <Route path="/mentorform" element={<MentorForm />} /> {/* Add MentorForm route */}
        <Route path="/international" element={<International />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!isLoginPage && !isContentPage && <Footer />}
    </AuthProvider>
  );
}

export default App;