"use client";
import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect } from "react";
import Loading from "./Loading";
import { toast } from "react-hot-toast";

const GmapComponent = ({ location, setFieldValue }) => {
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
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const loc = `${event.latLng.lat()},${event.latLng.lng()}`;
    setCenter({ lat, lng });
    setFieldValue("location", loc);
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS}
      loadingElement={<Loading />}
      onError={(error) => toast.error(error)}
    >
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: location ? "300px" : "200px",
        }}
        center={center}
        zoom={location ? 15 : 10}
        onClick={(e) => handleClickMap(e)}
      >
        {Boolean(location) && <Marker position={center} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default GmapComponent;
