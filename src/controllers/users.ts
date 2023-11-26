import {
  User,
  UserCredential,
  getAuth,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  setPersistence,
} from "@firebase/auth";
import { Request, Response } from "express";
import { LoginCredentialsSchema, TokenCredentialsSchema } from "../docs/types";
import { auth } from "../firebase";
import { handleError } from "../middlewares/errorHandler";
import {
  AccountType,
  EditableAccountSchema,
  RequestPasswordChangeSchema,
} from "../schemas/users";
import UserService from "../services/UserService";

const usersController = {
  getAccountDetails: (req: Request, res: Response) => {
    const activeUser = getAuth().currentUser;

    if (!activeUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    UserService.getById(activeUser.uid)
      .then((account: AccountType) => res.status(200).json(account))
      .catch((err) => handleError(res, err));
  },

  createAccount: (req: Request, res: Response) => {
    const { email, password } = LoginCredentialsSchema.parse(req.body);

    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials: UserCredential) => {
        const user = credentials.user;

        UserService.create(credentials.user)
          .then(() => res.status(201).json(user))
          .catch((err) => handleError(res, err));
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
      setPersistence(auth, browserLocalPersistence)
        .then(() =>
          signInWithEmailAndPassword(getAuth(), email, password)
            .then(({ user }) => res.status(201).json(user))
            .catch((err) => handleError(res, err))
        )
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

  updateUserProfile: (req: Request, res: Response) => {
    const account = EditableAccountSchema.parse(req.body);
    const activeUser = getAuth().currentUser;

    if (!activeUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    UserService.updateById(activeUser.uid, account)
      .then(() => res.status(200).json(account))
      .catch((err) => handleError(res, err));
  },

  sendVerificationEmail: (req: Request, res: Response) => {
    const activeUser = getAuth().currentUser;

    if (!activeUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (activeUser.emailVerified) {
      res.status(400).json({ message: "Account is already verified" });
      return;
    }

    sendEmailVerification(activeUser)
      .then(() => res.status(200).json({ message: "Verification email sent" }))
      .catch((err) => handleError(res, err));
  },

  requestPasswordChange: (req: Request, res: Response) => {
    const { email } = RequestPasswordChangeSchema.parse(req.body);
    const user = getAuth().currentUser;

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (email != getUserEmail(user)) {
      res.status(403).json({
        message: `Unauthorized. Provided email doesn't match account email (passed ${email}).`,
      });
      return;
    }

    if (!user.emailVerified) {
      res.status(403).json({
        message: "Unauthorized. Verify your email first.",
      });
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() =>
        res.status(200).json({
          message: "Password reset link sent to your email.",
        })
      )
      .catch((err) => handleError(res, err));
  },

  deleteAccount: (req: Request, res: Response) => {
    const activeUser = getAuth().currentUser;

    if (!activeUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userId = activeUser.uid;

    UserService.deleteById(userId)
      .then(() =>
        activeUser
          .delete()
          .then(() => res.status(204).end())
          .catch((err) => handleError(res, err))
      )
      .catch((err) => handleError(res, err));
  },
};

// utils
function getUserEmail(user: User) {
  return user.email || user.providerData[0].email || "";
}

export default usersController;
