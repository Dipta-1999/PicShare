import PictureList from "../components/pictureCard";
import Gallery from "../components/pictureCard";
import NavbarLogin from "../components/navbar-login";

const HomePage : any = () => {
    return(
        <>
            <NavbarLogin/>
            <Gallery picture={{
                _id: "",
                title: "",
                url: "",
                isFavorite: false
            }} onToggleFavorite={function (pictureId: string): void {
                throw new Error("Function not implemented.");
            } }/>
        </>
    )
}

export default HomePage;