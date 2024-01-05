import path from 'path';
import { fileURLToPath } from 'url';
import { Request, Router } from 'express';
import multer, { FileFilterCallback } from 'multer';

const assetRouter = Router();

const uploadsPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'uploads');
console.log(uploadsPath);

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, uploadsPath);
  },
  filename(_req, file, cb) {
    const fileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

function fileFilter(_req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'));
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

assetRouter.post('/', (req, res) => {
  uploadSingleImage(req, res, function (error) {
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/uploads/${req.file?.filename}`,
    });
  });
});

export default assetRouter;
