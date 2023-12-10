import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { User } from "firebase/auth";
import { AccountType, EditableAccountType } from "../schemas/users";

class UserService {
  /**
   * Creates a new user account
   * @param firebaseUser The user data from Firebase
   * @returns The details of the new account
   */
  static async create(firebaseUser: User): Promise<AccountType> {
    const account = {
      name: firebaseUser.providerData[0].displayName,
      email: firebaseUser.email,
      photo_url: firebaseUser.providerData[0].photoURL,
      dietary_restrictions: null,
    };

    const userDocRef = doc(collection(db, "users"), firebaseUser.uid);
    await setDoc(userDocRef, account);

    return { id: firebaseUser.uid, ...account };
  }

  /**
   * Fetches an account by its uer id.
   * @param id The id of the user
   * @returns The retrieved account
   */
  static async getById(id: string): Promise<AccountType> {
    const userDocRef = doc(collection(db, "users"), id);

    const snapshot = await getDoc(userDocRef);
    const recipe = { id, ...snapshot.data() } as AccountType;

    return recipe;
  }

  /**
   * Updates a user by their id with the provided account information.
   * @param id The ID of the user to update
   * @param account The updated account details
   * @returns The complete account details, including updated
   */
  static async updateById(
    id: string,
    account: EditableAccountType
  ): Promise<AccountType> {
    const usersRef = collection(db, "users");
    const userDocRef = doc(usersRef, id);

    await updateDoc(userDocRef, account);

    return this.getById(id);
  }

  /**
   * Deletes an account given its id.
   * @param id The id of the account
   */
  static async deleteById(id: string) {
    const usersRef = doc(collection(db, "users"), id);

    await deleteDoc(usersRef);
  }
}

export default UserService;
