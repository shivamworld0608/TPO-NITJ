import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col justify-between bg-slate-800 text-white lg:flex-row lg:px-20">

      <div className="flex basis-1/3 flex-col border-y-gray-300 p-[25px] lg:border-r lg:border-zinc-400">
        <div className="flex flex-row items-center gap-x-[10px] pb-3">
          <img
            src="nitj-logo.png"
            alt="NITJ logo"
            className="h-[67px] w-[67px]"
          />
          <p className="font-semibold text-white lg:text-[20px]">
            Dr. B R Ambedkar National Institute of Technology, Jalandhar
          </p>
        </div>
        <div className="p-[20px]">
          <div className="pb-[6px] lg:w-[85%]">
            <i className="fas fa-location-dot pr-[8px]"></i>
            <span className="opacity-90">
              G.T Road, Amritsar Bypass, Jalandhar, Punjab, India-144024
            </span>
          </div>
          <div className="flex flex-row pb-[6px]">
            <i className="fas fa-envelope mt-1 pr-[8px]"></i>
            <h3 className="opacity-90">webmaster@nitj.ac.in</h3>
          </div>
          <div className="align-center flex flex-row pb-[14px]">
            <i className="fas fa-phone mt-1 pr-[8px]"></i>
            <h3 className="opacity-90">
              +91-0181-5037855, 2690301, 2690453, 3082000
            </h3>
          </div>
          <div id="social-links" className="flex flex-col bg-slate-800">
            <div className="flex flex-row gap-10 mt-4">
              {[
                {
                  href: "https://www.facebook.com/NITJofficial/",
                  className: "fa-brands fa-facebook",
                },
                {
                  href: "https://twitter.com/NITJofficial?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
                  className: "fab fa-twitter",
                },
                {
                  href: "https://in.linkedin.com/school/dr-b-r-ambedkar-national-institute-of-technology-jalandhar-official/",
                  className: "fa-brands fa-linkedin",
                },
                {
                  href: "https://www.instagram.com/nitjofficial/?hl=en",
                  className: "fa-brands fa-instagram",
                },
                {
                  href: "https://www.youtube.com/c/NITJOfficial",
                  className: "fa-brands fa-youtube",
                },
              ].map(({ href, className }, idx) => (
                <div className="text-l text-white" key={idx}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <i
                      className={`${className} text-[21px] hover:text-yellow-300`}
                    ></i>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="basis-2/3 p-[25px] lg:block">
        <h2 className="my-1 text-xl font-semibold">Quick Links</h2>
        <div className="flex flex-row p-[15px] gap-10">
          {[
            [
              { text: "Admission", href: "https://www.nitj.ac.in/admissions/index.html#btech" },
              { text: "UnderGrad Courses", href: "https://www.nitj.ac.in/admissions/courses_offered.html" },
              { text: "PostGrad Courses", href: "https://www.nitj.ac.in/admissions/courses_offered.html" },
              { text: "Departments", href: "https://www.nitj.ac.in/admin/BTech.html" },
              { text: "Academic Calender", href: "https://nitj.ac.in/template/index.html?id=6433e06be7b7ce1ef620fd53?category=notice" },
              { text: "Clubs And Societies", href: "https://departments.nitj.ac.in/dept/cse/SocietyClubs" },
              { text: "Campus Life", href: "https://www.nitj.ac.in/#campus-life" },
            ],
            [
              { text: "Faculty", href: "https://nitj.irins.org/" },
              { text: "Staff", href: "https://www.nitj.ac.in/admin/phonebook.html" },
              { text: "Recruitment", href: "https://www.nitj.ac.in/template/index.html?id=6709163583b910f5bc5e2cf1?category=newpage" },
              { text: "Research", href: "https://www.nitj.ac.in/research/researchProjects.html" },
              { text: "Patent", href: "https://www.nitj.ac.in/research/iprs.html" },
            ],
            [
              { text: "Institute Prospectus(2024-2025)", href: "https://nitj.ac.in/files/1719227188415-Prospectus%202024-2025.pdf" },
              { text: "Annual Reports", href: "https://www.nitj.ac.in/template/index.html?id=651e908479c68ff6aaa9df9e?category=newpage" },
              { text: "UGC Act", href: "https://www.ugc.gov.in/oldpdf/ugc_act.pdf" },
              { text: "NIT Act and statutes", href: "https://www.nitj.ac.in/template/index.html?id=64faf68538ceda75f04478fe?category=newpage" },
              { text: "Pension", href: "https://www.nitj.ac.in/admin/resources.html" },
              { text: "Ministry of Education Notifications", href: "https://www.education.gov.in/circulars-orders-notification" },
              { text: "Annual Property Return", href: "https://v1.nitj.ac.in/NITJ/WDMC/120.pdf" },
              { text: "Rules/Policies", href: "https://www.nitj.ac.in/admin/rules.html" },
            ],
            [
              { text: "NIRF-2024", href: "https://www.nitj.ac.in/admin/ranking.html" },
              { text: "NewsLetter", href: "https://www.nitj.ac.in/admin/newsletter.html" },
            ],
          ].map((group, idx) => (
            <div className="flex basis-1/4 flex-col text-[11px] lg:text-[14px]" key={idx}>
              {group.map(({ text, href }) => (
                <a
                  href={href}
                  className="hover:text-yellow-300 hover:underline"
                  key={href}
                >
                  {text}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-zinc-400 flex flex-col bg-slate-800 px-2 p-[20px] text-center text-white lg:flex-col justify-between ">
        <div className="pb-[10px] text-[12px] lg:pb-0 lg:text-[15px]">
          © Copyright 2022, All Rights Reserved NIT Jalandhar
        </div>
        <div className="text-[12px] lg:text-[15px]">
          {[
            "Other NITs",
            "MoU",
            "GIAN",
            "TEQIP",
            "Anti Ragging",
            "Terms of Use",
            "Credits",
          ].map((text, idx) => (
            <span key={idx}>
              <a href="#" className="mx-1 hover:text-yellow-300 hover:underline lg:mx-2">
                {text}
              </a>
              {idx < 6 && " | "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
