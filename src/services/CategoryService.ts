import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { CategoryType } from "../schemas/categories";
import { FirebaseError } from "firebase/app";

class CategoryService {
  /**
   * Fetches a category by its id.
   * @param id The id of the category
   * @returns The retrieved category
   */
  static async getById(id: string): Promise<CategoryType> {
    const categoryDoc = doc(collection(db, "categories"), id);

    const snapshot = await getDoc(categoryDoc);
    const category = { id, ...snapshot.data() } as CategoryType;
    return category;
  }

  /**
   * Fetches a category by its title.
   * @param title Title of the category to search for
   * @param userId The id of the user who owns the category
   * @returns The retrieved category
   */
  static async getByTitle(
    title: string,
    userId: string
  ): Promise<CategoryType> {
    const categoryRef = collection(db, "categories");
    const q = query(
      categoryRef,
      where("title", "==", title),
      where("user_id", "==", userId)
    );

    const snapshot = await getDocs(q);
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as CategoryType),
    }));

    if (categories.length == 0) return {} as CategoryType;
    return categories[0];
  }

  /**
   * Fetches a list of categories belonging to a user.
   * @param userId
   * @returns List of categories owned by the user
   */
  static async getAllByUser(userId: string): Promise<CategoryType[]> {
    const categoryRef = collection(db, "categories");
    const q = query(categoryRef, where("user_id", "==", userId));

    const snapshot = await getDocs(q);
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as CategoryType),
    }));

    return categories;
  }

  /**
   * Checks if a category exists by checking for its title and userId
   * @param title Title of the category to search for
   * @param userId The id of the user who owns the category
   * @returns A boolean indicating if category exists.
   */
  static async checkExistsByTitle(
    title: string,
    userId: string
  ): Promise<boolean> {
    const match = await this.getByTitle(title, userId);
    return Object.keys(match).length != 0;
  }

  /**
   * Creates a new category.
   * @param title
   * @param userId
   * @returns The newly added category
   */
  static async create(title: string, userId: string): Promise<CategoryType> {
    const categoryRef = collection(db, "categories");
    const data = { title, user_id: userId };

    const categoryExists = await this.checkExistsByTitle(title, userId);
    if (categoryExists)
      throw new FirebaseError("EXISTS", `Category "${title}" already exists`);

    const docRef = await addDoc(categoryRef, data);
    const category: CategoryType = { id: docRef.id, ...data };

    return category;
  }

  /**
   * Deletes a category given its id.
   * @param id The id of the category
   */
  static async deleteById(id: string) {
    const categoryDoc = doc(collection(db, "categories"), id);

    await deleteDoc(categoryDoc);
  }

  /**
   * Checks if a user owns a specific category.
   * @param userId
   * @param categoryId
   * @returns A boolean indicating ownership status.
   */
  static async doesUserOwnCategory(userId: string, categoryId: string) {
    const category = await this.getById(categoryId);
    return category.user_id == userId;
  }
}

export default CategoryService;
