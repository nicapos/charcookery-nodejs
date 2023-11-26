import { Request, Response } from "express";
import { getAuth } from "firebase/auth";

import { handleError } from "../middlewares/errorHandler";
import { IdParamSchema, UserParamSchema } from "../schemas/common";
import CategoryService from "../services/CategoryService";
import { EditableCategorySchema, CategoryType } from "../schemas/categories";

const categoriesController = {
  addCategory: (req: Request, res: Response) => {
    const { title } = EditableCategorySchema.parse(req.body);
    const activeUser = getAuth().currentUser;

    if (!activeUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    CategoryService.create(title, activeUser.uid)
      .then((category: CategoryType) => res.status(201).json(category))
      .catch((err) => handleError(res, err));
  },

  getCategoriesByUser: (req: Request, res: Response) => {
    const { userId } = UserParamSchema.parse(req.params);

    CategoryService.getAllByUser(userId)
      .then((categories: CategoryType[]) => res.status(200).json(categories))
      .catch((err) => handleError(res, err));
  },

  getCategoryById: (req: Request, res: Response) => {
    const { id } = IdParamSchema.parse(req.params);

    CategoryService.getById(id)
      .then((category: CategoryType) => res.status(200).json(category))
      .catch((err) => handleError(res, err));
  },

  deleteCategoryById: (req: Request, res: Response) => {
    const { id } = IdParamSchema.parse(req.params);

    const activeUser = getAuth().currentUser;

    if (!activeUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    CategoryService.doesUserOwnCategory(activeUser.uid, id)
      .then((match: boolean) => {
        if (!match) {
          res.status(403).json({
            message: "Unauthorized. Recipe can only be deleted by owner",
          });
        } else {
          CategoryService.deleteById(id)
            .then(() => res.status(204).end())
            .catch((err) => handleError(res, err));
        }
      })
      .catch((err) => handleError(res, err));
  },
};

export default categoriesController;
