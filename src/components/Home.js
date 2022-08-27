import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography,
} from "@mui/material";
import Query from "./Query";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const Home = (props) => {
  const { carsData, setCarsData, user } = props;

  const handleAdd = async (idToAdd) => {
    console.log("IDTOADD", idToAdd);
    // setUserLikedCars([...userLikedCars, idToAdd]);
    try {
      const userLikedCarsDocRef = doc(db, "userLikedCars", user.email);
      setUserLikedCars((prevState) => {
        const newState = [...prevState, idToAdd];
        updateDoc(userLikedCarsDocRef, {
          likedCarsIds: newState,
        });
        return newState;
      });
    } catch (error) {
      console.error("ERROR ADDING CAR", error);
    }
  };

  const handleDelete = async (idToRemove) => {
    console.log("IDTODELETE", idToRemove);
    // setUserLikedCars(userLikedCars.filter((id) => idToRemove !== id));
    try {
      const userLikedCarsDocRef = doc(db, "userLikedCars", user.email);
      setUserLikedCars((prevState) => {
        const newState = userLikedCars.filter((id) => idToRemove !== id);
        updateDoc(userLikedCarsDocRef, {
          likedCarsIds: newState,
        });
        return newState;
      });
    } catch (error) {
      console.error("ERROR DELETING CAR", error);
    }
  };

  console.log("CARS", userLikedCars);
  console.log("!!!!!!!!!!", userLikedCars);
  return (
    <>
      <Query />
      <div className="card-container">
        {carsData.map((car, idx) => (
          <Card key={idx} className="card">
            <CardContent className="text-gray">
              <Typography>{car.make.toUpperCase()}</Typography>
              <Typography>{car.model}</Typography>
              <ul>
                <li>Origin: {car["origin"]}</li>
                <li>MPG: {car["miles_per_gallon"]}</li>
                <li>Cylinders: {car["cylinders"]}</li>
                <li>Horsepower: {car["horsepower"]}</li>
                {/* conditionally rendering */}
                {userLikedCars.includes(car.id) ? (
                  <FavoriteIcon
                    style={{ color: "red" }}
                    onClick={() => handleDelete(car.id)}
                  />
                ) : (
                  <FavoriteBorderIcon onClick={() => handleAdd(car.id)} />
                )}
              </ul>
            </CardContent>
            <Divider />
            <CardActions>
              <Link style={{ color: "mediumblue" }} to={`/car/${car.id}`}>
                See More Details
              </Link>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;
