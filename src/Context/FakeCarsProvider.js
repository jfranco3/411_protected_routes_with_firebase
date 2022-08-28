import React, { createContext, useState } from "react";

const FakeCarsContext = createContext();

// A "provider" is used to denote a component that passes its props
// all the way down the component tree.
function FakeCarsProvider({ children }) {
  //Class 8: For Firebase user authentication from onAuthStateChanged
  const [userLikedCars, setUserLikedCars] = useState([]);

  const [user, setUser] = useState({});

  //Class 9: Create a useState hook to store the data we Read from Firestore
  const [carsData, setCarsData] = useState([]);

  const value = {
    userLikedCars,
    setUserLikedCars,
    user,
    setUser,
    carsData,
    setCarsData,
  };

  return (
    <FakeCarsContext.Provider value={value}>
      {children}
    </FakeCarsContext.Provider>
  );
}

export { FakeCarsProvider, FakeCarsContext };
