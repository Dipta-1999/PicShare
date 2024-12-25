// import express from "express";
// import User from "../models/User";

// const router = express.Router();

// router.post("/login", async (req, res) => {
//     const { username } = req.body;
//     try {
//         let user = await User.findOne({ username });
//         if (!user) {
//             user = await User.create({ username });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Error logging in user." });
//     }
// });

// export default router;



import express from 'express';
import { loginUser } from '../controllers/authController';

const router = express.Router();

router.post('/login', loginUser);

export default router;
