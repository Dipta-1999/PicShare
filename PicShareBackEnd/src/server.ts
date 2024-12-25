import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import pictureRoutes from "./routes/pictureRoutes";
import cors from "cors";

dotenv.config();
connectDB();
const app = express();
app.use(cors({
    origin: "http://localhost:5173",  // Allow frontend to access the backend
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', pictureRoutes);


app.use("/api/users", userRoutes);
app.use("/api/pictures", pictureRoutes);
app.use('/api/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));