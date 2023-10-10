import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch additional user data (e.g., permissions) from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const docSnapshot = await getDoc(userDocRef);
        const userData = docSnapshot.data();

        // Merge the existing user object with the additional data
        const mergedUser = { ...user, ...userData };

        // Set the merged user object in the state
        setCurrentUser(mergedUser);
      } else {
        setCurrentUser(null);
      }
    });

    // Cleanup function to unsubscribe when the component is unmounted
    return () => unsubscribe();
  }, []);

  return currentUser;
};

export default useAuth;
