import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = [
  "12:00pm",
  "01:00pm",
  "02:00pm",
  "03:00pm",
  "04:00pm",
  "05:00pm",
  "06:00pm",
];

export default function Graph({ graphData }) {
  let i = 0;
  const data1 = {
    labels,
    datasets: [
      {
        label: graphData.location + " temperature",
        data: labels.map(() => {
          i++;
          return graphData.sensordata[i].temperature;
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  i = 0;
  const data2 = {
    labels,
    datasets: [
      {
        label: graphData.location + " pH",
        data: labels.map(() => {
          i++;
          return graphData.sensordata[i].ph;
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  i = 0;
  const data3 = {
    labels,
    datasets: [
      {
        label: graphData.location + " tds",
        data: labels.map(() => {
          i++;
          return graphData.sensordata[i].tds;
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div style={{ display: "grid", gridGap: "40px", marginTop: "30px" }}>
      <Line
        options={options}
        data={data1}
        style={{
          width: "70vw",
          backgroundColor: "white",
          margin: "0 auto",
        }}
      />
      <br />
      <Line
        options={options}
        data={data2}
        style={{
          width: "70vw",
          backgroundColor: "white",
          margin: "0 auto",
        }}
      />
      <br />
      <Line
        options={options}
        data={data3}
        style={{
          width: "70vw",
          backgroundColor: "white",
          margin: "0 auto",
        }}
      />
    </div>
  );
}
