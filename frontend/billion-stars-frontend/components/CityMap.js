import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import styles from "../styles/Map.module.css";

export default function CityMap({ latitude, longitude }) {
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
      zoom: 12,
    });
    const marker1 = new mapboxgl.Marker()
      .setLngLat([81.605, 21.2497])
      .setPopup(new mapboxgl.Popup().setHTML("<h1>Data</h1>"))
      .addTo(map.current);

    const marker2 = new mapboxgl.Marker({ color: "black", rotation: 45 })
      .setLngLat([81.646, 21.249])
      .addTo(map.current);
  }, [latitude, longitude]);
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
