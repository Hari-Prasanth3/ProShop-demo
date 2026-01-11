import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

// Use memory storage for Vercel (serverless functions have read-only filesystem)
// For production, you should upload to cloud storage (AWS S3, Cloudinary, etc.)
const storage = process.env.VERCEL === '1' 
  ? multer.memoryStorage() 
  : multer.diskStorage({
      destination(req, file, cb) {
        cb(null, "uploads/");
      },
      filename(req, file, cb) {
        cb(
          null,
          `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
      },
    });

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|webp|png/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = mimetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      res.status(400).send({ message: err.message });
      return;
    }
    
    if (!req.file) {
      res.status(400).send({ message: "No file uploaded" });
      return;
    }

    // For Vercel (memory storage), you'll need to upload to cloud storage
    // For now, return the buffer info - you should integrate with Cloudinary, AWS S3, etc.
    if (process.env.VERCEL === '1') {
      // TODO: Upload to cloud storage service (Cloudinary, AWS S3, etc.)
      res.status(200).send({
        message: "Image uploaded successfully (in memory)",
        image: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
        note: "For production, integrate with cloud storage service"
      });
    } else {
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${req.file.path}`,
      });
    }
  });
});

export default router;
