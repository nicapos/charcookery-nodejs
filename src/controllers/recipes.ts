import { Request, Response } from "express";
import { handleError } from "../middlewares/errorHandler";
import { getAuth } from "firebase/auth";
import {
  EditableRecipeSchema,
  UserRecipeSchema,
  UserRecipeType,
} from "../schemas/recipes";
import RecipesService from "../services/RecipesService";

const recipesController = {
  getCommunityRecipes: (req: Request, res: Response) => {
    // TODO: Group community recipes by category OR add filter by category
    RecipesService.getAllCommunity()
      .then((recipes) => res.status(200).json(recipes))
      .catch((err) => handleError(res, err));
  },

  getRecipesByUser: async (req: Request, res: Response) => {
    // TODO: add filter by category, limit
    const { userId } = req.params;

    RecipesService.getAllByUser(userId)
      .then((recipes) => res.status(200).json(recipes))
      .catch((err) => handleError(res, err));
  },

  getRecipeById: async (req: Request, res: Response) => {
    const { id } = req.params;

    RecipesService.getById(id)
      .then((recipe: UserRecipeType) => res.status(200).json(recipe))
      .catch((err) => handleError(res, err));
  },

  addRecipe: (req: Request, res: Response) => {
    const recipe = UserRecipeSchema.parse(req.body);
    const activeUser = getAuth().currentUser;

    if (!activeUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    RecipesService.create(recipe, activeUser.uid)
      .then((recipe) => res.status(201).json(recipe))
      .catch((err) => handleError(res, err));
  },

  updateNotesFavorite: (req: Request, res: Response) => {
    const { id } = req.params;
    const { is_favorite, notes } = EditableRecipeSchema.parse(req.body);

    if (is_favorite != undefined) {
      RecipesService.tagAsFavoriteById(id, is_favorite)
        .then((recipe) => res.status(200).json(recipe))
        .catch((err) => handleError(res, err));
    } else if (notes != undefined) {
      RecipesService.updateNotesById(id, notes)
        .then((recipe) => res.status(200).json(recipe))
        .catch((err) => handleError(res, err));
    }

    res.status(400).json({
      message: "Bad request, no editable attributes provided.",
    });
  },

  deleteRecipeById: (req: Request, res: Response) => {
    const { id } = req.params;
    const activeUser = getAuth().currentUser;

    if (!activeUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    RecipesService.doesUserOwnRecipe(activeUser.uid, id)
      .then((match: boolean) => {
        if (!match) {
          res.status(403).json({
            message: "Unauthorized. Recipe can only be deleted by owner",
          });
        } else {
          RecipesService.deleteById(id)
            .then(() => res.status(204).end())
            .catch((err) => handleError(res, err));
        }
      })
      .catch((err) => handleError(res, err));
  },
};

export default recipesController;
