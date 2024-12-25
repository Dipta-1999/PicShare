import PictureList from "../components/pictureCard";
import Gallery from "./gallery";
import NavbarLogin from "../components/navbar-login";

const HomePage : any = () => {
    return(
        <>
            <NavbarLogin/>
            <Gallery/>
        </>
    )
}

export default HomePage;