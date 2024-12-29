import Favorites from "../components/favourite";
import Gallery from "../components/gallery";
import GalleryHome from "../components/galleryHome";
import NavbarLogin from "../components/navbar-login";

const FavoritePage: any = () => {
    return (
        <>
            <NavbarLogin />
            <div className="flex flex-wrap">
                <div className="flex flex-col items-center justify-center min-h-screen mt-32 w-full p-2">
                    <Favorites/>
                </div>

            </div>

        </>
    )
}

export default FavoritePage;