// import React from "react";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // Navbar Component
import Header from "./components/Header"; // Header Component
import Login from "./components/Login"; // Login Component
import Book from "./components/BookSection";
import ForgotPassword from './components/ForgotPassword'; 
import Register from './components/Register';
import Footer from './components/Footer';
import EditProfile from './components/EditProfile';
import SubmitArticle from './components/SubmitArticle';
import SubmittedArticle from './components/SubmittedArticles';
import AuthorDetails from './components/AuthorDetails';


import "@fortawesome/fontawesome-free/css/all.min.css";

// Import Page Components
import HomePage from "./pages/HomePage";
import GeneralPolicy from "./pages/GeneralPolicy";
import EditorialBoard from "./pages/EditorialBoard";
import InfoForAuthors from "./pages/InfoForAuthors";
// import AllIssues from "./pages/AllIssues";
import AcceptedPapers from "./pages/AcceptedPapers";
import OnlineSubmission from "./pages/OnlineSubmission";
import ContactPage from "./pages/ContactPage";
import ProfilePage from './pages/ProfilePage';


const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userData, setUserData] = useState(null);

  // const handleLoginSuccess = (user) => {
  //   setIsLoggedIn(true);
  //   setUserData(user);
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setUserData(null);
  // };
  return (
    <Router>
      {/* Header and Navbar */}
      <Header />
      <Navbar />

      {/* Main Layout */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "170px",
          padding: "0 5%",
          // backgroundColor: "#f4f4f9",
          minHeight: "100vh",
        }}
      >
        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {/* Left Section: Dynamic Content */}
          <div
            style={{
              flex: 2,
              padding: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/general-policy" element={<GeneralPolicy />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/online-submission" element={<OnlineSubmission />} />
              <Route path="/editorial-board" element={<EditorialBoard/>} />
              <Route path="/info-for-authors" element={<InfoForAuthors />} />
              <Route path="/accepted-papers" element={< AcceptedPapers/>}/>
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile-page" element={<ProfilePage />} />
              <Route path="/edit-profile" element={<EditProfile />} />       // here are profile page 
              <Route path="/submit-article" element={<SubmitArticle />}/>
              <Route path="/submitted-article" element={<SubmittedArticle/>}/>
              <Route path="/author-details/:paperId" element={<AuthorDetails />} />
              <Route path="/register" element={<Register />} />
              {/* Add other routes */}
            </Routes>
          </div>

          {/* Right Section: Static  */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Login Component ===================================================================== */}
            <div
              style={{
                padding: "20px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                height: "350px",
                overflow: "auto",
              }}
            >
              <Login />
            </div>
            {/* Conditional Rendering of Login/Profile Section */}
  
    

              

            {/* Book Component =======================================================================*/}
            <div
              style={{
                padding: "20px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                height: "400px",
                overflow: "auto",
              }}
            >
              <Book />
            </div>
          </div>
        </div>
        
        
      </div>
      <Footer/>
      
    </Router>
  );
};

export default App;
