import { Request, Response } from "express";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { handleError } from "../middlewares/errorHandler";

const miscController = {
  ping: (req: Request, res: Response) => {
    res.send("API is up and running!");
  },

  uploadImage: (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).send("No image file provided.");
    }

    const file = req.file;

    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname}`;
    const metadata = {
      contentType: file.mimetype,
    };

    // Create a reference to the Firebase Storage bucket
    const storageRef = ref(storage, "images/" + fileName);

    uploadBytes(storageRef, file.buffer, metadata)
      .then(() => {
        getDownloadURL(storageRef)
          .then((downloadURL: string) => {
            res.status(200).json({ name: fileName, url: downloadURL });
          })
          .catch((err) => handleError(res, err));
      })
      .catch((err) => handleError(res, err));
  },
};

export default miscController;
