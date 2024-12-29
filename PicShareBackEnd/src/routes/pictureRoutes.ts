
import express from 'express';
import { uploadPicture, getPictures } from '../controllers/pictureController';
import { upload } from '../middleware/multerConfig';

const router = express.Router();

router.post('/upload', upload.single('picture'), uploadPicture);
router.get('/pictures', getPictures);
//router.post('/favorite', toggleFavorite);

export default router;
