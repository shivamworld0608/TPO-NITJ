import React from "react";

const TpoMessage = () => {
  return (
    <>
      <h1 className="text-5xl font-bold text-center">
        Head's<span className="text-custom-blue"> Message</span>
      </h1>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-5">
        <div className="flex flex-col items-center justify-center ">
          <div
            className="-mb-20 z-10 rounded-full w-36 h-36 border-2"
            style={{
              backgroundImage: "url('/Head 1.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          <div
            className="w-full p-5 rounded-lg border border-[#A5C8FFB2]"
            style={{
              background: "url('Background card.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div
              className="relative rounded-lg p-5"
              style={{
                background:
                  "linear-gradient(180deg, #FFFFFF 0%, #DEE9F9 50.48%, #9DBCE4 100%)",
              }}
            >
              <div className="mt-16 text-justify">
                <img src="inverted Comma.png" alt="" className="absolute " />
                <span className="p-5"></span>At the Training and Placement Cell,
                we aim to equip students with the skills, confidence, and
                exposure needed to thrive in today’s competitive world, while
                building strong connections between academia and industry for
                successful and fulfilling career opportunities through
                innovative initiatives and personalized mentorship.
                <br />
                <br />{" "}
                <span className="font-semibold ">
                  Dr. Rajeev Trehan <br />
                  Placement Head, NIT Jalandhar
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div
            className="-mb-20 z-10 rounded-full w-36 h-36 border-2"
            style={{
              backgroundImage: "url('/Head 2.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          <div
            className="w-full p-5 rounded-lg border border-[#A5C8FFB2]"
            style={{
              background: "url('Background card.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div
              className="relative rounded-lg p-5"
              style={{
                background:
                  "linear-gradient(180deg, #FFFFFF 0%, #DEE9F9 50.48%, #9DBCE4 100%)",
              }}
            >
              <div className="mt-16 text-justify">
                <img src="inverted Comma.png" className="absolute" />
                <span className="p-5"></span>The Training Cell is dedicated to
                enhancing students’ technical and soft skills through workshops,
                internships, and hands-on sessions, ensuring they are
                industry-ready and confident to take on real-world challenges
                with competence, adaptability, and a growth mindset cultivated
                through continuous learning and feedback.
                <br />
                <br />{" "}
                <span className="font-semibold ">
                  Dr. Ajay Gupta <br />
                  Training Head, NIT Jalandhar
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div
            className="-mb-20 z-10 rounded-full w-36 h-36 border-[#A5C8FFB2] border-2"
            style={{
              backgroundImage: "url('/Head 3.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          <div
            className="w-full p-5 rounded-lg border border-[#A5C8FFB2]"
            style={{
              background: "url('Background card.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div
              className="relative rounded-lg p-5"
              style={{
                background:
                  "linear-gradient(180deg, #FFFFFF 0%, #DEE9F9 50.48%, #9DBCE4 100%)",
              }}
            >
              <div className="mt-16 text-justify">
                <img src="inverted Comma.png" className="absolute" />
                <span className="p-5"></span>The Internship Cell connects
                students with valuable industry exposure, offering practical
                learning experiences that complement academics. We aim to foster
                professional growth, helping students explore real-world
                applications and build strong foundations for their future
                careers through collaborative efforts with leading
                organizations.
                <br />
                <br />{" "}
                <span className="font-semibold ">
                  Dr. O.P. Verma <br />
                  Internship Head, NIT Jalandhar
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <div
            className="-mb-20 z-10 rounded-full w-36 h-36 border-[#A5C8FFB2] border-2"
            style={{
              backgroundImage: "url('/Head 4.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          <div
            className="w-full p-5 rounded-lg border border-[#A5C8FFB2]"
            style={{
              background: "url('Background card.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div
              className="relative rounded-lg p-5"
              style={{
                background:
                  "linear-gradient(180deg, #FFFFFF 0%, #DEE9F9 50.48%, #9DBCE4 100%)",
              }}
            >
              <div className="mt-16 text-justify">
                <img src="inverted Comma.png" className="absolute" />
                <div>
                  <span className="p-5"></span>As Placement Coordinators, we
                  facilitate seamless recruitment experiences for both students
                  and recruiters. Our focus is on ensuring transparency,
                  preparation, and coordination to support every student in
                  securing opportunities aligned with their aspirations and
                  potential, while encouraging professionalism throughout the
                  process.
                  <br />
                  <br />{" "}
                  <span className="font-semibold ">
                    Dr. Sheffali Arora <br />
                    Placement Coordinator, NIT Jalandhar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TpoMessage;
