// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnXQugG0CNUt5HSW1iepKaF7Qo6TSmD5k",
  authDomain: "financetracker-eed50.firebaseapp.com",
  projectId: "financetracker-eed50",
  storageBucket: "financetracker-eed50.firebasestorage.app",
  messagingSenderId: "622856408723",
  appId: "1:622856408723:web:79b73a8ca30334a41e4766",
  measurementId: "G-KFSDKSZKM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Note: Analytics not used in development
// const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);

// Add an expense to Firestore
export const addExpense = async (expenseData) => {
  try {
    const docRef = await addDoc(collection(db, "expenses"), expenseData);
    console.log("Expense added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error;
  }
};

// Delete an expense by ID
export const deleteExpense = async (id) => {
  try {
    await deleteDoc(doc(db, "expenses", id));
    console.log("Expense deleted");
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
};

// Update an expense by ID
export const updateExpense = async (id, updatedData) => {
  try {
    await updateDoc(doc(db, "expenses", id), updatedData);
    console.log("Expense updated");
  } catch (error) {
    console.error("Error updating expense:", error);
  }
};