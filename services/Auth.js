import { sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from './Config';

export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await emailVerification();
    const user = userCredential.user;
    console.log("User registered:", user);

    // Store user data in Firestore
    const userRef = collection(db, "users");
    await addDoc(userRef, {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      // Add other user data here
    });

    return user;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const emailVerification = async () => {
  const user = auth.currentUser;

  try {
    await sendEmailVerification(auth.currentUser, {
        handleCodeinApp: true,
        url: "https://carigedegang.firebaseapp.com/",
    }).then(() => {
        console.log("Email verification link sent! " + user.email);
    });
    // Email verification link sent successfully
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Email verification error: ", errorCode, errorMessage);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User logged in:", user);
    return user;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out.");
  } catch (error) {
    throw error;
  }
};