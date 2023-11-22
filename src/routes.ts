import { Router } from "express";
import recipesController from "./controllers/recipes";
import usersController from "./controllers/users";

const router = Router();

/**
 * @openapi
 * /api/:
 *   get:
 *     summary: Check API status
 *     responses:
 *       '200':
 *         description: API is up and running
 */
router.get("/", (req, res) => {
  res.send("API is up and running!");
});

/**
 * @openapi
 * /api/user:
 *   get:
 *     summary: Get user account details
 *     tags:
 *       - user
 *     responses:
 *       '200':
 *         description: User account details retrieved successfully
 */
router.get("/user", usersController.getAccountDetails);

/**
 * @openapi
 * /api/user:
 *   post:
 *     summary: Create a new user account
 *     tags:
 *       - user
 *     responses:
 *       '201':
 *         description: User account created successfully
 */
router.post("/user", usersController.createAccount);

/**
 * @openapi
 * /api/user:
 *   put:
 *     summary: Update user profile
 *     tags:
 *       - user
 *     responses:
 *       '201':
 *         description: User profile updated successfully
 */
router.put("/user", usersController.updateUserProfile);

/**
 * @openapi
 * /api/user:
 *   patch:
 *     summary: Update user password
 *     tags:
 *       - user
 *     responses:
 *       '200':
 *         description: User password updated successfully
 */
router.patch("/user", usersController.updatePassword);

/**
 * @openapi
 * /api/user:
 *   delete:
 *     summary: Delete user account
 *     tags:
 *       - user
 *     responses:
 *       '200':
 *         description: User account deleted successfully
 */
router.delete("/user", usersController.deleteAccount);

/**
 * @openapi
 * /api/user:
 *   get:
 *     summary: Get user account details
 *     tags:
 *       - user
 *     responses:
 *       '200':
 *         description: User account details retrieved successfully
 */
router.get("/user", usersController.getAccountDetails);

/**
 * @openapi
 * /api/user:
 *   post:
 *     summary: Create a new user account
 *     tags:
 *       - user
 *     responses:
 *       '201':
 *         description: User account created successfully
 */
router.post("/user", usersController.createAccount);

/**
 * @openapi
 * /api/user:
 *   patch:
 *     summary: Update user password
 *     tags:
 *       - user
 *     responses:
 *       '200':
 *         description: User password updated successfully
 */
router.patch("/user", usersController.updatePassword);

/**
 * @openapi
 * /api/user:
 *   delete:
 *     summary: Delete user account
 *     tags:
 *       - user
 *     responses:
 *       '200':
 *         description: User account deleted successfully
 */
router.delete("/user", usersController.deleteAccount);

/**
 * @openapi
 * /api/recipe/{id}:
 *   get:
 *     summary: Get recipe by id
 *     tags:
 *       - recipe
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Recipe details retrieved successfully
 */
router.get("/recipe/:id", recipesController.getRecipeById);

/**
 * @openapi
 * /api/recipe:
 *   post:
 *     summary: Add a new recipe
 *     tags:
 *       - recipe
 *     responses:
 *       '201':
 *         description: Recipe added successfully
 */
router.post("/recipe", recipesController.addRecipe);

/**
 * @openapi
 * /api/recipe:
 *   patch:
 *     summary: Update recipe favorite status
 *     tags:
 *       - recipe
 *     responses:
 *       '200':
 *         description: Recipe favorite status update successfully
 */
router.patch("/recipe", recipesController.updateFavoriteStatus);

/**
 * @openapi
 * /api/recipe:
 *   delete:
 *     summary: Delete recipe by id
 *     tags:
 *       - recipe
 *     responses:
 *       '200':
 *         description: Recipe deleted successfully
 */
router.delete("/recipe", recipesController.deleteRecipeById);

/**
 * @openapi
 * /api/recipes:
 *   get:
 *     summary: Get community recipes
 *     tags:
 *       - recipes
 *     responses:
 *       '200':
 *         description: Community recipes retrieved successfully
 */
router.get("/recipes", recipesController.getCommunityRecipes);

/**
 * @openapi
 * /api/recipes/{userid}:
 *   get:
 *     summary: Get recipes by user id
 *     tags:
 *       - recipes
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User recipes retrieved successfully
 */
router.delete("/recipes/:userid", recipesController.getRecipesByUser);

export default router;
