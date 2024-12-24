import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

//-----------------Log In ------------------------

export const login = async (formData: {
    "username": string;
}) => {
    console.log(formData);
    const response = await axios.post(
        `${API_BASE_URL}/api/users/login`,
        JSON.stringify(formData),
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    console.log(response.data);
    return response.data;
}