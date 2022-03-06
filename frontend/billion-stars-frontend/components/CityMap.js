import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import styles from "../styles/Map.module.css";

export default function CityMap({
  latitude,
  longitude,
  sensorObj,
  setGraphData,
  graphData,
}) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoicHJhbWlsMDEiLCJhIjoiY2wwY3MzaGxrMDI2aDNqcDlxcTY2ZHhjZCJ9.tBxkMn02CfdKVlWFVWm51Q";
  const mapContainer = useRef(null);
  const map = useRef(null);
  useEffect(() => {
    // if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 10,
    });
    console.log(sensorObj);
    if (sensorObj === null) return;
    for (var mark in sensorObj) {
      let lat = sensorObj[mark].latitude;
      let lan = sensorObj[mark].longitude;
      let showData =
        "temperature : " + sensorObj[mark].sensordata[0].temperature + "<br/>";
      showData += "ph : " + sensorObj[mark].sensordata[0].ph + "<br/>";
      showData += "tds : " + sensorObj[mark].sensordata[0].tds;
      const color = setColor({
        temperature: sensorObj[mark].sensordata[0].temperature,
        ph: sensorObj[mark].sensordata[0].ph,
        tds: sensorObj[mark].sensordata[0].tds,
      });
      const marker1 = new mapboxgl.Marker({ color })
        .setLngLat([lan, lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<h1>${showData}</h1>`))
        .addTo(map.current);
      marker1.getElement().addEventListener("click", () => {
        let temp = sensorObj[mark];
        setGraphData(temp);
      });
    }
  }, [latitude, longitude, sensorObj]);

  const setColor = ({ temperature, ph, tds }) => {
    if (ph > 5 && ph < 9 && temperature < 45 && tds < 500) return "green";
    else if (ph > 4 && ph < 11 && temperature < 50 && tds < 600)
      return "yellow";
    else return "red";
  };
  return (
    <div className={styles.container}>
      <div>
        <div
          ref={mapContainer}
          className="map-container"
          style={{ height: "100vh" }}
        />
      </div>
    </div>
  );
}
