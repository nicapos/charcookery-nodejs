import { Request, Response, NextFunction } from "express";

const MAX_TIMEOUT = 60 * 1000; // 1 minute (converted to ms)

const timeoutHandler = (req: Request, res: Response, next: NextFunction) => {
  res.setTimeout(MAX_TIMEOUT, () => {
    res.status(408).send({ message: "Request has timed out." });
  });

  next();
};

export default timeoutHandler;
