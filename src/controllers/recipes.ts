import { Request, Response } from "express";
import { QuerySnapshot, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { handleError } from "../middlewares/errorHandler";

const recipesController = {
  getCommunityRecipes: (req: Request, res: Response) => {
    // TODO: Group community recipes by category OR add filter by category
    const query = collection(db, "community_recipes");

    getDocs(query)
      .then((snapshot: QuerySnapshot) => {
        const recipes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        res.json({ data: recipes });
      })
      .catch((err) => handleError(res, err));
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
