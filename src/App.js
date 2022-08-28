// import React from "react";
import { BrowserRouter } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import Navigation from "./components/Navigation";
import Router from "./Router";
import cars from "./cars.json";
import {
  collection,
  addDoc,
  writeBatch,
  doc,
  getDocs,
  deleteDoc,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase-config";
import "./App.css";
import { FakeCarsContext } from "./Context/FakeCarsProvider";

function App() {
  const {
    user,
    setUser,
    carsData,
    setCarsData,
    userLikedCars,
    setUserLikedCars,
  } = useContext(FakeCarsContext);
  //Class 8: Write a useEffect hook for onAuthStateChanged and set the user state.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("currentUser", currentUser);
      setUser(currentUser);
    });

    console.log("auth.currentUser", auth.currentUser);

    return unsubscribe;
    // We only want 1 instance of the user connected to
    //  the database this cleans up and disconnects the
    //  observer function when component is unmounted.
  }, []);

  //Class 9: Using a useEffect hook, create a function that will query Firestore and save the results to state.
  useEffect(() => {
    const getCars = async () => {
      const documents = await getDocs(collection(db, "cars"));
      // FILL IN THE REST: Map over and return an array of objects to put in state
      const ref = collection(db, "cars");
      let { docs } = await getDocs(ref);

      const list = docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setCarsData(list);
    };

    getCars();
  }, []);

  //class 11:  Query `userLikedCars` collection for the matching document based on the user Id (uid).

  useEffect(() => {
    const getUserLikedCars = async () => {
      try {
        const userLikedCarsRef = collection(db, "userLikedCars");
        const q = query(userLikedCarsRef, where("userId", "==", user.uid));
        const queryResults = await getDocs(q);
        queryResults.forEach((doc) =>
          setUserLikedCars(doc.data().likedCarsIds)
        );
      } catch (error) {
        console.error("ERROR GETTING LIKED CARS", error);
      }
    };
    if (user?.uid != null) {
      getUserLikedCars();
    }
  }, [user]);

  console.log("userLikedCarsFromAPP.js", userLikedCars);
  return (
    <BrowserRouter>
      <Navigation user={user} />
      <Router
        user={user}
        setUserLikedCars={setUserLikedCars}
        userLikedCars={userLikedCars}
        carsData={carsData}
        setCarsData={setCarsData}
      />
    </BrowserRouter>
  );
}

export default App;
