import {
  QueryCompositeFilterConstraint,
  QueryFieldFilterConstraint,
  addDoc,
  and,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  RecipeFiltersType,
  RecipeType,
  UserRecipeType,
} from "../schemas/recipes";
import CategoryService from "./CategoryService";

class RecipesService {
  /**
   * Fetches a list of recipes belonging to a user.
   * @param userId
   * @returns List of recipes associated with the user
   */
  static async getAllByUser(
    userId: string,
    filters?: RecipeFiltersType
  ): Promise<UserRecipeType[]> {
    const recipesRef = collection(db, "recipes");
    var q;

    if (filters) {
      const queryFilters = this.buildFilters(filters, userId);
      q = query(recipesRef, queryFilters);
    } else {
      q = query(recipesRef, where("user_id", "==", userId));
    }

    const snapshot = await getDocs(q);
    const recipes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as UserRecipeType),
    }));

    return recipes;
  }

  /**
   * Retrieves a list of all community recipes.
   * @returns List of all community recipes
   */
  static async getAllCommunity(
    category?: string | null
  ): Promise<RecipeType[]> {
    const communityRecipesRef = collection(db, "community_recipes");
    const q = category
      ? query(communityRecipesRef, where("category", "==", category))
      : communityRecipesRef;

    const snapshot = await getDocs(q);
    const recipes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as RecipeType),
    }));

    return recipes;
  }

  /**
   * Fetches a recipe by its id.
   * @param id The id of the recipe
   * @returns The retrieved recipe
   */
  static async getById(id: string): Promise<UserRecipeType> {
    const userDocRef = doc(collection(db, "recipes"), id);

    const snapshot = await getDoc(userDocRef);
    const recipe = { id, ...snapshot.data() } as UserRecipeType;

    return recipe;
  }

  /**
   * Creates a new recipe.
   * @param item Recipe details
   * @param userId id of the owner user
   * @returns The newly added recipe
   */
  static async create(
    item: UserRecipeType,
    userId: string
  ): Promise<UserRecipeType> {
    const recipesRef = collection(db, "recipes");
    const data = { ...item, user_id: userId };

    const categoryExists = await CategoryService.checkExistsByTitle(
      item.category,
      userId
    );

    if (!categoryExists) {
      await CategoryService.create(item.category, userId);
    }

    // Add tokens for search
    const nameIndices = item.name.toLowerCase().split(" ");
    const indexedData = { nameIndices, ...data };

    const docRef = await addDoc(recipesRef, indexedData);
    const recipe: UserRecipeType = { id: docRef.id, ...data };

    return recipe;
  }

  /**
   * Updates the favorite status of a recipe.
   * @param id The id of the recipe
   * @param isFavorite The recipe's favorite status
   * @returns The updated recipe
   */
  static async tagAsFavoriteById(
    id: string,
    isFavorite: boolean
  ): Promise<UserRecipeType> {
    const recipeRef = doc(collection(db, "recipes"), id);
    await updateDoc(recipeRef, { is_favorite: isFavorite });

    return this.getById(id);
  }

  /**
   * Updates the notes of a recipe.
   * @param id The id of the recipe
   * @param notes Any notes to be attached to the recipe
   * @returns The updated recipe
   */
  static async updateNotesById(
    id: string,
    notes: string | null
  ): Promise<UserRecipeType> {
    const recipeRef = doc(collection(db, "recipes"), id);
    await updateDoc(recipeRef, { notes });

    return this.getById(id);
  }

  /**
   * Deletes a recipe given its id.
   * @param id The id of the recipe
   */
  static async deleteById(id: string) {
    const recipeRef = doc(collection(db, "recipes"), id);

    await deleteDoc(recipeRef);
  }

  /**
   * Checks if a user owns a specific recipe.
   * @param userId
   * @param recipeId
   * @returns A boolean indicating ownership status.
   */
  static async doesUserOwnRecipe(userId: string, recipeId: string) {
    const recipe = await this.getById(recipeId);
    return recipe.user_id == userId;
  }

  static buildFilters(
    filters: RecipeFiltersType,
    userId: string
  ): QueryCompositeFilterConstraint {
    var queryFilters: QueryFieldFilterConstraint[] = [
      where("user_id", "==", userId),
    ];

    if (filters.is_favorite) {
      queryFilters.push(where("is_favorite", "==", filters.is_favorite));
    }
    if (filters.category) {
      queryFilters.push(where("category", "==", filters.category));
    }
    if (filters.max_time) {
      queryFilters.push(where("duration_mins", "<=", filters.max_time));
    }

    const subqueryA = and(...queryFilters);

    if (!filters.q) return subqueryA;

    const tokens = filters.q.split(" ");
    const tokenQueries = tokens.map((token) =>
      where("nameIndices", "array-contains", token.toLowerCase())
    );

    const subqueryB = or(...tokenQueries);

    return and(subqueryA, subqueryB);
  }
}

export default RecipesService;
