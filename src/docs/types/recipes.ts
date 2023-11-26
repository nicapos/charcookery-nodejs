import { z } from "zod";
import {
  EditableRecipeSchema,
  RecipeSchema,
  UserRecipeSchema,
} from "../../schemas/recipes";

export const RecipeAPISchema = RecipeSchema.openapi({
  example: {
    id: "5Xc9WPnb2DfyhZA",
    category: "Dessert",
    name: "Chocolate Chip Cookies",
    notes: null,
    duration_mins: 30,
    cover_image: "https://example.com/chocolate-chip-cookies.jpg",
    instructions: [
      "Preheat the oven to 350°F (175°C).",
      "In a large mixing bowl, cream together butter, sugar, and brown sugar until smooth.",
      "Beat in eggs, one at a time, then stir in vanilla extract.",
      "In a separate bowl, combine flour, baking soda, and salt. Gradually add the dry ingredients to the wet ingredients.",
      "Fold in chocolate chips.",
      "Drop rounded tablespoons of dough onto ungreased baking sheets.",
      "Bake for 10-12 minutes or until the edges are golden brown.",
      "Allow cookies to cool on the baking sheet for a few minutes before transferring to a wire rack to cool completely.",
    ],
    ingredients: [
      "1 cup butter, softened",
      "1 cup white sugar",
      "1 cup packed brown sugar",
      "2 eggs",
      "1 teaspoon vanilla extract",
      "3 cups all-purpose flour",
      "1 teaspoon baking soda",
      "1/2 teaspoon salt",
      "2 cups semisweet chocolate chips",
    ],
    source_url: "https://example.com/chocolate-chip-cookies-recipe",
  },
});

export const RecipeListSchema = z.array(RecipeAPISchema).openapi({});

export const UserRecipeAPISchema = UserRecipeSchema.openapi({
  example: {
    id: "4Ky48xur4eI700E",
    category: "Pasta Favorites",
    name: "Spaghetti Bolognese",
    notes: "Feel free to add extra vegetables for a healthier twist.",
    duration_mins: 45,
    cover_image: "https://example.com/spaghetti-bolognese.jpg",
    instructions: [
      "Cook spaghetti according to package instructions.",
      "In a large skillet, heat olive oil over medium heat.",
      "Add minced garlic and diced onions; sauté until softened.",
      "Add ground beef and cook until browned. Drain excess fat.",
      "Stir in tomato paste, crushed tomatoes, and Italian seasoning.",
      "Simmer for 20-25 minutes, stirring occasionally.",
      "Season with salt and pepper to taste.",
      "Serve the Bolognese sauce over cooked spaghetti.",
      "Garnish with grated Parmesan cheese and fresh basil.",
    ],
    ingredients: [
      "1 lb ground beef",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "1 can (28 oz) crushed tomatoes",
      "2 tablespoons tomato paste",
      "2 teaspoons Italian seasoning",
      "Salt and pepper to taste",
      "1 lb spaghetti",
      "Grated Parmesan cheese and fresh basil for garnish",
    ],
    is_favorite: true,
    user_id: "bKpgNZcltnSno9O",
  },
});

export const UserRecipeListSchema = z.array(UserRecipeAPISchema).openapi({});

export const CreateRecipeSchema = UserRecipeAPISchema.omit({
  id: true,
}).openapi({
  example: {
    category: "Pasta Favorites",
    name: "Spaghetti Bolognese",
    notes: "Feel free to add extra vegetables for a healthier twist.",
    duration_mins: 45,
    cover_image: "https://example.com/spaghetti-bolognese.jpg",
    instructions: [
      "Cook spaghetti according to package instructions.",
      "In a large skillet, heat olive oil over medium heat.",
      "Add minced garlic and diced onions; sauté until softened.",
      "Add ground beef and cook until browned. Drain excess fat.",
      "Stir in tomato paste, crushed tomatoes, and Italian seasoning.",
      "Simmer for 20-25 minutes, stirring occasionally.",
      "Season with salt and pepper to taste.",
      "Serve the Bolognese sauce over cooked spaghetti.",
      "Garnish with grated Parmesan cheese and fresh basil.",
    ],
    ingredients: [
      "1 lb ground beef",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "1 can (28 oz) crushed tomatoes",
      "2 tablespoons tomato paste",
      "2 teaspoons Italian seasoning",
      "Salt and pepper to taste",
      "1 lb spaghetti",
      "Grated Parmesan cheese and fresh basil for garnish",
    ],
    is_favorite: true,
    user_id: "bKpgNZcltnSno9O",
  },
});

export const EditableRecipeAPISchema = EditableRecipeSchema.openapi({
  example: {
    notes: "Feel free to add vegetables for a healthier twist.",
    is_favorite: false,
  },
});
