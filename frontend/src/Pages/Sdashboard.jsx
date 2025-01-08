import Header from "../components/header";
import Footer from "../components/footer";
import Sdashboards from "../components/sdashboard";

const SDashboard = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="mt-3"><Sdashboards /></div>
      {/* <Footer/> */}
      <div className="border-t  border-zinc-400 flex flex-col bg-slate-800 px-24 p-[20px] text-center text-white lg:flex-row justify-between ">
        <div className="pb-[10px] text-[12px] lg:pb-0 lg:text-[15px]">
          © Copyright 2022, All Rights Reserved NIT Jalandhar
        </div>
        <div className="pb-[10px] text-[12px] lg:pb-0 lg:text-[15px]">
          Developed By <a href="/team" className="text-yellow-300 hover:text-yellow-300">Placement Portal Dev Team</a>
        </div>
      </div>
    </>
  );
};

export default SDashboard;