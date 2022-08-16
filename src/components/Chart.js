import { Typography } from "@mui/material";
import React from "react";
import { PieChart } from "react-minimal-pie-chart";

// Don't forget to pass along (props) as the parameter
const Chart = (props) => {
  const { carsData } = props;
  // create variable "over" with all the cars whose horsepower is >= 200
  let over = carsData.filter((car) => car.horsepower >= 200);
  // create variable "under" with all the cars whose horsepower is < 200
  let under = carsData.filter((car) => car.horsepower < 200);
  return (
    <div style={{ height: "100%" }}>
      <PieChart
        style={{ width: "200px" }}
        // replace the "value" values with our "over" and "under" variables.
        data={[
          { title: "Over", value: over, color: "#C13C37" },
          { title: "Under", value: under, color: "#E38627" },
        ]}
        label={({ dataEntry }) => dataEntry.value}
        labelStyle={{
          fill: "white",
          fontSize: "small",
        }}
      />
      <Legend />
    </div>
  );
};

function Legend() {
  return (
    <>
      <Typography variant="h6" align="center">
        Horsepower
      </Typography>
      <div align="center">
        <Typography fontSize={12} variant="p">
          <span style={{ background: "#C13C37" }}>&nbsp; &nbsp; &nbsp;</span>
          &nbsp; Over 200 HP
        </Typography>
        &nbsp; &nbsp;
        <Typography fontSize={12} variant="p">
          <span style={{ background: "#E38627" }}>&nbsp; &nbsp; &nbsp;</span>
          &nbsp; Under 200 HP
        </Typography>
      </div>
    </>
  );
}

export default Chart;
