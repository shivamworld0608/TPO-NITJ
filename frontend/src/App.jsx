import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./Redux/authSlice";
import Home from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Forgotpassword from "./Pages/ForgotPassword";
import Placement from "./Pages/Placement";
import Internship from "./Pages/Internship";
import Recruiter from "./Pages/Recruiter";
import Sdashboard from "./Pages/Sdashboard";
import Rdashboard from "./Pages/Rdashboard";
import Pdashboard from "./Pages/Pdashboard";
import AdminDashboard from "./Pages/Admindashboard";
import Ddashboard from "./Pages/Ddashboard";
import Downloads from "./Pages/Downloads";
import TeamPage from "./Pages/TeamPage";
import FAQ from "./Pages/Faqs";
import ErrorPage from "./Pages/ErrorPage";
import AlumniLogin from "./Pages/ALogin";
import AssessmentAttemptPage from "./Pages/Mock-test";
import WhyRecruitPage from "./Pages/WhyRecruitPage";
import Placementstatistics from "./Pages/Placementstatistic";

const AppContent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { authUser, userType } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const getDashboardPath = () => {
    if (authUser) {
      switch (userType) {
        case "Student":
          return "/sdashboard/home";
        case "Professor":
          return "/pdashboard/home";
        case "Recuiter":
          return "/rdashboard/home";
        case "Admin":
          return "/admindashboard/home";
        case "Department":
          return "/ddashboard/home";
        default:
          return "/";
      }
    }
    return `/login?redirect=${encodeURIComponent(location.pathname + location.search)}`;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <Navigate to={getDashboardPath()} /> : <Home />}/>
        <Route path="/login" element={authUser && !new URLSearchParams(location.search).get("redirect")? <Navigate to={getDashboardPath()}  replace={true}  /> : <Login />}/>
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/placement-statistics" element={<Placementstatistics/>}/>
        <Route path="/placements" element={<Placement />} />
        <Route path="/internships" element={<Internship />} />
        <Route path="/recruiter" element={<Recruiter />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/departmental-brochure" element={<Downloads />} />
        <Route path="/whyrecruit" element={< WhyRecruitPage/>} />

        <Route
          path="/sdashboard/*"
          element={
            authUser && userType === "Student" ? (
              <Sdashboard />
            ) : (
              <Navigate to={getDashboardPath()} />
            )
          }
        />
        <Route
          path="/rdashboard/*"
          element={
            authUser && userType === "Recuiter" ? (
              <Rdashboard />
            ) : (
              <Navigate to={getDashboardPath()} />
            )
          }
        />
        <Route
          path="/pdashboard/*"
          element={
            authUser && userType === "Professor" ? (
              <Pdashboard />
            ) : (
              <Navigate to={getDashboardPath()} />
            )
          }
        />
        <Route
          path="/ddashboard/*"
          element={
            authUser && userType === "Department" ? (
              <Ddashboard />
            ) : (
              <Navigate to={getDashboardPath()} />
            )
          }
        />
        <Route
          path="/admindashboard/*"
          element={
            authUser && userType === "Admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to={getDashboardPath()} />
            )
          }
        />

        
        <Route
          path="/sdashboard/assessment-attempt/:attemptId"
          element={
            authUser && userType === "Student" ? (
              <AssessmentAttemptPage />
            ) : (
              <Navigate to={getDashboardPath()} />
            )
          }
        />

        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />{" "}

      </Routes>
      <Toaster />
    </>
  );
};


// Main App component with Router
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
