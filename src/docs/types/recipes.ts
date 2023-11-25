import { z } from "zod";
import { RecipeSchema } from "../../schemas/recipes";

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
