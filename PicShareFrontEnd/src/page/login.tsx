import NavbarInitial from "../components/navbar-initial";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api/api";
import { useUserContext } from "../context/UserContext";


const LoginPage = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));
    //const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));
    const [username, setUsername] = useState('');
    const { setUsernameContext } = useUserContext();
    // const handleLogin = async () => {
    //     try{
    //         const response = await fetch("/api/users/login", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ username }),
                
    //         });
    //         const data = await response.json();
    //         console.log("Logged in as:", data);
    //         navigate("/home")
            
    //     }
    //     catch(error:any){
    //         alert(error.response?.data.message);
    //         console.error(
    //             "Registration failed:",
    //             error.response?.data || error.message
    //         );
    //     }
        
    // };



    // const handleLogin2 = async () => {
    //     const user = await loginUser(username);
    //     localStorage.setItem('userId', user._id);
    //     alert('Login successful');
    //     console.log(user._id);
    //   };

    const handleLogin = async () => {
        if (!username) {
            alert("Username is required!");
            return;
        }

        try {
            const response = await loginUser(username);
            //setUserId(userId)
            //localStorage.setItem('username', username); 
            //setUserId(userId)
            //localStorage.setItem('userId', response.b);

            if (!response.ok) {
                throw new Error("Failed to log in");
            }

            const data = await response.json();
            setUsernameContext(data.username);
            console.log("Logged in as:", data);
            localStorage.setItem('username',data.username);
            localStorage.setItem('userId', data.userId);

            // Navigate to the home page upon successful login
            navigate("/home");
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please try again.");
        }
    };




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data: any = {
            username: formData.get("username")?.toString().trim()
        };

        console.log("Form Data:", data);

        try {
            await loginUser(data);
            navigate("/home");
        } catch (error: any) {
            alert(error.response?.data.message);
            console.error(
                "Registration failed:",
                error.response?.data || error.message
            );
        }
    };





    return (
        <>
            <div className="flex flex-col items-center p-0 gap-2.5 w-full h-screen bg-gray-100">
                {/* Header */}
                <NavbarInitial />
                {/* Main Content */}
                <main className="flex flex-col md:flex-row justify-center items-center p-10 gap-4 w-full h-full  bg-white rounded shadow">
                    <section className="flex flex-col items-center gap-5 text-center">
                        <h1 className="text-3xl font-serif font-semibold">PicShare</h1>
                        <p className="text-lg text-gray-500">Login to start sharing</p>
                        <div className="flex flex-col gap-4 w-full max-w-sm items-center">
                            {/* <form onSubmit={(e) => handleSubmit(e)}> */}
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <button
                                    className="w-1/2 py-2 bg-blue-600 text-white rounded shadow "
                                    onClick={handleLogin}
                                    //onSubmit={(e: any) => handleSubmit(e)}
                                //onClick={() => navigate("/home")}
                                >Login</button>
                            {/* </form> */}
                        </div>

                    </section>
                </main>


            </div>
        </>
    )
}

export default LoginPage;