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

const Home = (props) => {
  const [userLikedCars, setUserLikedCars] = useState([]);
  const { carsData, setCarsData } = props;

  const handleAdd = async (idToAdd) => {
    console.log("IDTOADD", idToAdd);
    setUserLikedCars([...userLikedCars, idToAdd]);
  };

  const handleDelete = async (idToRemove) => {
    console.log("IDTODELETE", idToRemove);
    setUserLikedCars("");
  };
  //COMPLETE THIS

  console.log("CARS", userLikedCars);

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
