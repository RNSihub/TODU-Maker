import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Use Dashboard component
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword"; // Fixed import path
import Sidebar from "./components/navbar";
import RNSLoadingSpinner from "./components/loading";
import Attendance from "./pages/attendance"; // Updated import to PascalCase
import TodoListApp from "./pages/todo"; // Updated import to PascalCase
import ProjectConversationApp from "./pages/Projects";
import ChatBot from "./pages/AI/Chatbot"; // Updated import to PascalCase
import ContentGenerator from "./pages/AI/ContentGene"; // Updated import to PascalCase
import TextToSpeech from "./pages/TextTools/TTS"; // Updated import to PascalCase
import SpeechToText from "./pages/TextTools/STT"; // Updated import to PascalCase
import DailScrumReportCreator from "./pages/Report/mom";
import DailyScruReportCreator from "./pages/Report/daily-report";
import MailDrafter from "./pages/Report/mail";
import DailyReportSubmission from "./pages/Report/Report_Sheet"; // Updated import to PascalCase
const App = () => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      {/* Conditionally render Sidebar only when user is logged in */}
      {user && <Sidebar user={user} onLogout={handleLogout} />}

      <div className={`transition-all duration-300 ${user ? 'pl-20 md:pl-64' : 'pl-0'}`}>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
          <Route path="/createaccount" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/attendance" element={<Attendance />} /> {/* Updated Route */}
          <Route path="/todo" element={<TodoListApp />} /> {/* Updated Route */}
          <Route path="/projects" element={<ProjectConversationApp />} /> {/* Updated Route */}
          <Route path="/chatbot" element={<ChatBot />}/>
          <Route path="/content-generation" element={<ContentGenerator />}/>
          <Route path="/text-to-speech" element={<TextToSpeech />}/>
          <Route path="/speech-to-text" element={<SpeechToText />}/>
          <Route path="/daily-scrum-report" element={<DailScrumReportCreator />}/>
          <Route path="/daily-report" element={<DailyScruReportCreator />}/>
          <Route path="/mail" element={<MailDrafter />}/>
          <Route path="/daily-report-submission" element={<DailyReportSubmission />}/>

        </Routes>
      </div>
    </Router>
  );
};

export default App;
