// import express from "express";
// import multer from "multer"
// import Picture from "../models/Picture";

// const upload = multer({ dest: "uploads/" });
// const router = express.Router();

// router.post("/upload", upload.single("picture"), async (req:any, res:any) => {
//     const { userId, title } = req.body;
//     if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded." });
//     }

//     try {
//         const picture = await Picture.create({
//             userId,
//             imagePath: req.file.path,
//             title,
//             favorites: [],
//         });
//         res.status(201).json(picture);
//     } catch (error) {
//         res.status(500).json({ message: "Error uploading picture." });
//     }
// });

// router.get("/", async (req, res) => {
//     try {
//         const pictures = await Picture.find().populate("userId");
//         res.status(200).json(pictures);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching pictures." });
//     }
// });

// router.post("/favorite", async (req:any, res:any) => {
//     const { userId, pictureId } = req.body;
//     try {
//         const picture = await Picture.findById(pictureId);
//         if (!picture) return res.status(404).json({ message: "Picture not found." });

//         if (picture.favorites.includes(userId)) {
//             picture.favorites = picture.favorites.filter((id) => id.toString() !== userId);
//         } else {
//             picture.favorites.push(userId);
//         }

//         await picture.save();
//         res.status(200).json(picture);
//     } catch (error) {
//         res.status(500).json({ message: "Error updating favorites." });
//     }
// });

// export default router;

// import express from 'express';
// import upload from '../middleware/multerConfig';
// import { getPictures, sharePicture } from '../controllers/pictureController';

// const router = express.Router();

// router.get('/', getPictures);
// router.post('/', upload.single('image'), sharePicture);

// export default router;





import express from 'express';
import { uploadPicture, getPictures, toggleFavorite } from '../controllers/pictureController';
import { upload } from '../middleware/multerConfig';

const router = express.Router();

router.post('/upload', upload.single('picture'), uploadPicture);
router.get('/pictures', getPictures);
router.post('/favorite', toggleFavorite);

export default router;
