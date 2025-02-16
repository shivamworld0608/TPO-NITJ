import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faInstagram,
  faTwitter,
  faLinkedin,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Placements", link: "/placements" },
    { name: "Internships", link: "/internships" },
    { name: "Alumni", link: "/alumni" },
    { name: "People", link: "/team" },
    { name: "FAQs", link: "/faq" },
  ];
  return (
    <header className="shadow sticky z-50 top-0 w-full">
      <nav className="bg-white border-gray-200 w-full h-32">
        <div className="flex flex-col justify-between items-center mx-auto">
          <div className="flex mt-2 justify-between w-full pr-10 pl-10">
            <Link to="http://nitj.ac.in/" className="flex items-center justify-center">
              <img src="nitj-logo.png" className="mr-3 h-20 w-20" alt="Logo" />
              <div className="flex flex-col items-center justify-center">
                <p className="font-semibold text-lg">
                  DR B R AMBEDKAR NATIONAL INSTITUTE OF TECHNOLOGY
                </p>
                <p className="font-semibold text-lg mx-auto">
                  JALANDHAR, {"(PUNJAB)"}
                </p>
              </div>
            </Link>
            <div className="flex items-center lg:order-2">
              <Link
                to="/login"
                className="bg-sky-700 hover:bg-sky-800 text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 "
              >
                Log in
              </Link>
            </div>
          </div>
          <div
            className="justify-between w-full flex bg-sky-700 mt-5 h-full p-5 pr-24 pl-24 pt-0 gap-16"
            id="mobile-menu-2"
          >
            <ul className="flex flex-row gap-5 mt-5">
              <a href="https://www.youtube.com/c/NITJOfficial" target="_blank">
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="text-white w-7 h-7"
                />
              </a>
              <a href="https://www.instagram.com/nitjofficial/" target="_blank">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-white w-7 h-7"
                />
              </a>
              <a href="https://x.com/NITJofficial" target="_blank">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="text-white w-7 h-7"
                />
              </a>
              <a href="https://in.linkedin.com/school/dr-b-r-ambedkar-national-institute-of-technology-jalandhar-official/" target="_blank">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-white w-7 h-7"
                />
              </a>
              <a href="https://www.facebook.com/NITJofficial" target="_blank">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="text-white w-7 h-7"
                />
              </a>
            </ul>
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-4 lg:mt-0">
              {navLinks.map((item) => (
                <li>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-white text-sky-700"
                          : "bg-sky-700 text-white hover:bg-sky-800 hover:text-white"
                      } block py-2 pr-4 pl-4 duration-200 border-gray-100 rounded-b-2xl `
                    }
                    style={{
                      boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
