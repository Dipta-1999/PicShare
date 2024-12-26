import { useNavigate } from "react-router-dom";
import Gallery from "../components/gallery";
import NavbarInitial from "../components/navbar-initial";

const InitialPage: any = () => {
    const navigate = useNavigate();
    return (
        <>
            <NavbarInitial />
            <div className="flex flex-wrap">
                <div className="flex flex-col items-center justify-center min-h-screen mt-32 w-full p-2">

                    <div className="bg-gray-300 p-4 rounded-xl mb-8">
                        <p className="text-center text-lg font-semibold">
                            <span onClick={() => navigate("/login")} className="text-[#00D1FF] cursor-pointer">login</span>{" "} to start sharing your favourite pictures with others!
                        </p>
                    </div>
                    <Gallery />
                </div>
            </div>



        </>
    )
}

export default InitialPage;