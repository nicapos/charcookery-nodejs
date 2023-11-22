import { Request, Response } from "express";
import { QuerySnapshot, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const recipesController = {
  getCommunityRecipes: async (req: Request, res: Response) => {
    res.status(204); // TODO: Implement this function (and remove this line)
  },

  getRecipesByUser: async (req: Request, res: Response) => {
    res.status(204); // TODO: Implement this function (and remove this line)
  },

  getRecipeById: async (req: Request, res: Response) => {
    res.status(204); // TODO: Implement this function (and remove this line)
  },

  addRecipe: async (req: Request, res: Response) => {
    res.status(204); // TODO: Implement this function (and remove this line)
  },

  updateFavoriteStatus: async (req: Request, res: Response) => {
    res.status(204); // TODO: Implement this function (and remove this line)
  },

  deleteRecipeById: async (req: Request, res: Response) => {
    res.status(204); // TODO: Implement this function (and remove this line)
  },
};

export default recipesController;
