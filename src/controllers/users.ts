import {
  User,
  getAuth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "@firebase/auth";
import { Request, Response } from "express";
import { LoginCredentialsSchema, TokenCredentialsSchema } from "../docs/types";
import { auth, db } from "../firebase";
import { handleError } from "../middlewares/errorHandler";
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import {
  AccountType,
  EditableAccountSchema,
  RequestPasswordChangeSchema,
} from "../schemas";

const usersController = {
  getAccountDetails: (req: Request, res: Response) => {
    const user = getAuth().currentUser;

    if (user) {
      const userDocRef = doc(collection(db, "users"), user.uid);

      getDoc(userDocRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            res.status(200).json(snapshot.data());
          }
        })
        .catch((err) => handleError(res, err));
    } else {
      // Middleware should prevent activeUser == null, but just in case:
      res.status(400).json({ message: "Unauthorized" });
    }
  },

  createAccount: (req: Request, res: Response) => {
    const { email, password } = LoginCredentialsSchema.parse(req.body);

    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials: UserCredential) => {
        const user = credentials.user;

        // Create account in DB
        const account: AccountType = {
          name: user.providerData[0].displayName,
          email: user.email,
          photo_url: user.providerData[0].photoURL,
          dietary_restrictions: null,
        };

        const newDocumentRef = doc(collection(db, "users"), user.uid);

        setDoc(newDocumentRef, account)
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

  updateUserProfile: (req: Request, res: Response) => {
    const account = EditableAccountSchema.parse(req.body);
    const activeUser = getAuth().currentUser;

    if (activeUser) {
      const newDocumentRef = doc(collection(db, "users"), activeUser.uid);

      updateDoc(newDocumentRef, account)
        .then(() => res.status(200).json(account))
        .catch((err) => handleError(res, err));
    } else {
      // Middleware should prevent activeUser == null, but just in case:
      res.status(401).json({ message: "Unauthorized" });
    }
  },

  sendVerificationEmail: (req: Request, res: Response) => {
    const activeUser = getAuth().currentUser;

    if (activeUser) {
      if (!activeUser.emailVerified) {
        sendEmailVerification(activeUser)
          .then(() =>
            res.status(200).json({ message: "Verification email sent" })
          )
          .catch((err) => handleError(res, err));
      } else {
        res.status(400).json({ message: "Account is already verified" });
      }
    } else {
      // Middleware should prevent activeUser == null, but just in case:
      res.status(401).json({ message: "Unauthorized" });
    }
  },

  requestPasswordChange: (req: Request, res: Response) => {
    const { email } = RequestPasswordChangeSchema.parse(req.body);
    const user = getAuth().currentUser;

    if (user && email != getUserEmail(user)) {
      res.status(403).json({
        message: `Unauthorized. Provided email doesn't match account email (passed ${email}).`,
      });
      return;
    }

    // Check if user is verified
    if (user && user.emailVerified) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          res.status(200).json({
            message: "Password reset link sent to your email.",
          });
        })
        .catch((err) => handleError(res, err));
    } else {
      res.status(403).json({
        message: "Unauthorized. Verify your email first.",
      });
    }
  },

  deleteAccount: (req: Request, res: Response) => {
    const activeUser = getAuth().currentUser;

    if (activeUser) {
      activeUser
        .delete()
        .then(() => res.status(204).end())
        .catch((err) => handleError(res, err));
    } else {
      // Middleware should prevent activeUser == null, but just in case:
      res.status(401).json({ message: "Unauthorized" });
    }
  },
};

// utils
function getUserEmail(user: User) {
  return user.email || user.providerData[0].email || "";
}

export default usersController;
