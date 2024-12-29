import React from "react";

import { useNavigate } from "react-router-dom";
//import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";

const NavbarLogin: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<string | null>(null);
    //const [isMenuOpen, setIsMenuOpen] = useState(false);
    //const { username } = useUserContext();

    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("username"); // Clear storage
        setUser(null); // Clear state
        navigate("/")
    };


    return (
        <div className="flex flex-wrap justify-between items-center w-full  px-4 sm:px-[5px] md:px-[15px] lg:px-[60px] bg-white border-b-2 border-gray-300  absolute top-0">
            <div className="flex gap-5 items-center">
                <div className="p-2 py-5">
                    <h1 className="text-4xl text-black font-bold font">PicShare</h1>
                </div>
                <div className="flex gap-2 items-center p-1">
                    <span
                        className="font-roboto text-xl md:text-xl lg:text-xl text-[#4D625F] hover:text-[#00D1FF] cursor-pointer px-4 py-2 sm:px-0"
                        onClick={() => navigate("/home")}>
                        Home
                    </span>
                    <span className="font-roboto  text-xl md:text-xl lg:text-xl text-[#4D625F] hover:text-[#00D1FF] cursor-pointer px-4 py-2 sm:px-0"
                          onClick={() => navigate("/favorite")}>
                        Favorite
                    </span>
                </div>
            </div>
            <div className="flex gap-7 items-center">
                <button
                    className="w-32 md:w-28 lg:w-32 h-10 sm:h-12 md:h-12 bg-blue-500 rounded-[7px] flex items-center justify-center"
                    onClick={() => navigate("/sharepic")}
                >
                    <span className="font-serif  text-lg md:text-lg lg:text-xl text-white">
                        Share Pic
                    </span>
                </button>
                <div className="font-roboto text-xl md:text-xl lg:text-xl text-[#4D625F] hover:text-[#00D1FF] cursor-pointer px-4 py-2 sm:px-0">
                    {/* {username ? <p>Welcome, {username}!</p> : <p>Please log in</p>} */}
                    {user ? (
                        <><span>Hi {user}</span></>
                    ): <></>}
                </div>
                <button
                    className="w-32 md:w-28 lg:w-32 h-10 sm:h-12 md:h-12 bg-blue-500 rounded-[7px] flex items-center justify-center"
                    onClick={handleLogout}
                >
                    <span className="font-serif  text-lg md:text-lg lg:text-xl text-white">
                        Log Out
                    </span>
                </button>
            </div>
        </div>
    );
};

export default NavbarLogin;
