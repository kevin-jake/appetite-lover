"use client";
import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const GmapComponent = ({ location, isFromContent, values, setFieldValues }) => {
  console.log(
    "🚀 ~ file: GmapComponent.jsx:12 ~ GmapComponent ~ location:",
    location
  );
  const [center, setCenter] = useState({
    lat: 14.600138480430042,
    lng: 120.98470772364081,
  });

  useEffect(() => {
    if (location) {
      const lat = +location.split(",")[0];
      const lng = +location.split(",")[1];
      setCenter({ lat, lng });
    }
  }, [location]);

  const handleClickMap = (event) => {
    const loc = `${event.latLng.lat()},${event.latLng.lng()}`;
    const newData = { ...values, location: loc };
    setFieldValues(newData);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={isFromContent ? 15 : 10}
        onClick={(e) => handleClickMap(e)}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GmapComponent;
