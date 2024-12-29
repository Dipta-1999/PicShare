import Favorites from "../components/favourite";
import Gallery from "../components/gallery";
import GalleryHome from "../components/galleryHome";
import NavbarLogin from "../components/navbar-login";

const FavoritePage: any = () => {
    return (
        <>
            <NavbarLogin />
            <div className="flex flex-wrap">
                <div className="flex flex-col items-center justify-center mt-20 min-h-screen w-full p-2">
                <p className="text-center text-3xl font-semibold">Your Favorites</p>
                    <Favorites/>
                </div>

            </div>

        </>
    )
}

export default FavoritePage;