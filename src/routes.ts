/* eslint-disable */
import { Router } from "express";
import recipesController from "./controllers/recipes";
import usersController from "./controllers/users";
import categoriesController from "./controllers/categories";
import miscController from "./controllers/misc";

import { requireSignIn } from "./middlewares/auth";
import multerMiddleware from "./middlewares/imageHandler";

const router = Router();

router.get("/", miscController.ping);
router.post("/upload", requireSignIn, multerMiddleware, miscController.uploadImage);

router.post("/token", usersController.signIn);
router.post("/auth/verify", requireSignIn, usersController.sendVerificationEmail);
router.post("/auth/logout", requireSignIn, usersController.signOut);

router.get("/user", requireSignIn, usersController.getAccountDetails);
router.post("/user", usersController.createAccount);
router.put("/user", requireSignIn, usersController.updateUserProfile);
router.patch("/user", requireSignIn, usersController.requestPasswordChange);
router.delete("/user", requireSignIn, usersController.deleteAccount);

router.get("/recipe/:id", requireSignIn, recipesController.getRecipeById);
router.patch("/recipe/:id", requireSignIn, recipesController.updateNotesFavorite);
router.delete("/recipe/:id", requireSignIn, recipesController.deleteRecipeById);
router.post("/recipe", requireSignIn, recipesController.addRecipe);

router.get("/recipes", recipesController.getCommunityRecipes);
router.get("/recipes/:userId", recipesController.getRecipesByUser);

router.post("/category", requireSignIn, categoriesController.addCategory);
router.get("/category/:id", requireSignIn, categoriesController.getCategoryById);
router.delete("/category/:id", requireSignIn, categoriesController.deleteCategoryById);

router.get("/categories/:userId", categoriesController.getCategoriesByUser);

export default router;
