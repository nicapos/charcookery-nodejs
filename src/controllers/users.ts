import { Request, Response } from "express";

const usersController = {
  getAccountDetails: async (req: Request, res: Response) => {
    res.status(204); // TODO: Implement this function (and remove this line)
  },

  createAccount: async (req: Request, res: Response) => {
    res.status(204); // TODO: Implement this function (and remove this line)
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
