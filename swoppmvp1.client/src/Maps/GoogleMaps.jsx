import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import {useOutletContext} from "react-router-dom";

const containerStyle = {
  width: '400px',
  height: '400px'
};

// The latitude of Oslo, Ostlandet, Norway is 59.911491, and the longitude is 10.757933.

const center = {
    lat: 59.911491,
    lng: 10.757933
};


function GoogleMapsComponent({children}) {
    //const {api_key} = useOutletContext();
    const api_key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    console.log("Google Maps API Key: ", api_key);
    const mapId = ["a5995e39d0ac4d83"]
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: api_key,
        mapIds: mapId
    })
  
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            options={{mapId: "a5995e39d0ac4d83"}}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
        </GoogleMap>
        ) : <></>
}

export default React.memo(GoogleMapsComponent)