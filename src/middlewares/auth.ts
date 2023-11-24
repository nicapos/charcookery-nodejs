import { Request, Response, NextFunction } from "express";
import { getAuth } from "firebase/auth";

export function requireSignIn(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let user = getAuth().currentUser;

  if (user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
