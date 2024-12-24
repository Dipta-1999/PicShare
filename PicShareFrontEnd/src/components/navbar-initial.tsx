import React, { useState } from "react";
import { Menu, X } from "lucide-react";

import { useNavigate } from "react-router-dom";

const NavbarInitial: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex flex-wrap justify-between items-center w-full h-[90px] px-4 sm:px-[5px] md:px-[15px] lg:px-[60px] bg-white border border-[#EAEAEA] absolute top-0">
      <div className="flex items-center gap-2 w-auto h-[50px]">
        {/* <img src={nsmLogo} alt="" className="h-12" /> */}
        <h1 className="text-4xl text-black font-bold font">PicShare</h1>
      </div>

      {/* Hamburger Button */}
      <button
        className="block sm:hidden text-[#4D625F] focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
      {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navigation Items */}
      <div
        className={
          `${isMenuOpen ? "flex" : "hidden"}
          flex-col sm:flex sm:flex-row items-center p-4  gap-4 lg:gap-[20px] absolute sm:relative top-[90px] sm:top-0 left-0 sm:left-auto w-full sm:w-auto bg-white sm:bg-transparent z-50 sm:z-auto shadow-md sm:shadow-none`}
      >


        {/* Login Button (Mobile View) */}
        <button className="w-[80px] sm:w-[104px] h-[40px] sm:h-[50px] bg-[#00D1FF] rounded-[10px] flex items-center justify-center sm:hidden">
          <span className="font-raleway font-semibold text-[14px] sm:text-[16px] text-white">
            Login
          </span>
        </button>
      </div>

      <div className="hidden sm:flex items-center gap-4 lg:gap-[25px]">

        {/* Login Button */}
        <button
          className="w-[80px] md:w-[80px] lg:w-[90px] h-[30px] sm:h-[40px] md:h-[45px] bg-[#00D1FF] rounded-[7px] flex items-center justify-center"
          onClick={() => navigate("/")}
        >
          <span className="font-normal font-semibold text-[14px] md:text-[15px] lg:text-[16px] text-white">
            Log in
          </span>
        </button>
      </div>
    </nav>
  );
};

export default NavbarInitial;
