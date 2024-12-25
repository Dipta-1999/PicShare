// import axios from "axios";

// const API_BASE_URL = "http://localhost:5000";

// const api = axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

// //-----------------Log In ------------------------

// export const login = async (formData: {
//     "username": string;
// }) => {
//     console.log(formData);
//     const response = await axios.post(
//         `${API_BASE_URL}/api/users/login`,
//         JSON.stringify(formData),
//         { headers: { "Content-Type": "application/json" }, withCredentials: true }
//     );
//     console.log(response.data);
//     return response.data;
// }

// export const uploadPicture = async (formData: FormData) => {
//     try {
//       const response = await api.post('/pictures', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Upload Picture API Error:', error);
//       throw error;
//     }
//   };







import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your backend URL

export const loginUser = async (username: string) => {
  //const response = await axios.post(`${API_BASE_URL}/api/users/login`, { username });
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
    
  });
  return response;
};

export const fetchPictures = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/pictures/pictures`);
  return response.data;
};

export const uploadPicture = async (formData: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/api/pictures/upload`, formData);
  return response.data;
};

export const toggleFavorite = async (pictureId: string, userId: string) => {
  const response = await axios.post(`${API_BASE_URL}/api/pictures/toggleFavorite`, { pictureId, userId });
  return response.data;
};
