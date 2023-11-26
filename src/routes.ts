import { Router } from "express";
import recipesController from "./controllers/recipes";
import usersController from "./controllers/users";
import { requireSignIn } from "./middlewares/auth";

const router = Router();

router.get("/", (req, res) => {
  res.send("API is up and running!");
});

router.post("/token", usersController.signIn);
router.post(
  "/auth/verify",
  requireSignIn,
  usersController.sendVerificationEmail
);
router.post("/auth/logout", requireSignIn, usersController.signOut);

router.get("/user", requireSignIn, usersController.getAccountDetails);
router.post("/user", usersController.createAccount);
router.put("/user", requireSignIn, usersController.updateUserProfile);
router.patch("/user", requireSignIn, usersController.requestPasswordChange);
router.delete("/user", requireSignIn, usersController.deleteAccount);

router.get("/recipe/:id", requireSignIn, recipesController.getRecipeById);
router.patch(
  "/recipe/:id",
  requireSignIn,
  recipesController.updateNotesFavorite
);
router.delete("/recipe/:id", requireSignIn, recipesController.deleteRecipeById);
router.post("/recipe", requireSignIn, recipesController.addRecipe);

router.get("/recipes", recipesController.getCommunityRecipes);
router.get("/recipes/:userId", recipesController.getRecipesByUser);

export default router;
