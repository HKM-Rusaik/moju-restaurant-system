import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 8.7584,
  lng: 80.4976,
};

const RestaurantAddress = () => {
  return (
    <div className="flex justify-around items-center my-10">
      <div>
        <div className="text-white bg-yellow-700 p-4 items-center mb-2">
          RestaurantAddress Map
        </div>
        <LoadScript googleMapsApiKey="AIzaSyAkA04UQy02cVGKk7u2wh1JygAIcs2CA3g">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
      <div className="text-xl">
        <div>
          <strong>Address : </strong>
          <span>No 123, 1st Cross Street, Vavuniya Town.</span>
        </div>
        <div>
          <strong>Contact No : </strong> <span>024 244 2442</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantAddress;
