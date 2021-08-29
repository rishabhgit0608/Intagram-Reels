import React, { useState, useEffect } from "react";
import firebaseAuth from "../config/firebase";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  //
  function login(email, password) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  }
  function signOut() {
    return firebaseAuth.signOut();
  }
  function signUp(email, password) {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  let value = {
    currentUser: currentUser,
    signout: signOut,
    login: login,
    signUp: signUp,
  };

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      console.log("Inside On Auth State Changed");
      setCurrentUser(user);
    });
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
