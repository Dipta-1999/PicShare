// import multer, { StorageEngine } from 'multer';
// import { Request } from 'express';

// const storage: StorageEngine = multer.diskStorage({
//   // Corrected destination callback signature
//   destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
//     cb(null, 'uploads/');  // Correct: First argument is error (null), second is the destination string.
//   },
//   // Corrected filename callback signature
//   filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
//     cb(null, `${Date.now()}-${file.originalname}`);  // Correct: First argument is error (null), second is the filename.
//   },
// });

// const upload = multer({ storage });

// export default upload;





import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
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
