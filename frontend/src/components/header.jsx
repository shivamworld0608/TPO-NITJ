import React from "react";
import { logout } from '../Redux/authSlice';
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {User} from "lucide-react";


const Header = () => {
  const { authUser, userData } = useSelector((state) => state.auth);
  console.log(authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      toast.success("Logout successful!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed!");
      console.error("Error during logout:", error.response?.data || error);
    }
  };

  return (
    <header className="bg-custom-blue text-white">
      <div className="container mx-auto flex flex-col items-center py-0">
        <div className="flex items-center gap-6 py-4">
          <img
            src="nitj-logo.png"
            alt="Institute Logo"
            className="w-36 h-36"
          />
          <div className="text-center">
            <h1 className="text-2xl font-bold uppercase text-white">
              DR B R AMBEDKAR NATIONAL INSTITUTE OF TECHNOLOGY JALANDHAR, PUNJAB
              (INDIA)
            </h1>
            <h2 className="text-xl text-base font-medium">
              डॉ बी आर अम्बेडकर राष्ट्रीय प्रौद्योगिकी संस्थान जालंधर, पंजाब
              (भारत)
            </h2>
          </div>
        </div>

        <nav className="container-xl border border-custom-blue mt-1 rounded-3xl bg-white flex justify-between items-center py-2 px-8">
          <ul className="flex gap-8">
            <li>
              <a
                href="/placements"
                className="text-custom-blue font-semibold hover:text-blue-800"
              >
                Placements
              </a>
            </li>
            <li>
              <a
                href="/recruiter"
                className="text-custom-blue font-semibold hover:text-blue-800"
              >
                Top Recruiters
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-custom-blue font-semibold hover:text-blue-800"
              >
                Why Recruit?
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-custom-blue font-semibold hover:text-blue-800"
              >
                FAQ's
              </a>
            </li>
          </ul>
          {authUser && (
            <div className="flex items-center gap-4">
              <User className="text-custom-blue" size={24} onClick={() => navigate("/profile")} />
              <button
                onClick={handleLogout}
                className="bg-custom-blue text-white py-1 px-4 rounded-lg hover:bg-blue-800"
              >
                Logout
              </button>
            </div>
          )}

        </nav>
      </div>
    </header>
  );
};

export default Header;
