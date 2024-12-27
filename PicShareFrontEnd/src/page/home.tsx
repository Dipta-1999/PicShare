import Gallery from "../components/gallery";
import NavbarLogin from "../components/navbar-login";

const HomePage: any = () => {
    return (
        <>
            <NavbarLogin />
            <div className="flex flex-wrap">
                <div className="flex flex-col items-center justify-center min-h-screen mt-32 w-full p-2">
                    <Gallery />
                </div>

            </div>

        </>
    )
}

export default HomePage;