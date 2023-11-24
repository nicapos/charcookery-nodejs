import {
  getAuth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { Request, Response } from "express";
import { LoginCredentialsSchema, TokenCredentialsSchema } from "../docs/types";
import { auth } from "../firebase";
import { handleError } from "../middlewares/errorHandler";

const usersController = {
  getAccountDetails: async (req: Request, res: Response) => {
    res.status(204); // TODO: Implement this function (and remove this line)
  },

  createAccount: (req: Request, res: Response) => {
    const { email, password } = LoginCredentialsSchema.parse(req.body);

    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials: UserCredential) => {
        res.status(201).json(credentials.user);
      })
      .catch((err) => handleError(res, err));
  },

  signIn: (req: Request, res: Response) => {
    const {
      grant_type,
      username: email,
      password,
    } = TokenCredentialsSchema.parse(req.body);

    if (grant_type === "password") {
      signInWithEmailAndPassword(auth, email, password)
        .then((credentials) => {
          res.status(201).json(credentials.user);
        })
        .catch((err) => handleError(res, err));
    } else throw Error(`Unknown grant type (passed ${grant_type})`);
  },

  signOut: (req: Request, res: Response) => {
    getAuth()
      .signOut()
      .then(() => {
        res.status(204);
        res.end();
      })
      .catch((err) => handleError(res, err));
  },

  updateUserProfile: async (req: Request, res: Response) => {
    res.status(204); // TODO: Implement this function (and remove this line)
  },

  updatePassword: async (req: Request, res: Response) => {
    res.status(204); // TODO: Implement this function (and remove this line)
  },

  deleteAccount: async (req: Request, res: Response) => {
    res.status(204); // TODO: Implement this function (and remove this line)
  },
};

export default usersController;
