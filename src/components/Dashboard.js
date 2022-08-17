import React, { useState } from "react";
import { useIsAuthorized } from "./../hooks/customHooks";
import AddCar from "./AddCar";
import Chart from "./Chart";
import Total from "./Total";
import EditCar from "./EditCar";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "./../firebase-config";
import Car from "./Car";
import cars from "./../cars.json";
import { useParams } from "react-router-dom";

import {
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Make sure to pass (props) as the parameter to get access to props being pass into this Component
const Dashboard = (props) => {
  const { user, carsData, setCarsData } = props;
  const id = useParams().id;
  const car = carsData.find((c) => c.id === id);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // This event handling function will be responsible for deleting a document from Firestore
  const handleDelete = async (anchor) => {
    console.log(anchor);
    // This anchor will carry with it the "id" of the current document we clicked
    console.log("ANCHOR ID", anchor.id);
    // Create Firestore query function here. Make sure to use async/await
    // Also, make sure to wrap your code in a try/catch block to handle any errors

    try {
      await deleteDoc(doc(db, "cars", { id }));
      const newData = cars.filter((car) => car.id !== id);
      console.log("NEW DATA", newData);
    } catch (error) {
      console.log("Error setting NEW DATA");
    }
    handleClose();
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
      {/* <h4>Welcome, {props.user.username}</h4> */}
      <Stack
        direction="row"
        borderBottom="3px solid black"
        pb={5}
        mb={5}
        justifyContent="space-around"
        alignItems="center"
      >
        {/* <Chart carsData={carsData} /> */}
        <div align="center">
          <Total carsData={carsData} />
          <AddCar carsData={carsData} setCarsData={setCarsData} />
        </div>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Make</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>MPG</TableCell>
            <TableCell>Cylinders</TableCell>
            <TableCell>Horsepower</TableCell>
            <TableCell>Colors</TableCell>
            <TableCell align="center">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Change "carsData" to "props.carsData" */}
          {carsData.map((car) => (
            <TableRow key={car.id}>
              <TableCell component="th" scope="row">
                {car.id}
              </TableCell>
              <TableCell>{car.make}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>{car.miles_pergGallon}</TableCell>
              <TableCell>{car.cylinders}</TableCell>
              <TableCell>{car.horsepower}</TableCell>
              {/* <TableCell>{car.colors.join(", ")}</TableCell> */}
              <TableCell align="center">
                <IconButton key={car.id} id={car.id} onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
          <EditCar
            setAnchorEl={setAnchorEl}
            carsData={carsData}
            // If anchorEl exists or is not "null", give us the id.
            carId={anchorEl?.id}
          />
        </MenuItem>
        <MenuItem onClick={() => handleDelete(anchorEl)}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default Dashboard;
