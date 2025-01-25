import React from "react";
import { logout } from '../Redux/authSlice';
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useState } from "react";


const Header = () => {
  const { authUser, userData } = useSelector((state) => state.auth);
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
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // This is your search functionality
//   function search_resources() {
//     const searchQuery = document.getElementById('searchbar').value.toLowerCase();
//     const resultsContainer = document.getElementById('Big_alphabets');
//     const noResultContainer = document.getElementById('noresult');
    
//     // Your data (for example purposes)
//     const resources = ['Faculty', 'Links', 'Library', 'Research', 'Everything']; 
    
//     const filteredResults = resources.filter(item => item.toLowerCase().includes(searchQuery));

//     if (filteredResults.length > 0) {
//         noResultContainer.classList.add('hidden');  // Hide the "No results found"
//         resultsContainer.innerHTML = filteredResults.map(result => `<div>${result}</div>`).join('');
//     } else {
//         resultsContainer.innerHTML = '';
//         noResultContainer.classList.remove('hidden'); // Show the "No results found"
//     }
// }

// Function to show the search page when search is submitted
function showSearchPage(event) {
    event.preventDefault();
    document.getElementById('search_page').classList.remove('hidden');
}

  return (
    <>
      <button id="scroll-to-top-button"
        className="hidden z-30 opacity-60 hover:opacity-100 transition-all bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-full fixed right-0 bottom-0 mr-6 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
        </svg>

      </button>
      {/* <!-- Menu for mobile ends--> */}
      <header className="fixed top-0 right-0 left-0 z-20 bg-white ">
        {/* <!-- TOP NAV BAR stats --> */}
        <div id="top_bar"
          className="absolute top-0 right-0 left-0 transition-transform delay-200 h-7 bg-[#0369a0] py-0.5 px-2 sm:px-12 text-xs uppercase text-white shadow-md">
          <div className="container flex flex-row justify-between items-center">
            <div className="basis-1/2">
              <div className="flex flex-row justify-center items-center gap-4 sm:gap-6">
                <a href="/research/jobs.html">
                  <div className="flex items-center">
                    <span className=" material-symbols-outlined h-5 w-5" style={{}}>
                      <svg
                        className="material-symbols-outlined h-5 w-5"
                        style={{
                          fontVariationSettings: "'FILL' 0, 'wght' 200, 'grad' 0, 'opzs' 40",
                          fill: "currentColor",
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 96 960 960"
                      >
                        <path d="M42 936v-92q0-34 16-56.5t45-36.5q54-26 115.5-43T358 691q78 0 139.5 17T613 751q29 14 45 36.5t16 56.5v92H42Zm60-60h512v-32q0-15-8.5-24.5T585 805q-43-19-96-36.5T358 751q-78 0-131 17.5T131 805q-12 5-20.5 14.5T102 844v32Zm256-245q-66 0-108-43t-42-107h-10q-8 0-14-6t-6-14q0-8 6-14t14-6h10q0-40 20-72t52-52v39q0 6 4.5 10.5T295 371q7 0 11-4.5t4-10.5v-52q8-2 22-3.5t27-1.5q13 0 27 1.5t22 3.5v52q0 6 4 10.5t11 4.5q6 0 10.5-4.5T438 356v-39q32 20 51 52t19 72h10q8 0 14 6t6 14q0 8-6 14t-14 6h-10q0 64-42 107t-108 43Zm0-60q42 0 66-25t24-65H268q0 40 24 65t66 25Zm302 124-2-29q-7-4-14.5-9T630 647l-26 14-22-32 26-19q-2-4-2-7.5v-15q0-3.5 2-7.5l-26-19 22-32 26 14 14-10q7-5 14-9l2-29h40l2 29q7 4 14 9l14 10 26-14 22 32-26 19q2 4 2 7.5v15q0 3.5-2 7.5l26 19-22 32-26-14q-6 5-13.5 10t-14.5 9l-2 29h-40Zm20-62q16 0 27-11t11-27q0-16-11-27t-27-11q-16 0-27 11t-11 27q0 16 11 27t27 11Zm88-155-9-35q-10-4-20.5-11T721 417l-44 16-20-35 35-28q-2-5-3.5-11t-1.5-12q0-6 1.5-12t3.5-11l-35-28 20-35 44 16q7-8 17.5-15.5T759 251l9-35h38l9 35q10 3 20.5 10.5T853 277l44-16 20 35-35 28q2 5 3.5 11t1.5 12q0 6-1.5 12t-3.5 11l35 28-20 35-44-16q-7 8-17.5 15T815 443l-9 35h-38Zm19-73q25 0 41.5-16.5T845 347q0-25-16.5-41.5T787 289q-25 0-41.5 16.5T729 347q0 25 16.5 41.5T787 405ZM102 876h512-512Z" />
                      </svg>
                    </span>
                    <p className="hidden sm:block pl-1.5 text-xs">Jobs</p>
                  </div>
                </a>
                <a href="/template/index.html?id=0?category=tender">
                  <div className="flex items-center">
                    <span
                      className="material-symbols-outlined h-5 w-5"
                      style={{
                        fontVariationSettings: "'FILL' 0, 'wght' 200, 'grad' 0, 'opzs' 40",
                      }}
                    >
                      <svg
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 96 960 960"
                      >
                        <path d="M726 1016V895H606v-60h120V715h60v120h120v60H786v121h-60ZM104 895V638H54v-60l44-202h602l45 207v55h-49v167h-60V638H420v257H104Zm60-60h196V638H164v197Zm-50-257h572-572ZM98 316v-60h603v60H98Zm16 262h572l-31-142H145l-31 142Z" />
                      </svg>
                    </span>

                    <p className="hidden sm:block pl-1.5 text-xs">Tenders</p>
                  </div>
                </a>

                <a href="https://ctp.nitj.ac.in/">
                  <div className="flex items-center">
                    <span
                      className="material-symbols-outlined h-5 w-5"
                      style={{
                        fontVariationSettings: "'FILL' 0, 'wght' 200, 'grad' 0, 'opzs' 40",
                      }}
                    >
                      <svg
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 96 960 960"
                      >
                        <path d="M140 976q-24 0-42-18t-18-42V436q0-24 18-42t42-18h237V236q0-24 18-42t42-18h87q24 0 42 18t18 42v140h236q24 0 42 18t18 42v480q0 24-18 42t-42 18H140Zm0-60h680V436H584q0 28-18.5 44T519 496h-78q-27 0-45.5-16T377 436H140v480Zm92-107h239v-14q0-18-9-32t-23-19q-32-11-50-14.5t-35-3.5q-19 0-40.5 4.5T265 744q-15 5-24 19t-9 32v14Zm336-67h170v-50H568v50Zm-214-50q22.5 0 38.25-15.75T408 638q0-22.5-15.75-38.25T354 584q-22.5 0-38.25 15.75T300 638q0 22.5 15.75 38.25T354 692Zm214-63h170v-50H568v50ZM437 436h87V236h-87v200Zm43 240Z" />
                      </svg>
                    </span>

                    <p className="hidden sm:block pl-1.5 text-xs">Placements</p>
                  </div>
                </a>
                <a href="/admin/resources.html">
                  <div className="flex items-center">
                    <span
                      className="material-symbols-outlined h-5 w-5"
                      style={{
                        fontVariationSettings: "'FILL' 0, 'wght' 200, 'grad' 0, 'opzs' 40",
                      }}
                    >
                      <svg
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 96 960 960"
                      >
                        <path d="M180 976q-24 0-42-18t-18-42V296q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600V486H180v430Zm0-490h600V296H180v130Zm0 0V296v130Zm100 210v-60h400v60H280Zm0 180v-60h279v60H280Z" />
                      </svg>
                    </span>

                    <p className="hidden sm:block pl-1.5 text-xs">Resources</p>
                  </div>
                </a>
                <a href="https://nitj.ac.in/template/index.html?id=660e3243b7c092452508e69a?category=newpage">
                  <div className="flex items-center">
                    <span
                      className="material-symbols-outlined h-5 w-5"
                      style={{
                        fontVariationSettings: "'FILL' 0, 'wght' 200, 'grad' 0, 'opzs' 40",
                      }}
                    >
                      <svg
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 96 960 960"
                      >
                        <path d="M560 482v-48q33-14 67.5-21t72.5-7q26 0 51 4t49 10v44q-24-9-48.5-13.5T700 446q-38 0-73 9.5T560 482Zm0 220v-49q33-13.5 67.5-20.25T700 626q26 0 51 4t49 10v44q-24-9-48.5-13.5T700 666q-38 0-73 9t-67 27Zm0-110v-48q33-14 67.5-21t72.5-7q26 0 51 4t49 10v44q-24-9-48.5-13.5T700 556q-38 0-73 9.5T560 592ZM248 756q53.566 0 104.283 12.5T452 806V379q-45-30-97.619-46.5Q301.763 316 248 316q-38 0-74.5 9.5T100 349v434q31-14 70.5-20.5T248 756Zm264 50q50-25 98-37.5T712 756q38 0 78.5 6t69.5 16V349q-34-17-71.822-25-37.823-8-76.178-8-54 0-104.5 16.5T512 379v427Zm-30 90q-51-38-111-58.5T248 817q-36.537 0-71.768 9Q141 835 106 848q-23.1 11-44.55-3Q40 831 40 805V342q0-15 7-27.5T68 295q42-20 87.395-29.5Q200.789 256 248 256q63 0 122.5 17T482 325q51-35 109.5-52T712 256q46.868 0 91.934 9.5Q849 275 891 295q14 7 21.5 19.5T920 342v463q0 27.894-22.5 42.447Q875 862 853 848q-34-14-69.232-22.5Q748.537 817 712 817q-63 0-121 21t-109 58ZM276 567Z" />
                      </svg>
                    </span>

                    <p className="hidden sm:block pl-1.5 text-xs">Library</p>
                  </div>
                </a>
                <a href="/admin/phonebook.html">
                  <div className="flex items-center">
                    <span
                      className="material-symbols-outlined h-5 w-5"
                      style={{
                        fontVariationSettings: "'FILL' 0, 'wght' 200, 'grad' 0, 'opzs' 40",
                      }}
                    >
                      <svg
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 96 960 960"
                      >
                        <path d="M180 976q-24 0-42-18t-18-42V296q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600V486H180v430Zm0-490h600V296H180v130Zm0 0V296v130Zm100 210v-60h400v60H280Zm0 180v-60h279v60H280Z" />
                      </svg>
                    </span>

                    <p className="hidden sm:block pl-1.5 text-xs">PhoneBook</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="basis-1/2 sm:pl-8 pl-1">
              <div className="flex flex-row gap-2 justify-between">
                <div className="hidden sm:flex basis-1/6 gap-4 flex-row items-center">
                  <a href="https://www.facebook.com/NITJofficial" target="_blank"><i
                    className="fa-brands fa-facebook text-lg"></i></a>
                  <a href="https://www.instagram.com/nitjofficial/" target="_blank"><i
                    className="fa-brands fa-instagram text-lg"></i></a>
                  <a href="https://twitter.com/NITJofficial" target="_blank"><i
                    className="fa-brands fa-twitter text-lg"></i></a>
                  <a href="https://in.linkedin.com/school/dr-b-r-ambedkar-national-institute-of-technology-jalandhar-official/"
                    target="_blank"><i className="fa-brands fa-linkedin text-lg"></i></a>
                  <a href="https://www.youtube.com/c/NITJOfficial" target="_blank"><i
                    className="fa-brands fa-youtube text-lg"></i></a>
                </div>
                <div className="flex sm:basis-1/2 basis-1/2 sm:justify-center items-center gap-2">
                  <a href="https://v1.nitj.ac.in/">
                    <div className="flex items-center">
                      <span
                        className="material-symbols-outlined h-5 w-5"
                        style={{
                          fontVariationSettings: "'FILL' 0, 'wght' 200, 'grad' 0, 'opzs' 40",
                        }}
                      >
                        <svg
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 96 960 960"
                        >
                          <path d="M480 976q-84 0-157-31.5T196 859q-54-54-85-127.5T80 574q0-84 31-156.5T196 291q54-54 127-84.5T480 176q84 0 157 30.5T764 291q54 54 85 126.5T880 574q0 84-31 157.5T764 859q-54 54-127 85.5T480 976Zm0-58q35-36 58.5-82.5T577 725H384q14 60 37.5 108t58.5 85Zm-85-12q-25-38-43-82t-30-99H172q38 71 88 111.5T395 906Zm171-1q72-23 129.5-69T788 725H639q-13 54-30.5 98T566 905ZM152 665h159q-3-27-3.5-48.5T307 574q0-25 1-44.5t4-43.5H152q-7 24-9.5 43t-2.5 45q0 26 2.5 46.5T152 665Zm221 0h215q4-31 5-50.5t1-40.5q0-20-1-38.5t-5-49.5H373q-4 31-5 49.5t-1 38.5q0 21 1 40.5t5 50.5Zm275 0h160q7-24 9.5-44.5T820 574q0-26-2.5-45t-9.5-43H649q3 35 4 53.5t1 34.5q0 22-1.5 41.5T648 665Zm-10-239h150q-33-69-90.5-115T565 246q25 37 42.5 80T638 426Zm-254 0h194q-11-53-37-102.5T480 236q-32 27-54 71t-42 119Zm-212 0h151q11-54 28-96.5t43-82.5q-75 19-131 64t-91 115Z" />
                        </svg>
                      </span>

                      <p className="hidden sm:block pl-1.5 text-xs">Old Website</p>
                    </div>
                  </a>
                  <div id="google_translate_element" className="w-1/2"></div>
                </div>
                <div className="flex sm:basis-1/3 basis-1/2 justify-center items-center">

                  <a className="flex items-center" target="_blank" href="http://nitj.ac.in/erp/login">
                    <span
                      className="material-symbols-outlined h-5 w-5 ml-2"
                      style={{
                        fontVariationSettings: "'FILL' 0, 'wght' 200, 'grad' 0, 'opzs' 40",
                      }}
                    >
                      <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                        <path
                          d="M144 1016v-60h672v60H144Zm0-820v-60h672v60H144Zm336 416q50 0 84-34t34-84q0-50-34-84t-84-34q-50 0-84 34t-34 84q0 50 34 84t84 34ZM132 896q-24 0-42-18t-18-42V316q0-26 18-43t42-17h696q24 0 42 18t18 42v520q0 24-18 42t-42 18H132Zm88-60q51-63 121-94.5T479.5 710q68.5 0 140 31.5T740 836h88V316H132v520h88Zm94 0h334q-31-30-72.5-48T480 770q-54 0-94.5 18T314 836Zm166.158-284Q456 552 439.5 535T423 494q0-24 16.342-41t40.5-17Q504 436 520.5 453t16.5 41q0 24-16.342 41t-40.5 17ZM480 576Z"
                        />
                      </svg>
                    </span>

                    <p className="hidden sm:block pl-1.5 text-xs">ERP</p>
                  </a>
                  <a className="flex items-center" target="_blank" href="http://smile.nitj.ac.in/erp/login">
                    <span
                      className="material-symbols-outlined h-5 w-5 ml-2"
                      style={{
                        fontVariationSettings: "'FILL' 0, 'wght' 200, 'grad' 0, 'opzs' 40",
                      }}
                    >
                      <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                        <path
                          d="M144 1016v-60h672v60H144Zm0-820v-60h672v60H144Zm336 416q50 0 84-34t34-84q0-50-34-84t-84-34q-50 0-84 34t-34 84q0 50 34 84t84 34ZM132 896q-24 0-42-18t-18-42V316q0-26 18-43t42-17h696q24 0 42 18t18 42v520q0 24-18 42t-42 18H132Zm88-60q51-63 121-94.5T479.5 710q68.5 0 140 31.5T740 836h88V316H132v520h88Zm94 0h334q-31-30-72.5-48T480 770q-54 0-94.5 18T314 836Zm166.158-284Q456 552 439.5 535T423 494q0-24 16.342-41t40.5-17Q504 436 520.5 453t16.5 41q0 24-16.342 41t-40.5 17ZM480 576Z"
                        />
                      </svg>
                    </span>

                    <p className="hidden sm:block pl-1.5 text-xs">SMILE</p>
                  </a>
                  <a className="flex items-center" target="_blank" href="
                  https://eoffice.nitj.ac.in/
                  ">
                    <span
                      className="material-symbols-outlined h-5 w-5 ml-2"
                      style={{
                        fontVariationSettings: "'FILL' 0, 'wght' 200, 'grad' 0, 'opzs' 40",
                      }}
                    >
                      <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                        <path
                          d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Zm140 500h320v-60H380V606h220v-60H380V436h260v-60H320v400Z"
                        />
                      </svg>
                    </span>

                    <p className="hidden sm:block pl-1.5 text-xs">EOffice</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- top nav bar ends -->
        <!-- INSTITUTE LOGO & NAME starts --> */}
        <div id="instituteNameContainer"
          className="relative sm:px-0 px-20 sm:w-full container p-0 left-[10px] sm:left-0 h-14 max-h-14 sm:h-20 sm:max-h-20">
          <div className="mySlides mt-7">
            <div className="align-center flex flex-row justify-end sm:justify-between bg-white py-2.5">
              <div
                className="institute_name sm:max-w-lg sm:basis-1/2 justify-start text-center sm:text-lg font-semibold uppercase hidden sm:block">
                <p>Dr B R AMBEDKAR NATIONAL INSTITUTE OF TECHNOLOGY JALANDHAR, PUNJAB (INDIA)</p>
              </div>
              <div
                className="institute_name flex sm:max-w-lg sm:basis-1/2 justify-end sm:px-16 text-center text-sm sm:text-xl font-bold uppercase">
                <p>डॉ बी आर अम्बेडकर राष्ट्रीय प्रौद्योगिकी संस्थान जालंधर, पंजाब (भारत)</p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- INSTITUTE LOGO & NAME ends -->
        <!-- Logo CONTAINER starts --> */}
        <div className="absolute hidden sm:block left-[50px] z-40 mx-auto -translate-x-1/2 -translate-y-1/3 sm:translate-y-0 scale-75 sm:scale-100 sm:left-1/2 " style={{ width: "230px" }}>
          <img src="Rectangle.png" alt="" />
        </div>
        <a href="/index.html">
          <div id="logo_250"
            className="absolute h-[120px] aspect-square left-[50px] sm:left-1/2 scale-[0.40] sm:scale-100 -translate-y-1/3 top-9 sm:top-7 sm:translate-y-0 z-40 -translate-x-1/2 sm:py-0">
            <img src="nitj-logo.png" alt="" />
          </div>
        </a>
        {/* <!-- Logo CONTAINER ends -->
        <!-- NAV BAR starts--> */}
         <div className="sm:block bg-accent drop-shadow-lg z-40 bg-[#0369a0]">
  <div className="container">
    <div className="z-40 flex h-7 sm:h-10 max-w-screen px-4 flex-row justify-between bg-accent text-lg text-white">
      <div className="flex items-center lg:hidden h-full">
        <button
          onClick={toggleMenu}
          className="material-symbols-outlined pr-2"
          style={{ fontVariationSettings: '"FILL" 0, "wght" 200, "grad" 0, "opzs" "40"'}}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </button>

        <a href="/" className="h-full">
          <svg xmlns="http://www.w3.org/2000/svg" height="full" className="" fill="currentColor" viewBox="0 -960 960 960" width="24">
            <path
              d="M240-200h147.692v-235.385h184.616V-200H720v-360L480-741.538 240-560v360Zm-40 40v-420l280-211.539L760-580v420H532.308v-235.384H427.692V-160H200Zm280-310.769Z"
            />
          </svg>
        </a>
      </div>

      {/* Menu for small and medium screens */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col items-center absolute left-0 top-7 md:top-10 bg-[#0369a0] text-white w-[100vw] py-2">
          <a href="/placements" className="p-1.5 font-medium uppercase">Placements</a>
          <a href="/internships" className="p-1.5 font-medium uppercase">Internships</a>
          <a href="/alumni" className="p-1.5 font-medium uppercase">Alumni</a>
          <a href="/team" className="p-1.5 font-medium uppercase">People</a>
          <a href="/faq" className="p-1.5 font-medium uppercase">FAQs</a>
          <a href="/login" className="p-1.5 font-medium uppercase">Login</a>
        </div>
      </div>

      {/* Menu for larger screens (sm and md) */}
      <div className="basis-2/5 hidden  md:hidden lg:block top-0">
        <div className="flex w-full flex-row justify-between px-4">
          <div className="flex items-center">
            <a href="/" className="hidden sm:block text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" className="h-6 w-6" fill="currentColor" viewBox="0 -960 960 960" width="24">
                <path
                  d="M240-200h147.692v-235.385h184.616V-200H720v-360L480-741.538 240-560v360Zm-40 40v-420l280-211.539L760-580v420H532.308v-235.384H427.692V-160H200Zm280-310.769Z"
                />
              </svg>
            </a>
          </div>
          <div id="menu-1" className="group cursor-default  hover:bg-blue-800">
            <div id="Administration" className="p-1.5 font-medium uppercase"><a href="/placements">Placements</a></div>
          </div>
          <div id="menu-2" className="group cursor-default hover:bg-blue-800">
            <div id="Academics" className="p-1.5 font-medium uppercase"><a href="/internships">Internships</a></div>
          </div>
          <div id="menu-3" className="group cursor-default hover:bg-blue-800">
            <div id="Admissions" className="p-1.5 font-medium uppercase">Alumni</div>
          </div>
        </div>
      </div>

      <div className="basis-2/5 hidden  md:hidden lg:block w-full top-0">
        <div className="flex w-full flex-row justify-between">
          <div className="basis-4/5">
            <div className="flex flex-row justify-between">
              <div id="menu-4" className="group cursor-default hover:bg-blue-800">
                <div id="Research" className="p-1.5 font-medium uppercase"><a href="/team">People</a></div>
              </div>
              <div id="menu-5" className="group cursor-default hover:bg-blue-800">
                <div id="Alumni" className="p-1.5 font-medium uppercase"><a href="/faq">FAQs</a></div>
              </div>
              <div id="menu-6" className="group relative cursor-default hover:bg-blue-800">
                <div id="Life at NITJ" className="p-1.5 font-medium uppercase"><a href="/login">Login</a></div>
              </div>
            </div>
          </div>
          <div className="flex basis-1/5 flex-row justify-center">
            <button type="button" id="nav-search-btn-v2" className=" material-symbols-outlined duration-50 cursor-pointer text-center transition ease-in-out hover:box-border hover:h-10 hover:w-10 hover:rounded-full hover:border-2 hover:border-accent" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Tap to search">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24">
                <path
                  d="M781.692-136.924 530.461-388.155q-30 24.769-69 38.769t-80.692 14q-102.55 0-173.582-71.014t-71.032-173.537q0-102.524 71.014-173.601 71.014-71.076 173.538-71.076 102.523 0 173.6 71.032T625.384-580q0 42.846-14.385 81.846-14.385 39-38.385 67.846l251.231 251.231-42.153 42.153Zm-400.923-258.46q77.308 0 130.962-53.654Q565.385-502.692 565.385-580q0-77.308-53.654-130.962-53.654-53.654-130.962-53.654-77.308 0-130.962 53.654Q196.154-657.308 196.154-580q0 77.308 53.653 130.962 53.654 53.654 130.962 53.654Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* <!-- NAV BAR ends--> */}
      </header>
      {/* <!-- === Search bar starts === --> */}
      {/* <div id="search_page"
    className="fixed inset-0 min-h-screen z-[51] hidden w-full flex justify-center items-center flex-col gap-10 bg-slate-900/80 backdrop-blur-sm overflow-x-hidden overflow-y-scroll">
    <span aria-hidden="true" className="sr-only sm:w-1/2">ONLY for tailwindCSS</span>
    <form id="search_form" className="sticky h-10 top-0 w-full z-[52]" onSubmit="showSearchPage(event)">
        <div className="flex px-2 sm:px-28">
            <button id="dropdown-button" data-dropdown-toggle="dropdown"
                className="z-10 inline-flex flex-shrink-0 items-center rounded-l-lg border border-gray-300 bg-gray-100 py-2.5 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                type="button">
                All categories
                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </button>
            <div id="dropdown"
                className="absolute z-10 hidden w-44 translate-y-11 divide-y divide-gray-100 rounded bg-white shadow dark:bg-gray-700"
                data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top">
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                    <li>
                        <button type="button"
                            className="inline-flex w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Faculty
                        </button>
                    </li>
                    <li>
                        <button type="button"
                            className="inline-flex w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Links
                        </button>
                    </li>
                    <li>
                        <button type="button"
                            className="inline-flex w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Library
                        </button>
                    </li>
                    <li>
                        <button type="button"
                            className="inline-flex w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Research
                        </button>
                    </li>
                    <li>
                        <button type="button"
                            className="inline-flex w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Everything
                        </button>
                    </li>
                </ul>
            </div>
            <div className="relative w-full">
                <input type="text" id="searchbar" onKeyUp="search_resources()"
                    className="z-20 block w-full rounded-r-lg border border-l-2 border-gray-300 border-l-gray-50 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-l-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
                    placeholder="Search Resources, Navbar links..." required={true} />
                <button type="button"
                    className="material-symbols-outlined absolute top-0 right-0 rounded-r-lg border border-blue-700 bg-blue-700 p-1 text-2xl text-white hover:bg-blue-800">
                    search
                </button>
            </div>
        </div>
    </form>

    <div id="resources"
        className="relative pt-20 z-[51] min-w-full hidden flex flex-col items-center justify-center overflow-x-hidden overflow-y-scroll">
        <div id="Big_alphabets" className="min-h-screen min-w-full text-4xl font-bold px-2 sm:px-28"></div>
        <div id="noresult" className="absolute hidden min-w-full top-44 text-2xl font-bold">
            <div className="text-center text-white">No results found</div>
            <div className="text-center text-white">Try searching something else</div>
        </div>
    </div>
</div> */}



    </>

  );
};

export default Header;