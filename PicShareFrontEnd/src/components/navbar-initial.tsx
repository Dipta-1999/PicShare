import React from "react";

import { useNavigate } from "react-router-dom";

const NavbarInitial: React.FC = () => {
  const navigate = useNavigate();
  //const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-wrap justify-between items-center w-full  px-4 sm:px-[5px] md:px-[15px] lg:px-[60px] bg-white border-b-2 border-gray-300  absolute top-0">
            <div className="flex gap-5 items-center">
                <div className="p-2 py-5">
                    <h1 className="text-4xl text-black font-bold font">PicShare</h1>
                </div>
            </div>
            <div className="flex gap-7 items-center">
                <button
                    className="w-[80px] md:w-[80px] lg:w-[90px] h-[30px] sm:h-[40px] md:h-[45px] bg-[#00D1FF] rounded-[7px] flex items-center justify-center"
                    onClick={() => navigate("/")}
                >
                    <span className="font-serif  text-lg md:text-lg lg:text-2xl text-white">
                        Log in
                    </span>
                </button>
            </div>
        </div>
  );
};

export default NavbarInitial;
