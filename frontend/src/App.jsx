import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import Downloads from "./Pages/Downloads";
import TeamPage from "./Pages/TeamPage";
import FAQ from "./Pages/Faqs";
import ErrorPage from "./Pages/ErrorPage";
/* import Signup from "./Pages/Signup"; */
import AlumniLogin from "./Pages/ALogin";
import AssessmentAttemptPage from "./Pages/Mock-test";
import WhyRecruitPage from "./Pages/WhyRecruitPage";

const App = () => {
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
        default:
          return "/";
      }
    }
    return "/";
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Navigate to={getDashboardPath()} /> : <Home />}
        />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route
          path="/login"
          element={authUser ? <Navigate to={getDashboardPath()} /> : <Login />}
        />
        <Route
          path="/alogin"
          element={
            authUser ? <Navigate to={getDashboardPath()} /> : <AlumniLogin />
          }
        />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/placements" element={<Placement />} />
        <Route path="/internships" element={<Internship />} />
        <Route path="/recruiter" element={<Recruiter />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/whyrecruit" element={< WhyRecruitPage/>} />
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
        {/* <Route
          path="/sdashboard/jobs/:id"
          element={
            authUser && userType === "Student" ? (
              <Jobdetail/>
            ) : (
              <Navigate to={getDashboardPath()} />
            )
          }
        /> */}
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
          path="/admindashboard/*"
          element={
            authUser && userType === "Admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to={getDashboardPath()} />
            )
          }
        />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />{" "}
        {/* This will catch all unmatched routes */}
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
