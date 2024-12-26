import { createBrowserRouter, useNavigate } from "react-router-dom";
import Navbar3 from "../components/navbar-initial";
import NavbarLogin from "../components/navbar-login";
import InitialPage from "../page/initial";
import HomePage from "../page/home";
import LoginPage from "../page/login";
import { UploadPicture } from "../page/share";
import PictureUploadForm from "../components/pictureUpload";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const handleUpload = async (file: File, title: string) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('picture', file);
      

      const response : any = await axios.post('http://localhost:5000/api/pictures/upload', formData);

      // {
      //   method: 'POST',
      //   body: formData,
      // });
      console.log(response);
      

      if (response.ok) {
        alert('Picture uploaded successfully!')
        console.log('Picture uploaded successfully!');
      } 
      // else {
      //   console.error('Failed to upload picture.');
      // }
    } catch (error) {
      console.error('Error uploading picture:', error);
    }
  };

const router = createBrowserRouter([

    { path: "/", element: <InitialPage/> } ,
    { path: "/login", element: <LoginPage/> } ,
    { path: "/home", element: <HomePage/>  },
    { path: "/sharepic", element: <UploadPicture/> }
    //{ path: "/sharepic", element: <PictureUploadForm onUpload={handleUpload}/> }

]);
export default router;