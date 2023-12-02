import multer, { memoryStorage } from "multer";

const upload = multer({
  storage: memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB limit
});

export default upload.single("media");
