import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Fetch all lists from Firestore
 * @returns {Promise<Array>} List of saved response code lists
 */
export const fetchLists = async (userId) => {
  try {
    const userListRef = collection(db, "users", String(userId), "lists");
    const snapshot = await getDocs(userListRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error fetching lists:", error);
    return [];
  }
};

/**
 * Add a new list to Firestore
 * @param {Object} listData - List data to be added
 * @returns {Promise<Object>} The newly created list document
 */
export const addList = async (listData, userId) => {
  try {
    const userListRef = collection(db, "users", String(userId), "lists");
    const docRef = await addDoc(userListRef, listData);
    return { id: docRef.id, ...listData };
  } catch (error) {
    console.error("Error adding list:", error);
    throw error;
  }
};

/**
 * Update an existing list in Firestore
 * @param {string} listId - ID of the list to update
 * @param {Object} newData - New data to update
 * @returns {Promise<void>}
 */
export const updateList = async (listId, newData, userId) => {
  try {
    const listRef = doc(db, "users", String(userId), "lists", listId);
    await updateDoc(listRef, newData);
  } catch (error) {
    console.error("Error updating list:", error);
    throw error;
  }
};

/**
 * Delete a list from Firestore
 * @param {string} listId - ID of the list to delete
 * @returns {Promise<void>}
 */
export const deleteList = async (listId, userId) => {
  try {
    const listRef = doc(db, "users", String(userId), "lists", listId);
    await deleteDoc(listRef);
  } catch (error) {
    console.error("Error deleting list:", error);
    throw error;
  }
};
