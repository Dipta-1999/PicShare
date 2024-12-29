import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  //destination: './uploads/',
  destination: (req, file, cb) => {
    console.log("Destination folder is being set.");
    const uploadPath = path.join(__dirname, '../uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    //cb(null, `${Date.now()}-${file.originalname}`);
    //const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`;
    console.log(`Saving file with name: ${uniqueSuffix}-${file.originalname}`);
    cb(null, uniqueSuffix);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  },
});
