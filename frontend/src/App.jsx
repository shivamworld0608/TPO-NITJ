import React, { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './Redux/authSlice';
import Home from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Placement from "./Pages/Placement";
import Recruiter from "./Pages/Recruiter";
import Sdashboard from "./Pages/Sdashboard";
import Rdashboard from "./Pages/Rdashboard";
import Pdashboard from "./Pages/Pdashboard";
import TeamPage from "./Pages/TeamPage";
import FAQ from "./Pages/Faqs";
import ErrorPage from "./Pages/ErrorPage";
import Signup from "./Pages/Signup";
import AlumniLogin from "./Pages/ALogin";


const App = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/alogin" element={<AlumniLogin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/placements" element={<Placement/>} />
        <Route path="/recruiter" element={<Recruiter/>} />
        <Route path="/faq" element={<FAQ/>} />
        <Route path="/team" element={<TeamPage/>} />
        <Route path="/sdashboard/*" element={authUser ? <Sdashboard /> : <Navigate to="/" />}/>         
        <Route path="/rdashboard/*" element={authUser? <Rdashboard/> : <Navigate to="/" />} />
        <Route path="/pdashboard/*" element={authUser? <Pdashboard/> : <Navigate to="/" />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} /> {/* This will catch all unmatched routes */}
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;