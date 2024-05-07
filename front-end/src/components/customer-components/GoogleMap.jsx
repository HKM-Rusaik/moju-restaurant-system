import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps/api";

const Map = withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    <Marker position={{ lat: props.lat, lng: props.lng }} />
  </GoogleMap>
));

const GoogleMapComponent = (props) => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Map
        lat={props.lat}
        lng={props.lng}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${props.apiKey}`}
      />
    </div>
  );
};

export default GoogleMapComponent;
