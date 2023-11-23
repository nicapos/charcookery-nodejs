import { Router } from "express";
import recipesController from "./controllers/recipes";
import usersController from "./controllers/users";

const router = Router();

router.get("/", (req, res) => {
  res.send("API is up and running!");
});

router.post("/token", usersController.signIn);

router.get("/user", usersController.getAccountDetails);
router.post("/user", usersController.createAccount);
router.put("/user", usersController.updateUserProfile);
router.patch("/user", usersController.updatePassword);
router.delete("/user", usersController.deleteAccount);

router.get("/recipe/:id", recipesController.getRecipeById);
router.post("/recipe", recipesController.addRecipe);
router.patch("/recipe", recipesController.updateFavoriteStatus);
router.delete("/recipe", recipesController.deleteRecipeById);

router.get("/recipes", recipesController.getCommunityRecipes);
router.get("/recipes/:userid", recipesController.getRecipesByUser);

export default router;
