import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Paper, Chip } from "@mui/material";
import EditCar from "./EditCar";

// Don't forget to pass along (props) as the parameter
const Car = (props) => {
  const { carsData, setCarsData } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  debugger;
  const id = useParams().id;

  const car = carsData?.find((c) => c.id === id);

  return (
    <Container maxWidth="sm" className="car-container">
      <Paper className="car-paper">
        <h2>{car?.make}</h2>
        <h3>{car?.model}</h3>
        <div>
          {Object.keys(car).map((key, idx) => {
            return (
              <div>
                <Chip
                  style={{ margin: "5px" }}
                  key={idx}
                  label={`${key}: ${car[key]}`}
                ></Chip>
              </div>
            );
          })}
          <EditCar
            carId={id}
            carsData={carsData}
            setAnchorEl={setAnchorEl}
            setCarsData={setCarsData}
          />
        </div>
      </Paper>
    </Container>
  );
};

export default Car;
